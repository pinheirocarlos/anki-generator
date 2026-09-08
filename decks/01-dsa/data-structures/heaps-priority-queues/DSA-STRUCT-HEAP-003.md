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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operações Heapify-Up (Push) e Heapify-Down (Pop) O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Up (Push O(log N))</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Insere elemento no final do array</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Flutua trocando com o pai se maior</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Down (Pop O(log N))</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Move último item para a raiz</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Afunda trocando com o maior filho</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">A altura do heap é estritamente log₂ N, limitando o número máximo de swaps</text>

</svg>

<p>Visualização: Mecânica de subida (Heapify-Up no push) e descida (Heapify-Down no pop) limitadas pela altura O(log N).</p>

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
