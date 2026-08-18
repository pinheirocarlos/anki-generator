---
id: CS-NET-TCP-002
title: "Three-Way Handshake do TCP (SYN, SYN-ACK, ACK) e Sincronização de ISN"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona o **Three-Way Handshake (SYN, SYN-ACK, ACK)** do TCP e por que são necessárias 3 etapas para sincronizar números de sequência?

## Resposta
### Quick Answer
**Solução Direta**:
- O handshake de 3 vias estabelece uma conexão TCP bidirecional e sincroniza os **Initial Sequence Numbers (ISN)** de ambos os lados:
  1. **Passo 1 (SYN)**: O cliente escolhe um ISN aleatório $X$ e envia `SYN(seq=X)` para o servidor (Cliente entra em `SYN_SENT`).
  2. **Passo 2 (SYN-ACK)**: O servidor aloca buffers, escolhe seu próprio ISN $Y$, e envia `SYN-ACK(seq=Y, ack=X+1)` confirmando o SYN do cliente (Servidor entra em `SYN_RCVD`).
  3. **Passo 3 (ACK)**: O cliente envia `ACK(seq=X+1, ack=Y+1)` confirmando o SYN do servidor (Ambos entram em `ESTABLISHED`).
- 3 etapas são o mínimo matemático necessário para que ambos os nós confirmem que os canais de envio e recepção estão 100% operacionais nos dois sentidos.

### Dual Coding Visual
| Etapa do Handshake | Origem $\to$ Destino | Flags e Números de Sequência |
|---|---|---|
| **1. SYN** | Cliente $\to$ Servidor | `SYN=1`, `seq=X` |
| **2. SYN-ACK** | Servidor $\to$ Cliente | `SYN=1`, `ACK=1`, `seq=Y`, `ack=X+1` |
| **3. ACK** | Cliente $\to$ Servidor | `ACK=1`, `seq=X+1`, `ack=Y+1` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o ISN é Aleatório (SYN Flood & TCP Spoofing)
- O ISN não começa em zero por razões de segurança: números previsíveis permitiriam a invasores injetar pacotes forjados (*TCP Connection Hijacking*).
- Além disso, evita que pacotes atrasados de uma conexão TCP anterior terminada interfiram em uma nova conexão no mesmo par de portas.

#### Key Takeaways
- O Three-Way Handshake introduz **1 RTT completo (Round-Trip Time)** de latência antes que qualquer byte de dados da aplicação possa trafegar.

</details>
