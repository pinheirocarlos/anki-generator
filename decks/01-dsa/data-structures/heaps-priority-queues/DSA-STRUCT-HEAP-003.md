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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/priority-queue-extract-min-loop.webm">
    <p>Visualização: Substituição da raiz pelo último elemento seguida de sift-down restabelecendo o heap em O(log N).</p>
  </video>
</div>

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
