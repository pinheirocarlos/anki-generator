---
id: DSA-PATT-DP2D-002
title: "Otimização de Espaço de DP 2D de O(M·N) para O(N) com Array de Rolamento"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::amazon
  - freq::high
---

## Pergunta
Como a técnica de **Array de Rolamento (Rolling Array)** reduz o consumo de memória de uma DP 2D de $O(M \times N)$ para $O(N)$ de uma única linha?

## Resposta
### Quick Answer
**Solução Direta**:
- Na equação $DP[r][c] = DP[r-1][c] + DP[r][c-1]$, o cálculo da linha atual $r$ depende **apenas da linha imediatamente anterior $r-1$** e do valor recém-calculado à esquerda $DP[r][c-1]$.
- Alocamos um array unidimensional `dp[]` de tamanho $N$:
  - `dp[c]` antes de ser atualizado contém o valor da **linha de cima** ($DP[r-1][c]$).
  - `dp[c-1]` já atualizado contém o valor da **esquerda** ($DP[r][c-1]$).
  - Atualizamos in-place: `dp[c] = dp[c] + dp[c-1]`.
- **Complexidade**: Reduz o espaço de $O(M \times N)$ para **$O(N)$** mantendo o tempo em $O(M \times N)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Otimização de Espaço em DP 2D: Matriz O(M·N) → Array 1D O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Rolling Array (Duas Linhas) ou 1D Reverso</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se a linha i depende estritamente da linha i-1, usa-se dp[i % 2] ou vetor único.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Na Mochila 0/1: itera-se w de W até wt de trás para frente para evitar reuso do mesmo item.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Redução massiva de consumo de memória RAM preservando o tempo O(M × N)</text>
</svg>
<p>Visualização: Otimização de espaço de DP 2D eliminando linhas antigas e mantendo apenas a linha corrente ou vetor 1D reverso O(N).</p>
| Estrutura de Armazenamento | Consumo de Memória | Acesso ao Vizinho de Cima |
|---|---|---|
| **Matriz $M \times N$** | $O(M \times N)$ | `dp[r-1][c]` |
| **Array Plano de 1 Linha** | $O(N)$ | `dp[c]` antes do update |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Unique Paths O(N) Espaço
```java
import java.util.Arrays;

public class UniquePathsOptimized {
  public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1); // Linha 0 inicializada com 1s

    for (int r = 1; r < m; r++) {
      for (int c = 1; c < n; c++) {
        dp[c] += dp[c - 1];
      }
    }
    return dp[n - 1];
  }
}
```

#### Key Takeaways
- É aplicável em praticamente qualquer DP de matriz ou alinhamento de strings (LCS, Edit Distance) que dependa apenas da linha anterior.

</details>
