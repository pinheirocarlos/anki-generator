---
id: CS-NET-SOCK-001
title: "Algoritmo de Nagle vs TCP_NODELAY para Aplicações de Baixa Latência"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
O que faz o **Algoritmo de Nagle** e por que aplicações backend de baixa latência e microsserviços desabilitam esse algoritmo via **`TCP_NODELAY`**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo de Nagle (RFC 896)**: Projetado para evitar o envio de pacotes minúsculos com 40 bytes de cabeçalho TCP/IP para transportar apenas 1 byte de payload (*Tinygrams*).
  - *Mecânica*: Se houver dados menores que 1 MSS (`~1460 bytes`) e houver pacotes em trânsito sem confirmação de ACK, o kernel **atém e agrupa os dados no buffer** até receber o ACK ou atingir o tamanho do MSS.
- **Interação Destrutiva com Delayed ACK**: O receptor do TCP normalmente aguarda até 40-200ms para enviar um ACK (*Delayed ACK*). A combinação de **Nagle no emissor + Delayed ACK no receptor** introduz atrasos artificiais de **40 a 200 milissegundos** em cada requisição RPC curta.
- **`TCP_NODELAY`**: Flag de socket que desabilita o Algoritmo de Nagle, forçando o kernel a enviar qualquer fragmento de dados imediatamente para a rede sem espera.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Nagle vs TCP_NODELAY (Baixa Latência)</text>
  <g transform="translate(50, 48)">
    <!-- Nagle ON -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Algoritmo de Nagle (Padrão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Bufferiza pequenos pacotes até completar MSS</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Interação ruim com Delayed ACK → Latência 40-200ms</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para: Transferência de arquivos em massa</text>

    <!-- TCP_NODELAY -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">TCP_NODELAY Ativado</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Desativa bufferização de Nagle</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Envia cada write() imediatamente para o cabo</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Obrigatório em: Redis, RPCs, Games, SSH</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Sistemas de backend de alto desempenho e microsserviços ativam TCP_NODELAY por padrão para eliminar pausas artificiais.</text>

</svg>

| Configuração de Socket | Comportamento de Envio | Latência em Mensagens Pequenas (gRPC / Redis) |
|---|---|---|
| **Nagle Ativado (Padrão Antigo)** | Agrupa bytes até receber ACK | ~40 a 200 ms de atraso com Delayed ACK |
| **`TCP_NODELAY` Ativado** | Envio instantâneo na rede | Latência de trânsito em nanossegundos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Habilitando TCP_NODELAY
```go
package main

import "net"

func configureSocket(conn net.Conn) error {
  if tcpConn, ok := conn.(*net.TCPConn); ok {
    // Go habilita TCP_NODELAY como true por padrão em todas as conexões de rede:
    return tcpConn.SetNoDelay(true)
  }
  return nil
}
```

#### Key Takeaways
- Todos os frameworks modernos de backend e microsserviços (Netty, gRPC, Node.js, Go) habilitam `TCP_NODELAY` por padrão para eliminar a latência de Nagle.

</details>
