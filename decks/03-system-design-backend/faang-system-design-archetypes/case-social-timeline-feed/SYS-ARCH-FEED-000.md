---
id: SYS-ARCH-FEED-000
title: "Feed de Notícias (Twitter / Instagram): Fan-Out on Write (Push) vs Fan-Out on Read (Pull)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::twitter
  - freq::high
---

## Pergunta
Qual é o trade-off fundamental entre Fan-Out on Write (Push Model) e Fan-Out on Read (Pull Model) na construção de feeds de redes sociais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fan-Out on Write (Push Model - Pré-computação na Escrita)**:
  - Quando um usuário publica um post, o sistema busca todos os seus seguidores e **injeta o `post_id` na Timeline em memória (Redis) de cada seguidor imediatamente**.
  - **Leitura**: Ultra-rápida em $O(1)$ (basta ler a lista do Redis do usuário).
  - **Problema**: Inviável para celebridades com milhões de seguidores (*Celebrity Problem*).
- **Fan-Out on Read (Pull Model - Computação sob Demanda na Leitura)**:
  - O post é apenas gravado na tabela do autor.
  - Quando o seguidor abre o feed, o sistema busca os posts de todos os autores seguidos e faz o *Merge Sort* em tempo real.
  - **Escrita**: Instantânea em $O(1)$.
  - **Problema**: Leituras ficam extremamente lentas se o usuário seguir centenas de contas ativas.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/social-feed-fanout-push-vs-pull-timeline-loop.webm">
    <p>Visualização: Fan-Out on Write gravando posts na caixa de entrada de cada seguidor vs Fan-Out on Read consultando na hora da leitura.</p>
  </video>
</div>

| Modelo de Feed | Custo na Publicação (Write) | Custo no Carregamento (Read) |
|---|---|---|
| **Fan-Out on Write (Push)** | Alto ($O(\text{seguidores})$ gravações no Redis) | **Instantâneo ($O(1)$ leitura direta de lista)** |
| **Fan-Out on Read (Pull)** | Baixo ($O(1)$ gravação única) | Alto ($O(\text{seguidos})$ consultas e merge) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura no Redis (ZSet para Feed)
- Cada usuário tem uma chave `feed:{user_id}` como um `ZSet` no Redis:
  - `Member = post_id`
  - `Score = timestamp_epoch_ms`
  - Para ler a página 1: `ZREVRANGEBYSCORE feed:101 +inf -inf LIMIT 0 20` (Leitura sub-milissegundo).

</details>
