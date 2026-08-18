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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/tarjan-strongly-connected-components-loop.webm">
    <p>Visualização: Busca em profundidade com low-link values identificando componentes fortemente conexos em tempo O(V+E).</p>
  </video>
</div>

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
