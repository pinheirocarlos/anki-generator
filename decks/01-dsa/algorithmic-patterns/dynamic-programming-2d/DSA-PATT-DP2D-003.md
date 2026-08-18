---
id: DSA-PATT-DP2D-003
title: "Longest Common Subsequence (LCS) e Casamento de Caracteres em O(M·N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::google
  - freq::high
---

## Pergunta
Como a Programação Dinâmica 2D resolve o problema **Longest Common Subsequence (LCS)** em tempo $O(M \times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o comprimento da maior subsequência comum entre os prefixos $S_1[0..i-1]$ e $S_2[0..j-1]$:
  - **Se os caracteres coincidem ($S_1[i-1] == S_2[j-1]$)**: Estendemos a subsequência diagonal anterior:
    $$DP[i][j] = 1 + DP[i-1][j-1]$$
  - **Se são diferentes**: Tomamos o melhor resultado descartando um caractere de $S_1$ ou de $S_2$:
    $$DP[i][j] = \max(DP[i-1][j], \ DP[i][j-1])$$
- **Complexidade**: $O(M \times N)$ tempo e $O(M \times N)$ espaço (ou $O(\min(M, N))$ otimizado).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/lcs-grid-matching-diagonal-loop.webm">
    <p>Visualização: Se caracteres coincidem: soma diagonal +1; se divergem: máximo entre vizinho superior e esquerdo.</p>
  </video>
</div>

| Comparação de Caracteres | Equação de Transição | Direção de Preenchimento |
|---|---|---|
| $S_1[i-1] == S_2[j-1]$ | $1 + DP[i-1][j-1]$ | Diagonal Superior |
| $S_1[i-1] \neq S_2[j-1]$ | $\max(DP[i-1][j], DP[i][j-1])$ | $\max(\text{Cima}, \text{Esquerda})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Práticas
- É a base do utilitário `git diff`, de algoritmos de alinhamento de sequências de DNA (Needleman-Wunsch) e corretores ortográficos.

#### Key Takeaways
- É o problema arquetípico para qualquer problema de processamento de duas strings em entrevistas técnicas.

</details>
