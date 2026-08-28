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
