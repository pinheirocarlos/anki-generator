---
id: DSA-STRUCT-HEAP-003
title: "Implementação de Fila de Prioridade com Inserção e Extração em O(log N)"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::microsoft
  - freq::high
---

## Pergunta
Como ocorrem as operações de **inserção (`push`)** e **remoção do extremo (`pop`)** em uma Fila de Prioridade em tempo $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- **Inserção (`push(x)`)**: Adiciona o novo elemento no final do array e executa **`siftUp` (ou bubble-up)**: troca o elemento com seu pai sucessivamente até restaurar a invariante ($O(\log N)$).
- **Remoção (`pop()`)**: Substitui a raiz pelo último elemento do array, remove o último elemento e executa **`siftDown` (ou bubble-down)**: troca a raiz com o menor de seus filhos até restabelecer a invariante ($O(\log N)$).
- **Consulta (`peek()`)**: Apenas lê o índice 0 em tempo constante $O(1)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
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

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
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

| Operação | Mecânica de Reajuste | Complexidade |
|---|---|---|
| **`push(x)`** | Adiciona no fim + `siftUp` | $O(\log N)$ |
| **`pop()`** | Troca raiz com último + `siftDown` | $O(\log N)$ |
| **`peek()`** | Retorna `arr[0]` | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em ambas as operações, o elemento percorre no máximo a altura da árvore $H = \log_2 N$.

</details>
