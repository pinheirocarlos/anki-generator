---
id: DSA-PATT-DP1D-003
title: "Otimização de Espaço de DP 1D de O(N) para O(1) com Duas Variáveis"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::amazon
  - freq::high
---

## Pergunta
Como reduzir o espaço de memória de uma DP 1D de $O(N)$ para **tempo constante $O(1)$** quando o estado depende apenas dos $K$ termos anteriores?

## Resposta
### Quick Answer
**Solução Direta**:
- Se a relação de recorrência para $DP[i]$ depende apenas dos dois estados anteriores ($DP[i-1]$ e $DP[i-2]$, como em *Climbing Stairs* e *Fibonacci*):
  - Não é necessário alocar um array `int dp[N]`.
  - Mantemos apenas duas variáveis escalares: `prev2` e `prev1`.
  - A cada passo: `curr = prev1 + prev2`, seguido por `prev2 = prev1` e `prev1 = curr`.
- **Complexidade**: Reduz o espaço de $O(N)$ para **$O(1)$** estrito mantendo o tempo em $O(N)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/house-robber-dp-state-choice-loop.webm">
    <p>Visualização: Transição de estado escolhendo o máximo entre roubar a casa atual somando a dp[i-2] ou manter dp[i-1].</p>
  </video>
</div>

| Abordagem | Consumo de Memória | Estrutura de Armazenamento |
|---|---|---|
| **Array `dp[]` Completo** | $O(N)$ | Array alocado no Heap |
| **Variáveis Escalares** | $O(1)$ | 2 registradores na CPU |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Climbing Stairs O(1)
```java
public class ClimbingStairs {
  public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
      int curr = prev1 + prev2;
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }
}
```

#### Key Takeaways
- É a primeira pergunta de otimização que qualquer entrevistador sênior fará após você apresentar uma solução com array $O(N)$.

</details>
