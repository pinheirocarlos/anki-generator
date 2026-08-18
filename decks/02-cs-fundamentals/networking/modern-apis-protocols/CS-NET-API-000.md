---
id: CS-NET-API-000
title: "Comparação de Paradigmas: REST vs WebSockets vs Server-Sent Events (SSE)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Quais são as diferenças fundamentais de modelo de comunicação entre **HTTP REST**, **WebSockets** e **Server-Sent Events (SSE)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **HTTP REST (Request/Response)**: Modelo unidirecional iniciado exclusivamente pelo cliente. O servidor não pode enviar dados espontaneamente sem requisição prévia; alto overhead se usado com polling periódico.
- **WebSockets (Full-Duplex Bidirecional)**: Conexão TCP persistente bidirecional sobre 1 único socket. Cliente e servidor podem transmitir mensagens simultaneamente com overhead de framing de apenas 2 a 10 bytes. Ideal para chat, jogos multiplayer e colaboração em tempo real.
- **Server-Sent Events (SSE - Unidirecional Servidor $\to$ Cliente)**: Fluxo contínuo de texto sobre HTTP padrão (`text/event-stream`) onde o servidor envia atualizações em tempo real para o cliente. Suporta reconexão automática nativa; ideal para feeds de notícias, cotações financeiras e streaming de tokens de LLMs (ChatGPT).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/networking/rest-websocket-sse-comparison-loop.webm">
    <p>Visualização: Request-Response síncrono (REST) vs Full-Duplex bidirecional (WebSockets) vs Unidirecional servidor->cliente (SSE).</p>
  </video>
</div>

| Protocolo | Direção da Comunicação | Protocolo Base |
|---|---|---|
| **HTTP REST** | Unidirecional (Cliente $	o$ Servidor) | HTTP/1.1 ou HTTP/2 |
| **WebSockets** | Full-Duplex (Bidirecional) | TCP Puro (via Upgrade) |
| **SSE** | Unidirecional (Servidor $	o$ Cliente) | HTTP (`text/event-stream`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que LLMs usam SSE em vez de WebSockets?
- Plataformas de IA generativa transmitem respostas usando **SSE** porque o fluxo de tokens é estritamente unidirecional (do servidor para o cliente).
- SSE roda sobre HTTP padrão, aproveitando balanceadores de carga existentes, autenticação HTTP tradicional, TLS e compressão sem o overhead de gerenciar estado de sockets bidirecionais.

#### Key Takeaways
- Use WebSockets para tráfego bidirecional intenso e SSE para streaming unidirecional do servidor para o cliente.

</details>
