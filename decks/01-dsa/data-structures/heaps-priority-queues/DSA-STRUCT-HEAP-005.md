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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Median Finder em Tempo Real com Dois Heaps (Max-Heap + Min-Heap)</text>
  <g transform="translate(80, 50)">
    <!-- Max-Heap Low -->
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Max-Heap (Metade Inferior)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="10">Guarda os 50% menores</text>
    <text x="20" y="60" fill="#93c5fd" font-size="10">Topo = Maior dos menores (L_max)</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Min-Heap (Metade Superior)</text>
      <text x="20" y="45" fill="#f8fafc" font-size="10">Guarda os 50% maiores</text>
      <text x="20" y="60" fill="#a7f3d0" font-size="10">Topo = Menor dos maiores (R_min)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mediana: Se N ímpar = L_max | Se N par = (L_max + R_min) / 2.0 em O(1)</text>

</svg>

<p>Visualização: Dois heaps balanceados mantendo a mediana acessível nos topos em tempo O(1).</p>

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
