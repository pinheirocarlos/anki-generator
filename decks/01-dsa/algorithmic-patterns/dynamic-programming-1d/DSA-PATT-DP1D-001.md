---
id: DSA-PATT-DP1D-001
title: "House Robber e a Transição de Estados DP[i] = max(DP[i-1], DP[i-2] + nums[i])"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-1d
  - company::meta
  - freq::high
---

## Pergunta
Como modelar a equação de recorrência e a escolha binária (roubar vs não roubar) no problema **House Robber** (LeetCode 198)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em cada casa $i$, existem duas escolhas mutualmente exclusivas:
  1. **Não roubar a casa $i$**: O ganho máximo é igual ao acumulado até a casa anterior ($DP[i-1]$).
  2. **Roubar a casa $i$**: Não podemos roubar a casa $i-1$; logo, o ganho é o valor de $A[i]$ mais o acumulado até a casa $i-2$ ($DP[i-2] + A[i]$).
- **Equação de Recorrência**:
  $$DP[i] = \max(DP[i-1], \ DP[i-2] + A[i])$$
- **Complexidade**: $O(N)$ tempo e $O(1)$ espaço (usando duas variáveis).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">House Robber: Decisão Binária em Cada Casa (Roubar vs Pular)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="15" width="80" height="45" fill="#1e293b" stroke="#64748b" rx="4"/>
    <text x="40" y="35" fill="#94a3b8" font-size="11" text-anchor="middle">Casa i-2</text>
    <text x="40" y="50" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">dp[i-2]</text>

    <text x="110" y="42" fill="#f59e0b" font-size="14" font-weight="bold" text-anchor="middle">+</text>

    <rect x="130" y="15" width="80" height="45" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="170" y="35" fill="#a7f3d0" font-size="11" text-anchor="middle">Casa i</text>
    <text x="170" y="50" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">nums[i]</text>

    <text x="245" y="42" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">vs</text>

    <rect x="280" y="15" width="90" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="325" y="35" fill="#93c5fd" font-size="11" text-anchor="middle">Casa i-1</text>
    <text x="325" y="50" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">dp[i-1] (Pular i)</text>

    <text x="400" y="42" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">→</text>

    <rect x="425" y="10" width="95" height="55" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" rx="6"/>
    <text x="472" y="33" fill="#a5b4fc" font-size="11" text-anchor="middle">Decisão Ótima</text>
    <text x="472" y="52" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">dp[i] = max(...)</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Invariante: Casas adjacentes nunca são roubadas simultaneamente (Tempo O(N), Espaço O(1))</text>
</svg>
<p>Visualização: Transição de estados do House Robber escolhendo entre roubar a casa atual somada a dp[i-2] ou manter o acumulado dp[i-1].</p>

| Decisão na Casa $i$ | Restrição Aplicada | Ganho Acumulado |
|---|---|---|
| **Roubar Casa $i$** | Não pode roubar $i-1$ | $DP[i-2] + A[i]$ |
| **Pular Casa $i$** | Mantém saque de $i-1$ | $DP[i-1]$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: House Robber O(1) Espaço
```java
public class HouseRobber {
  public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    int robPrev2 = 0, robPrev1 = 0;
    for (int num : nums) {
      int curr = Math.max(robPrev1, robPrev2 + num);
      robPrev2 = robPrev1;
      robPrev1 = curr;
    }
    return robPrev1;
  }
}
```

#### Key Takeaways
- Modela perfeitamente problemas de seleção com restrição de elementos adjacentes.

</details>
