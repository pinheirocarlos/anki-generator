---
id: DSA-ADV-GAMETHEORY-002
title: "Jogo de Nim e o Teorema de Bouton (Nim-Sum via XOR) em Tempo O(N)"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::meta
  - freq::high
---

## Pergunta
Como o **Teorema de Bouton** utiliza a **Soma de Nim (XOR acumulado das pilhas)** para determinar instantaneamente o vencedor do Jogo de Nim?

## Resposta
### Quick Answer
**Solução Direta**:
- Sejam $n$ pilhas de moedas com tamanhos $x_1, x_2, \dots, x_n$.
- A **Soma de Nim** é calculada como o XOR bitwise de todos os tamanhos de pilha:
  $$S = x_1 \oplus x_2 \oplus \dots \oplus x_n$$
- **Teorema de Bouton**:
  - Se **$S = 0$**: O estado é uma **P-Position** (o primeiro jogador perde com jogo perfeito).
  - Se **$S \neq 0$**: O estado é uma **N-Position** (o primeiro jogador vence garantidamente).
- **Estratégia Vencedora**: Sempre que $S \neq 0$, o jogador atual pode alterar uma pilha $x_k$ para $x_k' = x_k \oplus S < x_k$, restaurando a nova soma de Nim para $0$ e deixando o adversário em posição perdedora.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/minimax-alpha-beta-pruning-tree-loop.webm">
    <p>Visualização: Maximização de ganhos e minimização de perdas cortando ramos onde alpha >= beta na árvore de recursão.</p>
  </video>
</div>

| Soma de Nim ($S = \bigoplus x_i$) | Tipo de Posição | Destino do Primeiro Jogador |
|---|---|---|
| $S = 0$ | P-Position | Derrota garantida contra jogo perfeito |
| $S \neq 0$ | N-Position | Vitória garantida com jogada ótima |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Transforma a análise de combinações exponenciais de jogadas em um único cálculo linear de XOR $O(N)$ em tempo constante de memória $O(1)$.

</details>
