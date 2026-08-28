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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Chat em Tempo Real: WebSocket Gateways &amp; Camada de Presença</text>
  <g transform="translate(40, 50)">
    <!-- Clients -->
    <rect x="0" y="10" width="130" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="32" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Clientes Mobile/Web</text>
    <text x="65" y="55" fill="#cbd5e1" font-size="9" text-anchor="middle">Conexão WSS Duplex</text>
    <text x="65" y="75" fill="#86efac" font-size="9" text-anchor="middle">Heartbeat a cada 30s</text>

    <!-- WebSocket Servers -->
    <rect x="180" y="10" width="160" height="95" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
    <text x="260" y="35" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">WS Gateway Cluster</text>
    <text x="260" y="55" fill="#e0f2fe" font-size="9" text-anchor="middle">100.000 conexões/nó</text>
    <text x="260" y="75" fill="#bae6fd" font-size="9" text-anchor="middle">Mantém sockets TCP abertos</text>

    <!-- Redis Presence -->
    <rect x="390" y="10" width="190" height="95" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="485" y="35" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Presence Engine</text>
    <text x="485" y="55" fill="#fef3c7" font-size="9" text-anchor="middle">HSET presence:user_id</text>
    <text x="485" y="75" fill="#fde68a" font-size="9" text-anchor="middle">{server_ip, status, ttl:60s}</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Se o cliente perder a conexão e não enviar heartbeat, o TTL do Redis expira e marca status 'offline'.</text>

</svg>

| Protocolo / Mecanismo | Overhead de Cabeçalho por Mensagem | Tipo de Comunicação |
|---|---|---|
| **HTTP Polling Tradicional** | ~500 a 1.000 bytes (Headers completos) | Unidirecional periódica do cliente |
| **WebSocket Persistente** | **2 a 10 bytes por frame** | **Bidirecional full-duplex em tempo real** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Conexões Concorrentes
- Um único servidor Linux com epoll otimizado (ajustando `nofile` para 1 milhão e alocação de buffers TCP) consegue sustentar mais de **500.000 conexões WebSocket simultâneas** em uma única máquina física (Discord Architecture).

</details>
