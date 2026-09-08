---
id: CS-NET-HTTP-002
title: "HTTP/2 Multiplexing com Frames Binários e Streams Independentes"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como o **HTTP/2 Multiplexing** permite trafegar centenas de requisições e respostas simultâneas em uma única conexão TCP?

## Resposta
### Quick Answer
**Solução Direta**:
- **Framing Binário**: O HTTP/2 divide todas as mensagens em frames binários atômicos tipados (`HEADERS`, `DATA`, `SETTINGS`, `RST_STREAM`), substituindo o texto puro do HTTP/1.1.
- **Streams Independentes**: Cada par de requisição/resposta recebe um **Stream ID** numérico único (ímpares iniciados pelo cliente, pares pelo servidor).
- **Multiplexação Real**: Frames de dezenas de streams distintos são intercalados livremente na mesma conexão TCP em tempo real. O receptor remonta as mensagens baseado no Stream ID, eliminando o Head-of-Line Blocking na camada de aplicação.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">HTTP/2 Multiplexing: Streams Independentes em 1 Conexão TCP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="280" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Única Conexão TCP Compartilhada (Intercalação de Frames Binários)</text>

    <g transform="translate(20, 35)">
      <rect x="0" y="0" width="100" height="30" rx="3" fill="#0369a1"/>
      <text x="50" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 1 (HTML)</text>

      <rect x="110" y="0" width="100" height="30" rx="3" fill="#0d9488"/>
      <text x="160" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 2 (CSS)</text>

      <rect x="220" y="0" width="100" height="30" rx="3" fill="#0369a1"/>
      <text x="270" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 1 (DATA)</text>

      <rect x="330" y="0" width="100" height="30" rx="3" fill="#7c3aed"/>
      <text x="380" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 3 (IMG)</text>

      <rect x="440" y="0" width="75" height="30" rx="3" fill="#0d9488"/>
      <text x="477" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 2</text>
    </g>
  </g>
  <rect x="60" y="145" width="560" height="40" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="170" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Elimina o HoL blocking de aplicação: streams prioritários trafegam sem esperar o fim dos secundários.</text>

</svg>
<p>Visualização: Multiplexação HTTP/2 intercalando frames binários de múltiplos streams lógicos dentro de uma única conexão TCP.</p>

| Camada de Mensagem | HTTP/1.1 | HTTP/2 |
|---|---|---|
| **Formato de Protocolo** | Texto puro delimitado por CRLF (`\r\n`) | Frames binários estruturados em bytes |
| **Conexões TCP por Origem**| 6 conexões independentes paralelas | 1 conexão única compartilhada |
| **Ordem de Entrega** | Estritamente sequencial por conexão | Multiplexada e intercalada em tempo real |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura de um Frame Binário HTTP/2 (9 Bytes de Cabeçalho)
```text
+-----------------------------------------------+
|                 Length (24)                   |
+---------------+---------------+---------------+
|   Type (8)    |   Flags (8)   |
+---------------+---------------+---------------+
|R|                 Stream ID (31)              |
+-----------------------------------------------+
|                   Payload                     |
+-----------------------------------------------+
```

#### Key Takeaways
- O HTTP/2 suporta priorização de streams (*Stream Prioritization*), permitindo que o navegador declare que o arquivo CSS principal tem prioridade de entrega sobre imagens de rodapé.

</details>
