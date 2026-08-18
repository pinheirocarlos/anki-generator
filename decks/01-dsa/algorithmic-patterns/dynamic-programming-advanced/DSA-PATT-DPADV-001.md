---
id: DSA-PATT-DPADV-001
title: "Matrix Chain Multiplication (MCM) e DP sobre Intervalos [i, j] em O(N³)"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-advanced
  - company::amazon
  - freq::high
---

## Pergunta
Como o paradigma de **Matrix Chain Multiplication (MCM)** particiona intervalos $[i, j]$ para encontrar a ordem de parentização ótima em $O(N^3)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o custo mínimo para multiplicar a cadeia de matrizes de $A_i$ até $A_j$:
  - Testamos todos os possíveis pontos de corte intermediários $k$ entre $i$ e $j-1$:
    $$DP[i][j] = \min_{i \le k < j} (DP[i][k] + DP[k+1][j] + p_{i-1} \cdot p_k \cdot p_j)$$
  - Onde $p_{i-1} \cdot p_k \cdot p_j$ é o custo de multiplicar a matriz resultante $(A_i..A_k)$ pela matriz $(A_{k+1}..A_j)$.
- **Complexidade**: $O(N^3)$ tempo e $O(N^2)$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/tsp-bitmask-state-graph-loop.webm">
    <p>Visualização: Busca pelo menor ciclo hamiltoniano computando dp[mask][u] com transições para vizinhos não visitados.</p>
  </video>
</div>

| Componente da Recorrência | Significado |
|---|---|
| $DP[i][k]$ | Custo ótimo da partição esquerda |
| $DP[k+1][j]$ | Custo ótimo da partição direita |
| $p_{i-1} p_k p_j$ | Custo de fundir as duas matrizes resultantes |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Problemas Análogos
- *Minimum Cost Tree From Leaf Values* (LeetCode 1130)
- *Burst Balloons* (LeetCode 312)
- *Remove Boxes* (LeetCode 546)

#### Key Takeaways
- A iteração deve ser feita por comprimento crescente do intervalo $\text{len} = j - i + 1$.

</details>
