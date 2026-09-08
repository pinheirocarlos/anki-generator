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
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Top-K Elementos Usando Min-Heap de Tamanho Fixo K</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="180" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Stream de N Itens</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Itera sobre N elementos</text>
    <text x="15" y="60" fill="#94a3b8" font-size="10">Para cada item num...</text>

    <path d="M 195 37 L 245 37" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>

    <g transform="translate(250, 0)">
      <rect x="0" y="0" width="290" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="145" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Min-Heap (Capacidade K)</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Se num &gt; heap.peek():</text>
      <text x="15" y="60" fill="#34d399" font-size="10">heap.pop(); heap.push(num) em O(log K)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade de Tempo: O(N log K) | Complexidade de Espaço: O(K)</text>

</svg>

<p>Visualização: Filtragem de Top-K maiores mantendo o menor entre eles na raiz do Min-Heap.</p>

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
