---
id: CS-NET-API-001
title: "Mecanismo de Upgrade de Protocolo HTTP para WebSocket"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona o mecanismo de **Upgrade de Conexão HTTP para WebSocket** via cabeçalhos e negociação de chave `Sec-WebSocket-Accept`?

## Resposta
### Quick Answer
**Solução Direta**:
- A conexão WebSocket se inicia como uma requisição HTTP/1.1 padrão contendo cabeçalhos de upgrade:
  1. **Requisição do Cliente**:
     ```text
     GET /chat HTTP/1.1
     Host: server.exemplo.com
     Upgrade: websocket
     Connection: Upgrade
     Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
     Sec-WebSocket-Version: 13
     ```
  2. **Resposta do Servidor (Status 101 Switching Protocols)**:
     - O servidor concatena a chave recebida com um GUID global padronizado (`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`), calcula o hash **SHA-1** e codifica em Base64, retornando no cabeçalho `Sec-WebSocket-Accept`.
  3. A partir deste momento, o socket abandona o protocolo HTTP e passa a transmitir **frames binários WebSocket bidirecionais** sobre o mesmo túnel TCP.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Upgrade de Protocolo HTTP para WebSocket (101 Switching Protocols)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Handshake Inicial HTTP GET com Headers de Upgrade</text>
    <text x="280" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">GET /ws HTTP/1.1 | Upgrade: websocket | Connection: Upgrade | Sec-WebSocket-Key: ...</text>
    <text x="280" y="68" fill="#10b981" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">HTTP/1.1 101 Switching Protocols → Socket bidirecional TCP estabelecido!</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Após o status 101, os headers HTTP são descartados e a comunicação passa a ser puramente por frames WS (2B overhead).</text>

</svg>

| Fase da Conexão | Protocolo Ativo | Código de Status HTTP |
|---|---|---|
| **Início (Handshake)** | HTTP/1.1 (Texto com cabeçalhos de upgrade) | `101 Switching Protocols` |
| **Após Handshake** | WebSocket (Frames binários Full-Duplex) | Nenhum (Túnel TCP direto ativo) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desafios com Load Balancers e Proxies
- Proxies reversos (como NGINX ou AWS ALB) precisam ser explicitamente configurados para suportar o upgrade:
```text
location /ws {
    proxy_pass http://backend_nodes;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_read_timeout 3600s;
}
```

#### Key Takeaways
- O cálculo do `Sec-WebSocket-Accept` com SHA-1 não é para autenticação ou segurança criptográfica, mas para provar que o servidor suporta nativamente a especificação WebSocket e não é um proxy HTTP desavisado.

</details>
