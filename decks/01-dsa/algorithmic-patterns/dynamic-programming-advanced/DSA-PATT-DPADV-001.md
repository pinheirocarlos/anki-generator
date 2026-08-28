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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Digit DP: Contagem de Números com Propriedades em [L, R]</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">solve(R) - solve(L - 1) com Parâmetros de Estado</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">memo[idx][isTight][hasLeadingZero][conditionState].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">isTight == true limita o dígito atual ao teto do número original; caso contrário, varia de 0 a 9.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas com números de até 10¹⁸ dígitos em tempo O(log₁₀ N · Estados)</text>

</svg>

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
