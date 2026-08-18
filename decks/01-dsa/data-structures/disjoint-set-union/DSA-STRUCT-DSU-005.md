---
id: DSA-STRUCT-DSU-005
title: "Construção de Árvore Geradora Mínima (MST) via Algoritmo de Kruskal e DSU"
tags:
  - level::l4-pleno
  - topic::dsa::disjoint-set-union
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kruskal** utiliza o DSU para construir a Árvore Geradora Mínima (MST) de um grafo em $O(E \log E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo guloso de Kruskal opera em três passos:
  1. **Ordenação**: Ordena todas as $E$ arestas em ordem crescente de peso ($O(E \log E)$).
  2. **Iteração Gulosa com DSU**: Para cada aresta $(u, v, w)$ ordenada:
     - Se `dsu.union(u, v)` retornar `true` (não forma ciclo), adiciona a aresta à MST e soma o peso $w$.
     - Se retornar `false` (formaria ciclo), descarta a aresta.
  3. Encerra quando a MST contiver $V - 1$ arestas.

### Dual Coding Visual
| Etapa de Kruskal | Operação Principal | Custo Assintótico |
|---|---|---|
| **1. Ordenação de Arestas** | `Arrays.sort(edges)` | $O(E \log E)$ |
| **2. Fusão de Componentes** | $E$ operações no DSU | $O(E \cdot \alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como $O(E \cdot \alpha(V)) \ll O(E \log E)$, o gargalo de Kruskal reside exclusivamente na ordenação inicial das arestas.

</details>
