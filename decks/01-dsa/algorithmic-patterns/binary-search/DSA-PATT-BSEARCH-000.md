---
id: DSA-PATT-BSEARCH-000
title: "Invariante do Binary Search em Arrays Ordenados e Cálculo Seguro de Mid"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::google
  - freq::high
---

## Pergunta
Como a **Busca Binária (Binary Search)** divide o espaço de busca pela metade a cada passo e por que usamos `mid = left + (right - left) / 2`?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um array ordenado, comparamos o elemento central `arr[mid]` com o valor alvo:
  - Se `arr[mid] == target`: retorna o índice.
  - Se `arr[mid] < target`: descartamos a metade esquerda (`left = mid + 1`).
  - Se `arr[mid] > target`: descartamos a metade direita (`right = mid - 1`).
- **Cálculo Seguro de Mid**: A expressão ingênua `(left + right) / 2` pode causar **Integer Overflow** se $\text{left} + \text{right} > 2^{31} - 1$. A forma `left + (right - left) / 2` é matematicamente idêntica e imune a overflow.
- **Complexidade**: $O(\log N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
| Fórmula de Cálculo de Mid | Risco de Overflow | Segurança em 32-bit |
|---|---|---|
| `(left + right) / 2` | Alto se soma $> 2^{31}-1$ | Inseguro (bug histórico do Java) |
| `left + (right - left) / 2` | Zero | 100% Seguro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Busca Binária Padrão
```java
public class BinarySearchStandard {
  public static int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] == target) return mid;
      else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
}
```

#### Key Takeaways
- A cada iteração, exatamente 50% dos elementos restantes são eliminados.

</details>
