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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/coin-change-min-coins-dp-loop.webm">
    <p>Visualização: Preenchimento de valores de 1 até T computando min(dp[amount - coin] + 1) para cada moeda disponível.</p>
  </video>
</div>

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
