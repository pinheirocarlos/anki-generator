---
id: DSA-PATT-MONOSTACK-003
title: "Monotonic Queue / Deque para Sliding Window Maximum (LeetCode 239) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Como um **Monotonic Deque** obtém o valor máximo de cada janela deslizante em **Sliding Window Maximum** em tempo estritamente linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um **Deque Monótono Decrescente** que armazena os índices dos elementos:
  1. **Remoção de Elementos Expirados**: Remove do início do deque índices que saíram da janela: `deque.peekFirst() <= i - K`.
  2. **Manutenção da Monotonicidade**: Remove do fim do deque todos os índices cujos valores sejam menores que o elemento atual (`nums[deque.peekLast()] < nums[i]`), pois eles jamais poderão ser o máximo enquanto `nums[i]` estiver na janela.
  3. Adiciona $i$ ao fim do deque.
  4. O elemento máximo da janela ativa reside sempre em **`nums[deque.peekFirst()]`** em $O(1)$.
- **Complexidade**: $O(N)$ tempo contra $O(N \log K)$ do Heap.

### Dual Coding Visual
| Estrutura para Janela Máxima | Consulta do Máximo | Custo por Deslizamento |
|---|---|---|
| **Max-Heap** | $O(1)$ na raiz | $O(\log K)$ Inserção / Deleção |
| **Monotonic Deque** | $O(1)$ em `peekFirst` | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Sliding Window Maximum
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class SlidingWindowMax {
  public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] res = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
      // 1. Remove fora da janela
      if (!deque.isEmpty() && deque.peekFirst() <= i - k) {
        deque.pollFirst();
      }
      // 2. Remove menores
      while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
        deque.pollLast();
      }
      deque.offerLast(i);
      // 3. Coleta resultado
      if (i >= k - 1) {
        res[i - k + 1] = nums[deque.peekFirst()];
      }
    }
    return res;
  }
}
```

#### Key Takeaways
- Eliminar candidatos subótimos do fim do deque é o segredo para manter o máximo sempre no início em $O(1)$.

</details>
