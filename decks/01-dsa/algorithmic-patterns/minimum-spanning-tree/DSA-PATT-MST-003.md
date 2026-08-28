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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Borůvka's Algorithm: Seleção Paralela de Arestas Mínimas em O(E log V)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Fusão Simultânea de Componentes em Cada Rodada</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Cada componente conectado escolhe concorrentemente sua aresta incidente de menor peso.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O número de componentes reduz pela metade a cada fase: estritamente log₂ V fases.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">O algoritmo de MST mais naturalmente paralelizável em GPUs e computação distribuída (MapReduce)</text>

</svg>

| Algoritmo de MST | Estratégia de Construção | Estrutura Auxiliar Principal |
|---|---|---|
| **Kruskal** | Floresta de arestas fundidas | DSU (Union-Find) |
| **Prim** | Árvore única crescendo vértice a vértice | Min-Heap (`PriorityQueue`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A dinâmica de Prim é muito similar a Dijkstra, mas com uma diferença crucial: a prioridade no heap é apenas o peso da aresta individual $w(u, v)$, e não a distância acumulada desde a raiz.

</details>
