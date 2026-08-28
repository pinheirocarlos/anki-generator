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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DSU com Rollback (Pilha de Histórico de Modificações)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Desfazendo Uniões em O(1) de Tempo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Utiliza Union by Rank sem Path Compression (para preservar histórico de ponteiros).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Empilha [rootA, rootB, rankChanged] e desfaz com rollback() em divisão e conquista offline.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Permite resolver problemas de conectividade dinâmica com deleções de arestas</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DSU com Rollback (Pilha de Histórico de Modificações)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Desfazendo Uniões em O(1) de Tempo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Utiliza Union by Rank sem Path Compression (para preservar histórico de ponteiros).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Empilha [rootA, rootB, rankChanged] e desfaz com rollback() em divisão e conquista offline.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Permite resolver problemas de conectividade dinâmica com deleções de arestas</text>

</svg>

| Etapa de Kruskal | Operação Principal | Custo Assintótico |
|---|---|---|
| **1. Ordenação de Arestas** | `Arrays.sort(edges)` | $O(E \log E)$ |
| **2. Fusão de Componentes** | $E$ operações no DSU | $O(E \cdot \alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como $O(E \cdot \alpha(V)) \ll O(E \log E)$, o gargalo de Kruskal reside exclusivamente na ordenação inicial das arestas.

</details>
