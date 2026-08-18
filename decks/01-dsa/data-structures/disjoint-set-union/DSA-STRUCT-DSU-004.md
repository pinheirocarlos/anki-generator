---
id: DSA-STRUCT-DSU-004
title: "Detecção de Ciclos em Grafos Não-Direcionados com DSU"
tags:
  - level::l4-pleno
  - topic::dsa::disjoint-set-union
  - company::meta
  - freq::high
---

## Pergunta
Como o DSU detecta **ciclos em grafos não-direcionados** durante a inserção incremental de arestas?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada aresta $(u, v)$ do grafo:
  1. Consulta as raízes: `rootU = find(u)` e `rootV = find(v)`.
  2. Se `rootU == rootV`, significa que $u$ e $v$ **já estavam conectados** por um caminho anterior existente. Adicionar a aresta $(u, v)$ fecha um **ciclo** no grafo.
  3. Se `rootU != rootV`, executa `union(u, v)` com segurança.
- **Complexidade**: $O(E \cdot \alpha(V))$ tempo e $O(V)$ espaço.

### Dual Coding Visual
| Aresta Analisada $(u, v)$ | Condição no DSU | Diagnóstico |
|---|---|---|
| `find(u) != find(v)` | Diferentes conjuntos | Aresta segura (sem ciclo) |
| `find(u) == find(v)` | Mesmo conjunto | Ciclo detectado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Redundant Connection (LeetCode 684)
O problema de encontrar a aresta redundante que fecha um ciclo em um grafo conexo é resolvido diretamente retornando a primeira aresta $(u, v)$ onde `!dsu.union(u, v)`.

#### Key Takeaways
- O DSU detecta ciclos apenas em grafos **não-direcionados**; para grafos direcionados, deve-se usar DFS de 3 cores ou Algoritmo de Kahn (Ordenação Topológica).

</details>
