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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Algoritmo de Prim: Expansão da MST Nó a Nó via Min-Heap O(E log V)</text>

  <!-- Componente em Crescimento (Corte) -->
  <g transform="translate(60, 45)">
    <!-- Árvore Atual (Visitados) -->
    <rect x="0" y="0" width="130" height="100" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="65" y="18" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Árvore MST (Visitados)</text>
    <circle cx="35" cy="50" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="35" y="54" fill="#fff" font-size="10" text-anchor="middle">A</text>
    <line x1="49" y1="50" x2="81" y2="50" stroke="#10b981" stroke-width="2"/>
    <circle cx="95" cy="50" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="95" y="54" fill="#fff" font-size="10" text-anchor="middle">B</text>
    <text x="65" y="85" fill="#a7f3d0" font-size="9" text-anchor="middle">Custo MST = 2</text>

    <!-- Arestas de Corte -->
    <line x1="95" y1="64" x2="195" y2="75" stroke="#10b981" stroke-width="2.5"/>
    <text x="145" y="65" fill="#34d399" font-size="10" font-weight="bold">w=3 (Min)</text>

    <line x1="95" y1="36" x2="195" y2="25" stroke="#64748b" stroke-width="1.5"/>
    <text x="145" y="25" fill="#94a3b8" font-size="10">w=7</text>

    <!-- Nós Não Visitados -->
    <rect x="180" y="0" width="130" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="245" y="18" fill="#60a5fa" font-size="10" font-weight="bold" text-anchor="middle">Não Visitados</text>
    <circle cx="215" cy="25" r="14" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
    <text x="215" y="29" fill="#94a3b8" font-size="10" text-anchor="middle">C</text>
    <circle cx="215" cy="75" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="215" y="79" fill="#fff" font-size="10" text-anchor="middle">D</text>
  </g>

  <!-- Painel Min-Heap -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="220" height="100" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
    <text x="110" y="20" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Min-Heap das Arestas do Corte</text>
    <text x="15" y="42" fill="#a7f3d0" font-size="10" font-family="monospace">1. [B-D, w=3] ➔ Extrai (Menor)</text>
    <text x="15" y="60" fill="#94a3b8" font-size="10" font-family="monospace">2. [B-C, w=7]</text>
    <text x="15" y="78" fill="#f8fafc" font-size="10">Adiciona D à MST e insere vizinhos de D no Min-Heap.</text>
  </g>

  <text x="340" y="175" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Prim mantém uma única árvore em expansão; Kruskal une florestas independentes via DSU</text>
</svg>
<p>Visualização: Algoritmo de Prim crescendo uma única árvore a partir do nó inicial via corte de menor peso mantido no Min-Heap.</p>

| Algoritmo de MST | Estratégia de Construção | Estrutura Auxiliar Principal |
|---|---|---|
| **Kruskal** | Floresta de arestas fundidas | DSU (Union-Find) |
| **Prim** | Árvore única crescendo vértice a vértice | Min-Heap (`PriorityQueue`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A dinâmica de Prim é muito similar a Dijkstra, mas com uma diferença crucial: a prioridade no heap é apenas o peso da aresta individual $w(u, v)$, e não a distância acumulada desde a raiz.

</details>
