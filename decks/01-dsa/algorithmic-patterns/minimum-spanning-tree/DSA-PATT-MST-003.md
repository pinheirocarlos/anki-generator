---
id: DSA-PATT-MST-003
title: "Algoritmo de Prim: Abordagem Orientada a Vértices com Min-Heap em O(E log V)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Prim** expande a MST incrementalmente a partir de um vértice usando um Min-Heap em $O(E \log V)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Algoritmo de Prim opera sob perspectiva de expansão de árvore:
  1. Inicia em um vértice arbitrário e marca-o como visitado.
  2. Insere todas as arestas incidentes ao nó em um Min-Heap.
  3. A cada passo:
     - Extrai a aresta mais leve do heap conectando um nó visitado a um nó não-visitado $v$.
     - Adiciona a aresta à MST e marca $v$ como visitado.
     - Insere todas as arestas saindo de $v$ para nós não-visitados no Min-Heap.
  4. Repete até que todos os $V$ nós estejam na MST.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/prim-mst-priority-queue-loop.webm">
    <p>Visualização: Crescimento contínuo da árvore a partir de um vértice inicial anexando a aresta mais leve na fronteira.</p>
  </video>
</div>

| Algoritmo de MST | Estratégia de Construção | Estrutura Auxiliar Principal |
|---|---|---|
| **Kruskal** | Floresta de arestas fundidas | DSU (Union-Find) |
| **Prim** | Árvore única crescendo vértice a vértice | Min-Heap (`PriorityQueue`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A dinâmica de Prim é muito similar a Dijkstra, mas com uma diferença crucial: a prioridade no heap é apenas o peso da aresta individual $w(u, v)$, e não a distância acumulada desde a raiz.

</details>
