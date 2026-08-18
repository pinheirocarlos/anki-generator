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
