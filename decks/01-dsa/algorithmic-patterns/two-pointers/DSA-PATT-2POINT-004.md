---
id: DSA-PATT-2POINT-004
title: "Implementação de 3Sum com Deduplicação Rigorosa de Ponteiros em O(N²)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::google
  - freq::high
---

## Pergunta
Como implementar o algoritmo **3Sum** em tempo $O(N^2)$ e espaço $O(1)$ garantindo deduplicação rigorosa de triplas sem usar `Set`?

## Resposta
### Quick Answer
**Solução Direta**:
- Primeiro ordenamos o array em $O(N \log N)$.
- Fixamos o primeiro elemento no índice $i$ (de $0$ até $N-3$):
  - **Deduplicação de $i$**: Se $i > 0$ e $A[i] == A[i-1]$, pula com `continue`.
  - Executamos Two Pointers com $\text{left} = i + 1$ e $\text{right} = N - 1$ procurando $\text{soma} = -A[i]$.
  - Ao encontrar uma tripla válida:
    - Adiciona à resposta.
    - **Deduplicação dos ponteiros**: Avança `left++` enquanto $A[\text{left}] == A[\text{left}-1]$ e recua `right--` enquanto $A[\text{right}] == A[\text{right}+1]$.

### Dual Coding Visual
| Elemento da Tripla | Ponto de Deduplicação | Ação de Salto |
|---|---|---|
| **$i$ (Primeiro elemento)** | Antes do loop Two Pointers | `if (i > 0 && A[i] == A[i-1]) continue` |
| **`left` / `right`** | Imediatamente após achar tripla | `while (left < right && A[left] == A[left+1]) left++` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: 3Sum Ótimo
```java
import java.util.*;

public class ThreeSumSolution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();

    for (int i = 0; i < nums.length - 2; i++) {
      if (nums[i] > 0) break; // Otimização: menores que 0 somados não dão 0
      if (i > 0 && nums[i] == nums[i - 1]) continue;

      int left = i + 1, right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
          res.add(Arrays.asList(nums[i], nums[left], nums[right]));
          while (left < right && nums[left] == nums[left + 1]) left++;
          while (left < right && nums[right] == nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
    return res;
  }
}
```

#### Key Takeaways
- A deduplicação manual por ponteiros economiza o overhead de alocação de objetos e hashing de um `Set<List<Integer>>`.

</details>
