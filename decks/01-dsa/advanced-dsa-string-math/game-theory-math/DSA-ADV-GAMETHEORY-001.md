---
id: DSA-ADV-GAMETHEORY-001
title: "Algoritmo Minimax e Poda Alfa-Beta (Alpha-Beta Pruning) para Jogos com 2 Jogadores"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como a **Poda Alfa-Beta (Alpha-Beta Pruning)** reduz o número de nós avaliados pelo Algoritmo Minimax de $O(B^d)$ para $O(B^{d/2})$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo **Minimax** assume que o jogador MAX tenta maximizar a pontuação e MIN tenta minimizá-la.
- **Poda Alfa-Beta**: Mantém dois limites na árvore de recursão:
  - $\alpha$: A melhor pontuação que o jogador MAX já garantiu até o momento.
  - $\beta$: A melhor pontuação que o jogador MIN já garantiu até o momento.
- **Condição de Poda**: Se em qualquer nó for detectado que **$\beta \le \alpha$**, a busca naquele ramo é **imediatamente abortada**:
  - Significa que o oponente em um nível superior jamais permitirá que o jogo chegue a este estado, tornando inútil calcular seus filhos.
- **Complexidade**: Com ordenação ótima de jogadas, reduz a árvore de $O(B^d)$ para **$O(B^{d/2})$**, dobrando a profundidade explorável no mesmo tempo.

### Dual Coding Visual
| Parâmetro de Poda | Papel na Busca | Condição de Corte |
|---|---|---|
| **$\alpha$ (Alfa)** | Maximizador (Piso de pontuação) | Se $\beta \le \alpha \implies$ Poda ramo |
| **$\beta$ (Beta)** | Minimizador (Teto de pontuação) | Se $\beta \le \alpha \implies$ Poda ramo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo central para motores de jogos clássicos como Xadrez, Damas e Jogo da Velha (Tic-Tac-Toe).

</details>
