---
id: SYS-ARCH-FEED-006
title: "Intuição Fundamental de Feed Social: Entregar o Jornal na Porta vs Ir à Banca de Revistas"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Qual é a intuição fundamental da escolha entre Fan-Out on Write (Push) e Fan-Out on Read (Pull) ao projetar um Feed de Notícias em redes sociais (como Twitter ou Instagram)?

## Resposta
### Quick Answer
**Solução Direta**:
- Um feed de notícias precisa montar a linha do tempo cronológica com os posts de todas as pessoas que você segue:
  - **Fan-Out on Write (Push / Jornaleiro na Porta)**: Quando alguém publica um post, o sistema insere imediatamente uma cópia do post no cache da timeline de cada um dos seus seguidores. Ao abrir o app, a leitura é **instantânea ($O(1)$)**, mas a gravação é cara se o autor tiver muitos seguidores.
  - **Fan-Out on Read (Pull / Ir à Banca)**: Quando o usuário abre o app, o sistema busca os posts recentes de todos os 500 amigos que ele segue e junta tudo na hora. A escrita é grátis, mas a leitura é lenta.
- **Solução Híbrida da Indústria**: Usamos **Push** para 99% dos usuários normais e **Pull** para Celebridades com milhões de seguidores (evitando o gargalo de atualizar 50 milhões de caixas de entrada de uma vez).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Fan-Out on Write (Usuários Comuns) vs Fan-Out on Read (Celebridades)</text>

  <!-- Fan-Out on Write (Push) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="230" height="95" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="8" />
    <text x="115" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Fan-Out on Write (Push)</text>
    <text x="115" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Usuário com 200 amigos posta:</text>
    <text x="115" y="62" fill="#34d399" font-size="9" text-anchor="middle">Escreve em 200 caixas de cache</text>
    <text x="115" y="80" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">⚡ Leitura Instantânea: $O(1)$</text>
  </g>

  <!-- Problema da Celebridade (Pull) -->
  <g transform="translate(330, 50)">
    <rect x="0" y="0" width="230" height="95" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="8" />
    <text x="115" y="22" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">Tratamento de Celebridades (Pull)</text>
    <text x="115" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Celebridade com 80M seguidores posta:</text>
    <text x="115" y="62" fill="#fde68a" font-size="9" text-anchor="middle">NÃO faz push para 80 milhões!</text>
    <text x="115" y="80" fill="#f59e0b" font-size="9" text-anchor="middle">O seguidor faz merge do post na leitura</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">A arquitetura híbrida resolve o problema das celebridades mantendo o app rápido!</text>
</svg>

| Abordagem | Vantagem | Desafio Crítico |
|---|---|---|
| **Fan-Out on Write (Push)** | Leitura do feed em sub-milissegundo | Se uma celebridade posta, o cluster trava tentando escrever 80 milhões de vezes. |
| **Fan-Out on Read (Pull)** | Postar é instantâneo e barato | O carregamento da tela do usuário fica lento juntando dezenas de amigos. |
| **Híbrido (Twitter / Meta)** | Rápido para leitura sem travar com celebridades | Exige mesclar posts da celebridade no cache do feed na hora da leitura. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Funciona a Timeline em Memória (Redis ZSet)
A timeline de cada usuário no Redis é uma lista ordenada por timestamp (**Sorted Set / ZSet**):
- A chave é `timeline:user_123`.
- A pontuação (*score*) é o timestamp da postagem.
- O valor é o `tweet_id`.
- Ao abrir o app, o comando `ZREVRANGEBYSCORE` traz os 20 tweets mais recentes instantaneamente em RAM.

#### Key Takeaways
- Em redes sociais, a leitura de feeds é ordens de magnitude mais frequente que a publicação de posts.
- A arquitetura híbrida de Fan-out é o padrão de ouro da indústria.

</details>
