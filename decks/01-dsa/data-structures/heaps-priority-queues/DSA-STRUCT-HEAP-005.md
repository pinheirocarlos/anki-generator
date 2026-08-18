---
id: DSA-STRUCT-HEAP-005
title: "Padrão de Dois Heaps para Mediana de Fluxo Contínuo em Tempo O(1)"
tags:
  - level::l4-pleno
  - topic::dsa::heaps-priority-queues
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão de **Dois Heaps (Max-Heap + Min-Heap)** calcula a mediana de um fluxo contínuo de dados em tempo $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Dividimos o fluxo de dados em duas metades balanceadas:
  1. `smallHeap` (**Max-Heap**): Armazena a metade inferior dos números (topo = maior da metade inferior).
  2. `largeHeap` (**Min-Heap**): Armazena a metade superior dos números (topo = menor da metade superior).
- Mantemos a invariante de balanceamento de tamanho: $\text{len}(\text{small}) == \text{len}(\text{large})$ ou $\text{len}(\text{small}) == \text{len}(\text{large}) + 1$.
- **Cálculo da Mediana em $O(1)$**:
  - Se total ímpar: `smallHeap.peek()`.
  - Se total par: $(\text{smallHeap.peek()} + \text{largeHeap.peek()}) / 2.0$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/two-heaps-stream-median-loop.webm">
    <p>Visualização: Balanceamento entre Max-Heap (metade inferior) e Min-Heap (metade superior) fornecendo a mediana em O(1).</p>
  </video>
</div>

| Configuração de Heaps | Metade dos Dados | Acesso ao Elemento Mediano |
|---|---|---|
| **Max-Heap (`small`)** | Metade Inferior ($x \le \text{mediana}$) | Topo é o maior da metade baixa |
| **Min-Heap (`large`)** | Metade Superior ($x > \text{mediana}$) | Topo é o menor da metade alta |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Find Median from Data Stream (LeetCode 295)
```java
import java.util.Collections;
import java.util.PriorityQueue;

public class MedianFinder {
  private final PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // Max-Heap
  private final PriorityQueue<Integer> large = new PriorityQueue<>(); // Min-Heap

  public void addNum(int num) {
    small.offer(num);
    large.offer(small.poll()); // Garante que large tem números maiores

    // Rebalanceia tamanhos
    if (small.size() < large.size()) {
      small.offer(large.poll());
    }
  }

  public double findMedian() {
    if (small.size() > large.size()) return small.peek();
    return (small.peek() + large.peek()) / 2.0;
  }
}
```

#### Key Takeaways
- Inserir um número custa $O(\log N)$ e obter a mediana custa estritamente $O(1)$.

</details>
