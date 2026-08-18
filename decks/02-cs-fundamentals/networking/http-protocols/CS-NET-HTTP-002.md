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
