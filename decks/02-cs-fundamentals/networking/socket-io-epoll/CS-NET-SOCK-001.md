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
