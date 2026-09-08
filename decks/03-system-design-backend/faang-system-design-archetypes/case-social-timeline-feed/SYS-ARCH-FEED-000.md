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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Feed de Notícias (Twitter / Instagram): Fan-Out on Write vs Fan-Out on Read</text>
  <g transform="translate(40, 50)">
    <!-- Fan-Out on Write (Push) -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fan-Out on Write (Push Model)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Post novo grava na Inbox de cada seguidor</text>
    <text x="140" y="65" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Leitura do Feed: O(1) instantânea (Redis)</text>
    <text x="140" y="88" fill="#f87171" font-size="10" text-anchor="middle">Problema: Celebridade com 50M seguidores</text>
    <text x="140" y="112" fill="#fca5a5" font-size="9" text-anchor="middle">Dispara 50.000.000 gravações simultâneas!</text>

    <!-- Fan-Out on Read (Pull) -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fan-Out on Read (Pull Model)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Post grava apenas na tabela do autor O(1)</text>
    <text x="460" y="65" fill="#f87171" font-size="10" text-anchor="middle">Leitura: busca posts de todas as pessoas</text>
    <text x="460" y="88" fill="#f87171" font-size="10" text-anchor="middle">que o usuário segue e mescla com K-Way</text>
    <text x="460" y="112" fill="#fca5a5" font-size="9" text-anchor="middle">Gera latência inaceitável na leitura</text>
  </g>
  <text x="340" y="215" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Sistemas modernos usam o modelo híbrido para obter o melhor de ambos os mundos.</text>

</svg>
<p>Visualização: Fan-Out on Write gravando posts na caixa de entrada de cada seguidor vs Fan-Out on Read consultando na hora da leitura.</p>

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
