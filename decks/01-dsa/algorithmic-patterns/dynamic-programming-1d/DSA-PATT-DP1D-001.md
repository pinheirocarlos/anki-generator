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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Top-Down (Memoization) vs Bottom-Up (Tabulation)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Top-Down (Recursão + Cache)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Inicia no problema N e desce</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Resolve apenas subestados necessários</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Bottom-Up (Iterativo / Array)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Inicia nos casos base: dp[0], dp[1]...</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Zero overhead de stack frame, mais rápido</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Bottom-Up frequentemente permite otimização de espaço eliminando a tabela completa</text>

</svg>

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
