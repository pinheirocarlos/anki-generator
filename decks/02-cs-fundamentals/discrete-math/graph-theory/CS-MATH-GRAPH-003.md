---
id: CS-MATH-GRAPH-003
title: "Componentes Fortemente Conexos (SCC) e Algoritmo de Tarjan"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
O que caracteriza um **Componente Fortemente Conexo (SCC)** em grafos direcionados e como o algoritmo de Tarjan os identifica em $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- **SCC (Strongly Connected Component)**: É um subgrafo maximal direcionado onde todo vértice $u$ consegue alcançar todo vértice $v$, e vice-versa ($u \leftrightarrow v$).
- **Algoritmo de Tarjan**: Identifica todos os SCCs em uma **única travessia DFS** mantendo dois índices por vértice:
  - `ids[u]`: A ordem cronológica de descoberta de $u$ na DFS.
  - `low[u]`: O menor ID alcançável a partir de $u$ através de arestas da árvore ou arestas de retorno (*Back-Edges*) no SCC.
- Quando a DFS completa a exploração de um nó raiz onde `ids[u] == low[u]`, todos os vértices acima de $u$ na pilha da DFS formam um SCC completo e são desempilhados juntos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Componentes Fortemente Conexos (SCC) &amp; Algoritmo de Tarjan</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Algoritmo de Tarjan: DFS com Pilha e Low-Link Values em O(V + E)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Identifica subgrafos direcionados onde todo vértice é alcançável a partir de qualquer outro.</text>
    <text x="280" y="66" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">low[u] = min(ids[u], ids[v]) | Raiz do SCC identificada quando low[u] == ids[u]</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Permite condensar grafos complexos em um supergrafo DAG para análise de dependências circulares.</text>

</svg>

| Métrica no Algoritmo de Tarjan | Significado | Ação ao Completar DFS do Nó |
|---|---|---|
| **`low[u] < ids[u]`** | O nó alcança um ancestral na árvore DFS | Faz parte de um ciclo maior no SCC |
| **`low[u] == ids[u]`**| O nó é a raiz do SCC | Desempilha todos os nós do SCC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Condensação de Grafo
- Ao colapsar cada SCC em um único super-nó, o grafo direcionado resultante é garantidamente um **DAG (Grafo Acíclico)**, permitindo aplicar ordenação topológica e algoritmos de caminho ótimo em grafos originalmente com ciclos.

#### Key Takeaways
- O Algoritmo de Tarjan tem complexidade $O(V + E)$ e requer apenas uma passagem DFS, sendo mais eficiente que o algoritmo de Kosaraju que necessita de duas passagens e do grafo transposto.

</details>
