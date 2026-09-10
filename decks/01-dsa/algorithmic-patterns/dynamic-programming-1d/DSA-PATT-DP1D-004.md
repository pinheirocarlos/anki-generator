---
id: DSA-PATT-DP1D-004
title: "Coin Change (Mochila Unbounded) em Tempo O(N · Amount)"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-1d
  - company::amazon
  - freq::high
---

## Pergunta
Como a Programação Dinâmica 1D resolve o problema **Coin Change** (número mínimo de moedas para atingir um valor) em $O(N \cdot \text{amount})$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[a]$ como o número mínimo de moedas necessárias para formar a quantia $a$:
  - Caso base: $DP[0] = 0$, e todas as outras posições inicializadas com $\infty$.
  - Para cada quantia $a$ de $1$ até $\text{amount}$:
    - Para cada moeda $c \in \text{coins}$: se $a - c \ge 0$, então:
      $$DP[a] = \min(DP[a], \ DP[a - c] + 1)$$
- **Complexidade**: $O(N \times \text{amount})$ tempo e $O(\text{amount})$ espaço (variante de Mochila Não-Limitada / *Unbounded Knapsack*).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coin Change: dp[i] = min(dp[i - c] + 1) para cada moeda c</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transição de Estado 1D (Mochila Unbounded)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Base: dp[0] = 0; todos os outros valores inicializados com INF.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Para i de 1 até Amount: dp[i] = min(dp[i], dp[i - c] + 1) para cada moeda válida c ≤ i.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo: O(Amount × |coins|) | Espaço Auxiliar: O(Amount)</text>
</svg>
<p>Visualização: Transição de estado 1D no Coin Change minimizando o número de moedas para cada valor acumulado de 0 a Amount.</p>

| Quantia Alvo $a$ | Relação de Recorrência | Caso Impossível |
|---|---|---|
| $a = 0$ | $DP[0] = 0$ (0 moedas) | N/A |
| $a > 0$ | $\min_{c}(DP[a - c] + 1)$ | Retorna $-1$ se $DP[\text{amount}] == \infty$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Coin Change
```java
import java.util.Arrays;

public class CoinChange {
  public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); // Valor infinito seguro
    dp[0] = 0;

    for (int a = 1; a <= amount; a++) {
      for (int c : coins) {
        if (a - c >= 0) {
          dp[a] = Math.min(dp[a], dp[a - c] + 1);
        }
      }
    }
    return dp[amount] > amount ? -1 : dp[amount];
  }
}
```

#### Key Takeaways
- Como podemos reutilizar a mesma moeda múltiplas vezes, a iteração de valores ocorre naturalmente de forma crescente de $1$ a $\text{amount}$.

</details>
