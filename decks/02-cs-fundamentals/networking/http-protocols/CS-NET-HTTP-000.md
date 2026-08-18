---
id: CS-NET-HTTP-000
title: "Limitações de Performance do HTTP/1.1 e Ineficiência de Pipelining"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Quais foram as limitações de performance do **HTTP/1.1** (como o Head-of-Line Blocking de requisições) que motivaram o surgimento do HTTP/2?

## Resposta
### Quick Answer
**Solução Direta**:
- **HTTP/1.1 Head-of-Line Blocking na Camada de Aplicação**: Em uma única conexão TCP, o cliente só pode receber a Resposta 2 após o servidor concluir e enviar 100% da Resposta 1. Se uma query de banco na Resposta 1 demorar 3 segundos, todos os outros recursos enfileirados ficam travados.
- **Falha do HTTP Pipelining**: Embora permitisse enviar múltiplas requisições sem esperar resposta, os servidores continuavam obrigados a responder em ordem estrita de chegada, e intermediários (proxies) frequentemente quebravam o pipeline.
- **Contornos Ineficientes**: Navegadores eram forçados a abrir **6 conexões TCP simultâneas por domínio**, exigindo 6 handshakes TCP/TLS separados e multiplicando a carga nos servidores.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/networking/http11-head-of-line-blocking-loop.webm">
    <p>Visualização: Bloqueio de cabeça de fila no HTTP/1.1 onde uma resposta lenta retém todas as requisições subsequentes na mesma conexão.</p>
  </video>
</div>

| Problema no HTTP/1.1 | Impacto de Performance | Solução Adotada no HTTP/2 |
|---|---|---|
| **HoL Blocking de Requisições** | 1 resposta lenta bloqueia a fila | Multiplexing com Streams Binários |
| **Cabeçalhos Redundantes** | Envia cookies/headers texto repetidos | Compressão HPACK com tabela de estado |
| **Conexões Múltiplas (6 por host)**| Múltiplos handshakes TCP/TLS pesados | 1 única conexão TCP multiplexada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Técnicas de Hack Antigas do Frontend (Obsoletas no HTTP/2+)
- **Domain Sharding**: Espalhar assets por múltiplos subdomínios (`cdn1.exemplo.com`, `cdn2.exemplo.com`) para burlar o limite de 6 conexões.
- **CSS Sprites / Inlining**: Juntar 50 ícones em uma única imagem PNG gigante ou embutir Base64 no HTML para economizar requisições HTTP.

#### Key Takeaways
- No HTTP/2 e HTTP/3, essas técnicas antigas se tornaram anti-patterns, pois prejudicam o cache individual de arquivos no navegador.

</details>
