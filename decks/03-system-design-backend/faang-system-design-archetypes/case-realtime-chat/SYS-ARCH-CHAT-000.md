---
id: SYS-ARCH-CHAT-000
title: "Chat em Tempo Real (WhatsApp / Discord): WebSocket Gateways e Camada de Presença"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::discord
  - freq::high
---

## Pergunta
Como os servidores de WebSocket Gateway mantêm conexões bidirecionais persistentes e gerenciam o status de presença (Online / Offline) de milhões de usuários?

## Resposta
### Quick Answer
**Solução Direta**:
- **WebSocket Gateway**:
  - Estabelece uma conexão TCP persistente de longa duração e full-duplex com o cliente após o handshake HTTP inicial.
  - Servidores stateless convencionais não conseguem enviar mensagens ativas para clientes; o WebSocket Gateway viabiliza entrega instantânea em tempo real com overhead de cabeçalho de apenas **2 bytes por frame**.
- **Serviço de Presença (Presence Service)**:
  - O cliente envia mensagens periódicas de *Heartbeat / Ping* a cada 30-60 segundos.
  - O gateway grava no Redis com TTL: `SET presence:{user_id} "ONLINE" EX 60`.
  - Se o usuário perder conexão ou não enviar ping antes do TTL expirar, o status transiciona automaticamente para **Offline**.

### Dual Coding Visual
| Protocolo / Mecanismo | Overhead de Cabeçalho por Mensagem | Tipo de Comunicação |
|---|---|---|
| **HTTP Polling Tradicional** | ~500 a 1.000 bytes (Headers completos) | Unidirecional periódica do cliente |
| **WebSocket Persistente** | **2 a 10 bytes por frame** | **Bidirecional full-duplex em tempo real** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Conexões Concorrentes
- Um único servidor Linux com epoll otimizado (ajustando `nofile` para 1 milhão e alocação de buffers TCP) consegue sustentar mais de **500.000 conexões WebSocket simultâneas** em uma única máquina física (Discord Architecture).

</details>
