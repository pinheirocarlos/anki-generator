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
