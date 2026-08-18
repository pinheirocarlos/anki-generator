---
id: DSA-STRUCT-STACK-005
title: "Padrão Monotonic Stack para Resolução de Next Greater Element em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão **Monotonic Stack** resolve o problema clássico de *Next Greater Element* em tempo linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma pilha com elementos estritamente monótonos (ex: monótona decrescente com índices).
- Ao iterar sobre o array no índice $i$:
  - Enquanto o elemento atual `arr[i]` for maior que o topo da pilha `arr[stack.peek()]`, significa que `arr[i]` é o **Next Greater Element** daquele índice desempilhado: preenchemos `result[stack.pop()] = arr[i]`.
  - Empilhamos o índice $i$.
- Como cada índice entra e sai da pilha no máximo uma vez, a complexidade total é $O(N)$ linear contra $O(N^2)$ da busca quadrática.

### Dual Coding Visual
| Abordagem | Tempo de Execução | Espaço Auxiliar |
|---|---|---|
| **Busca Dupla Força Bruta** | $O(N^2)$ Quadrático | $O(1)$ |
| **Monotonic Stack** | $O(N)$ Linear | $O(N)$ Pilha de Índices |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Next Greater Element
```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class NextGreaterElement {
  public static int[] nextGreaterElements(int[] nums) {
    int[] res = new int[nums.length];
    Arrays.fill(res, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // Guarda índices

    for (int i = 0; i < nums.length; i++) {
      while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
        res[stack.pop()] = nums[i];
      }
      stack.push(i);
    }
    return res;
  }
}
```

#### Key Takeaways
- O Monotonic Stack é a ferramenta chave para resolver problemas como *Daily Temperatures*, *Largest Rectangle in Histogram* e *Trapping Rain Water*.

</details>
