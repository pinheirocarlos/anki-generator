---
id: DSA-PATT-DP2D-004
title: "Edit Distance (Levenshtein Distance) com Inserção, Deleção e Substituição"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-2d
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Edit Distance (Distância de Levenshtein)** computa o número mínimo de operações de edição entre duas strings em $O(M \times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o custo mínimo para converter $S_1[0..i-1]$ em $S_2[0..j-1]$:
  - Se $S_1[i-1] == S_2[j-1]$, custo zero: $DP[i][j] = DP[i-1][j-1]$.
  - Se $S_1[i-1] \neq S_2[j-1]$, escolhemos a operação de menor custo $+ 1$:
    $$DP[i][j] = 1 + \min \begin{cases} DP[i][j-1] & (\text{Inserção}) \\ DP[i-1][j] & (\text{Deleção}) \\ DP[i-1][j-1] & (\text{Substituição}) \end{cases}$$
- **Complexidade**: $O(M \times N)$ tempo e $O(M \times N)$ espaço (ou $O(N)$ comprimido).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Unique Paths em Grid: dp[i][j] = dp[i-1][j] + dp[i][j-1]</text>
  <g transform="translate(120, 50)">
    <rect x="0" y="0" width="60" height="40" fill="#1e293b" stroke="#64748b" rx="3"/><text x="30" y="25" fill="#94a3b8" font-size="11" text-anchor="middle">Cima</text>
    <text x="80" y="25" fill="#34d399" font-size="14" font-weight="bold">+</text>
    <rect x="100" y="0" width="60" height="40" fill="#1e293b" stroke="#64748b" rx="3"/><text x="130" y="25" fill="#94a3b8" font-size="11" text-anchor="middle">Esq</text>
    <text x="180" y="25" fill="#34d399" font-size="14" font-weight="bold">=</text>
    <rect x="200" y="0" width="80" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="240" y="25" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">dp[i][j]</text>
  </g>
  <text x="340" y="145" fill="#38bdf8" font-size="11" text-anchor="middle">Se grid[i][j] é obstáculo: dp[i][j] = 0 (caminho bloqueado)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Reduzível a 1 único array 1D de tamanho N (dp[j] += dp[j-1]) com espaço O(N)</text>

</svg>

| Operação de Edição | Posição na Matriz DP | Racional |
|---|---|---|
| **Substituição** | Diagonal $DP[i-1][j-1]$ | Troca o caractere correspondente |
| **Inserção** | Esquerda $DP[i][j-1]$ | Insere caractere de $S_2$ em $S_1$ |
| **Deleção** | Cima $DP[i-1][j]$ | Remove caractere de $S_1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Edit Distance
```java
public class EditDistance {
  public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
        }
      }
    }
    return dp[m][n];
  }
}
```

#### Key Takeaways
- É um clássico para avaliação de algoritmos de processamento de texto e NLP.

</details>
