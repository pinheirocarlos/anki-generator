---
id: DSA-STRUCT-HEAP-004
title: "Resolução do Problema Top-K Elements com Min-Heap em Tempo O(N log K)"
tags:
  - level::l4-pleno
  - topic::dsa::heaps-priority-queues
  - company::google
  - freq::high
---

## Pergunta
Como utilizar um **Min-Heap de tamanho fixo $K$** para encontrar os $K$ maiores elementos de um array em tempo $O(N \log K)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um **Min-Heap** com capacidade restrita a exatamente $K$ elementos:
  - Para cada elemento $x$ do array:
    1. Inserimos $x$ no heap.
    2. Se o tamanho do heap ultrapassar $K$, removemos a raiz com `pop()`. Como é um Min-Heap, a raiz é o menor entre os candidatos e é descartada.
- No final, restam no heap exatamente os $K$ maiores elementos.
- **Complexidade**: $O(N \log K)$ tempo e $O(K)$ espaço auxiliar (muito superior a ordenar o array inteiro em $O(N \log N)$ quando $K \ll N$).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/top-k-elements-min-heap-loop.webm">
    <p>Visualização: Manutenção de Min-Heap de tamanho K onde elementos menores são descartados na raiz em tempo O(N log K).</p>
  </video>
</div>

| Estratégia Top-K | Complexidade de Tempo | Espaço Auxiliar |
|---|---|---|
| **Ordenação Completa** | $O(N \log N)$ | $O(1)$ ou $O(N)$ |
| **Min-Heap de Tamanho $K$** | $O(N \log K)$ | $O(K)$ |
| **Quickselect** | $O(N)$ Médio / $O(N^2)$ Pior | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Top K Elements
```java
import java.util.PriorityQueue;

public class TopKPattern {
  public static int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
    for (int num : nums) {
      minHeap.offer(num);
      if (minHeap.size() > k) {
        minHeap.poll(); // Descarta o menor dos k+1
      }
    }
    return minHeap.peek(); // Retorna o k-ésimo maior
  }
}
```

#### Key Takeaways
- O padrão Min-Heap para Top-K Maiores (e Max-Heap para Top-K Menores) é um dos padrões mais cobrados em entrevistas técnicas.

</details>
