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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fibonacci Heap: Diminuição de Chave (Decrease-Key) em Tempo O(1)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="560" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="280" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Floresta de Árvores com Corte em Cascata (Cascading Cut)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Inserções e decrease-key apenas adicionam árvores à lista de raízes em O(1) amortizado.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Consolidação adiada para a operação extract-min: O(log N) amortizado.</text>
  </g>
  <text x="340" y="165" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Otimiza o Algoritmo de Dijkstra para O(E + V log V), ideal para grafos densos</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fibonacci Heap: Diminuição de Chave (Decrease-Key) em Tempo O(1)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="560" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="280" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Floresta de Árvores com Corte em Cascata (Cascading Cut)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Inserções e decrease-key apenas adicionam árvores à lista de raízes em O(1) amortizado.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Consolidação adiada para a operação extract-min: O(log N) amortizado.</text>
  </g>
  <text x="340" y="165" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Otimiza o Algoritmo de Dijkstra para O(E + V log V), ideal para grafos densos</text>

</svg>

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
