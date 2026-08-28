---
id: SYS-ARCH-CHAT-001
title: "Roteamento de Mensagens entre Servidores de Chat via Redis Pub/Sub e Notificações Push"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Como o sistema roteia uma mensagem de chat quando o Remetente e o Destinatário estão conectados em servidores de WebSocket Gateway fisicamente diferentes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Tabela de Sessões em Memória (Session Registry)**:
  - Quando o Usuário B conecta no `Gateway-3`, o gateway registra no Redis: `HSET user_sessions "user_B" "gateway_3"`.
- **Fluxo de Roteamento Ponto a Ponto**:
  1. O Usuário A envia mensagem para B no `Gateway-1`.
  2. O `Gateway-1` consulta o Redis e descobre que B está conectado no `Gateway-3`.
  3. O `Gateway-1` publica a mensagem no canal interno do `Gateway-3` via **Redis Pub/Sub ou Kafka** (`PUBLISH gateway_3_events payload`).
  4. O `Gateway-3` consome o evento e descarrega a mensagem no socket TCP aberto do Usuário B.
- **Tratamento de Usuário Offline**: Se B não estiver conectado em nenhum gateway, o sistema persiste no banco (Cassandra/Postgres) e dispara uma **Notificação Push (APNs / FCM)**.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Roteamento de Mensagens entre Servidores WS via Redis Pub/Sub</text>
  <g transform="translate(40, 50)">
    <!-- Server 1 (Alice) -->
    <rect x="0" y="0" width="170" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="85" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">WS Gateway 1 (Alice)</text>
    <text x="85" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Alice envia: "Olá Bob!"</text>
    <text x="85" y="70" fill="#fbbf24" font-size="9" text-anchor="middle">Publica no canal de Bob</text>
    <text x="85" y="90" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">PUBLISH user:bob</text>

    <!-- Redis Message Broker -->
    <rect x="210" y="25" width="180" height="60" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="300" y="50" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Pub/Sub / Kafka</text>
    <text x="300" y="70" fill="#fde68a" font-size="9" text-anchor="middle">Entrega em &lt; 2ms</text>

    <!-- Server 2 (Bob) -->
    <rect x="430" y="0" width="170" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="515" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">WS Gateway 2 (Bob)</text>
    <text x="515" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Inscrito em user:bob</text>
    <text x="515" y="70" fill="#86efac" font-size="9" text-anchor="middle">Recebe evento e despacha</text>
    <text x="515" y="90" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Socket TCP → Bob UI</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Se Bob estiver offline, a mensagem é gravada no banco de histórico (Cassandra/ScyllaDB) e disparada via Push Notification (FCM/APNS).</text>

</svg>

| Estado do Destinatário | Caminho de Entrega | Latência Típica |
|---|---|---|
| **Online (Conectado em Gateway)** | WebSocket direto via Redis Pub/Sub | Sub-100 ms |
| **Offline (Desconectado)** | Persistência em Banco + Apple APNs / Google FCM | Segundos (Desperta o celular) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Roteamento de Grupos (Group Chat)
- Para chats de grupo grandes, a mensagem é publicada em um tópico Kafka compartilhado do grupo; gateways inscritos entregam para os membros locais conectados em seus respectivos nós.

</details>
