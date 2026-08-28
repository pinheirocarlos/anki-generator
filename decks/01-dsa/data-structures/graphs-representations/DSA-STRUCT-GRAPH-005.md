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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Sparse Row (CSR): Grafos Estáticos de Alta Performance</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Armazenamento em 2 Arrays Contíguos (Zero Ponteiros na Heap)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">values/edges[]: lista sequencial de todos os destinos de arestas na memória contígua.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">row_ptr[v]: offset de início dos vizinhos do nó v no array de arestas.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Maximiza vetorização SIMD e elimina 100% dos overheads de ponteiros em Big Graph Analytics</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Sparse Row (CSR): Grafos Estáticos de Alta Performance</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Armazenamento em 2 Arrays Contíguos (Zero Ponteiros na Heap)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">values/edges[]: lista sequencial de todos os destinos de arestas na memória contígua.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">row_ptr[v]: offset de início dos vizinhos do nó v no array de arestas.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Maximiza vetorização SIMD e elimina 100% dos overheads de ponteiros em Big Graph Analytics</text>

</svg>

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
