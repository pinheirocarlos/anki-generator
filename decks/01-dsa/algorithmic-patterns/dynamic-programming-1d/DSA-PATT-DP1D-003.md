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
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressão de Espaço 1D: Vetor O(N) → Duas Variáveis O(1)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Janela Deslizante de Estado: prev2 e prev1</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Quando dp[i] depende apenas de dp[i-1] e dp[i-2], o histórico anterior é irrelevante.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">curr = f(prev1, prev2) ➔ prev2 = prev1 ➔ prev1 = curr. Memória O(1) estrita.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Redução drástica de cache misses e footprint de memória de O(N) para O(1)</text>
</svg>
<p>Visualização: Compressão espacial de vetor DP completo O(N) para duas variáveis de estado O(1) quando o cálculo depende apenas de i-1 e i-2.</p>

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
