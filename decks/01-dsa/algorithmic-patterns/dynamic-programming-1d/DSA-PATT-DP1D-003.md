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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Longest Increasing Subsequence (LIS): DP O(N²) vs Patience Sorting O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="120" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">DP Clássico O(N²)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">dp[i] = max(dp[j] + 1) para j &lt; i</text>
    <text x="15" y="60" fill="#fde68a" font-size="10">Dois loops aninhados simples</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Patience Sorting O(N log N)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Mantém array 'tails' ordenado</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Substitui com binary search (lower_bound)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Patience sorting escala com facilidade para N = 10⁵ elementos</text>

</svg>

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
