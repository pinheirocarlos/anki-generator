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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Comparativo de Paradigmas: REST vs WebSockets vs SSE</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="85" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="85" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">REST (HTTP/1.1-2)</text>
    <text x="85" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Request / Response</text>
    <text x="85" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Unidirecional / Sem estado</text>
    <text x="85" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">CRUD / APIs Públicas</text>

    <rect x="195" y="0" width="170" height="85" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">WebSockets</text>
    <text x="280" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Full-Duplex Persistente</text>
    <text x="280" y="60" fill="#a7f3d0" font-size="9" text-anchor="middle">Cliente &amp; Servidor emitem</text>
    <text x="280" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Chat / Jogos / Trading</text>

    <rect x="390" y="0" width="170" height="85" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">SSE (Server-Sent)</text>
    <text x="475" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Streaming Unidirecional</text>
    <text x="475" y="60" fill="#fef3c7" font-size="9" text-anchor="middle">Server → Client push</text>
    <text x="475" y="76" fill="#fef3c7" font-size="9" text-anchor="middle">LLM Tokens / Notificações</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">SSE roda nativamente sobre HTTP padrão com reconexão automática; WebSockets requer infra dedicada de state.</text>

</svg>
<p>Visualização: Comparação de arquitetura e direção de tráfego entre REST (unidirecional pontual), WebSockets (bidirecional full-duplex) e SSE (streaming unidirecional).</p>

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
