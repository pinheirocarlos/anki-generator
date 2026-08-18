---
id: DSA-STRUCT-GRAPH-005
title: "Impacto da Representação de Grafos na Complexidade de BFS, DFS e Dijkstra"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::microsoft
  - freq::high
---

## Pergunta
Como a escolha entre Lista de Adjacência e Matriz de Adjacência altera a complexidade assintótica de **BFS, DFS e Dijkstra**?

## Resposta
### Quick Answer
**Solução Direta**:
- **BFS e DFS**:
  - *Com Lista de Adjacência*: $O(V + E)$ ótimo (visita cada nó e aresta uma única vez).
  - *Com Matriz de Adjacência*: $O(V^2)$ (para cada nó, precisa inspecionar todos os $V$ slots da linha).
- **Algoritmo de Dijkstra**:
  - *Com Min-Heap + Lista*: $O((V + E) \log V)$ ótimo para grafos esparsos.
  - *Com Array + Matriz*: $O(V^2)$ ótimo para grafos densos onde $E \approx V^2$ (pois $(V + V^2) \log V > V^2$).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/graph-traversal-complexity-compare-loop.webm">
    <p>Visualização: Comparativo de travessia: O(V+E) com lista de adjacência vs O(V²) obrigatório com matriz.</p>
  </video>
</div>

| Algoritmo | Complexidade (Lista de Adjacência) | Complexidade (Matriz de Adjacência) |
|---|---|---|
| **BFS / DFS** | $O(V + E)$ | $O(V^2)$ |
| **Dijkstra** | $O((V + E) \log V)$ | $O(V^2)$ |
| **Prim (MST)** | $O((V + E) \log V)$ | $O(V^2)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de algoritmos, sempre declare explicitamente a complexidade baseada em Lista de Adjacência ($O(V + E)$) a menos que o problema especifique uma matriz densa.

</details>
