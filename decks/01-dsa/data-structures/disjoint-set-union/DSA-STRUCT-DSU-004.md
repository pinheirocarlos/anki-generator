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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Detecção de Ciclos em Grafos Não-Direcionados com DSU</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Para cada aresta (u, v) do grafo:</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. rootU = find(u), rootV = find(v).</text>
    <text x="20" y="62" fill="#f87171" font-size="11">2. Se rootU == rootV → CICLO DETECTADO! (u e v já pertenciam ao mesmo componente).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Utilizado no Algoritmo de Kruskal para construir Árvores Geradoras Mínimas (MST) sem ciclos</text>

</svg>

<p>Visualização: Aresta entre dois nós com o mesmo representante de conjunto revela imediatamente o fechamento de um ciclo.</p>

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
