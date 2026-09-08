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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">3Sum O(N²) com Two Pointers após Ordenação</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fixa nums[i] e resolve 2Sum no restante [i+1, N-1]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena o array em O(N log N). Ignora elementos duplicados adjacentes.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Two Pointers para nums[L] + nums[R] == -nums[i]. Custo total: N × O(N) = O(N²).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz a busca por força bruta cúbica O(N³) para quadrática O(N²)</text>
</svg>
<p>Visualização: Varredura de 3Sum fixando cada elemento e convergindo dois ponteiros em O(N²).</p>

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
