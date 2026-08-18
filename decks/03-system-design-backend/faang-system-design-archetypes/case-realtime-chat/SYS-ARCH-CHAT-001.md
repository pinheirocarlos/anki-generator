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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/chat-routing-redis-pubsub-cross-server-loop.webm">
    <p>Visualização: Roteamento de mensagens entre instâncias de WebSocket através de canais dedicados no Redis Pub/Sub.</p>
  </video>
</div>

| Estado do Destinatário | Caminho de Entrega | Latência Típica |
|---|---|---|
| **Online (Conectado em Gateway)** | WebSocket direto via Redis Pub/Sub | Sub-100 ms |
| **Offline (Desconectado)** | Persistência em Banco + Apple APNs / Google FCM | Segundos (Desperta o celular) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Roteamento de Grupos (Group Chat)
- Para chats de grupo grandes, a mensagem é publicada em um tópico Kafka compartilhado do grupo; gateways inscritos entregam para os membros locais conectados em seus respectivos nós.

</details>
