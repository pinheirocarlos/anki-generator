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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Kruskal: Construção de MST O(E log E) com DSU</text>
  
  <g transform="translate(45, 45)">
    <!-- Passo 1: Ordenação -->
    <rect x="0" y="0" width="180" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="90" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">1. Ordenar Arestas</text>
    <text x="15" y="44" fill="#f8fafc" font-size="10">E arestas por peso crescente:</text>
    <text x="15" y="62" fill="#38bdf8" font-size="10" font-family="monospace">(A, B, w=1) ✓</text>
    <text x="15" y="78" fill="#38bdf8" font-size="10" font-family="monospace">(B, C, w=2) ✓</text>
    <text x="15" y="94" fill="#94a3b8" font-size="10">Custo: O(E log E)</text>

    <!-- Passo 2: Verificação no DSU -->
    <g transform="translate(200, 0)">
      <rect x="0" y="0" width="190" height="100" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
      <text x="95" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Teste no DSU</text>
      <text x="12" y="44" fill="#f8fafc" font-size="10">if find(u) != find(v):</text>
      <text x="12" y="62" fill="#34d399" font-size="10" font-weight="bold">➔ Aceita na MST!</text>
      <text x="12" y="78" fill="#f8fafc" font-size="10">union(u, v) funde conjuntos</text>
      <text x="12" y="94" fill="#94a3b8" font-size="10">Arestas aceitas: V - 1</text>
    </g>

    <!-- Passo 3: Descarte de Ciclo -->
    <g transform="translate(410, 0)">
      <rect x="0" y="0" width="180" height="100" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6"/>
      <text x="90" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. Evitar Ciclos</text>
      <text x="12" y="44" fill="#f8fafc" font-size="10">if find(u) == find(v):</text>
      <text x="12" y="62" fill="#ef4444" font-size="10" font-weight="bold">➔ Descarta aresta!</text>
      <text x="12" y="78" fill="#94a3b8" font-size="10">Já estão conectados</text>
      <text x="12" y="94" fill="#f87171" font-size="10">Formaria ciclo imediato</text>
    </g>
  </g>

  <text x="340" y="175" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">DSU reduz a verificação de ciclo de O(V) para tempo quase constante O(α(V))</text>
</svg>

<p>Visualização: Algoritmo de Kruskal selecionando arestas ordenadas por peso e usando DSU para descartar arestas que fechariam ciclos na MST.</p>

| Etapa de Kruskal | Operação Principal | Custo Assintótico |
|---|---|---|
| **1. Ordenação de Arestas** | `Arrays.sort(edges)` | $O(E \log E)$ |
| **2. Fusão de Componentes** | $E$ operações no DSU | $O(E \cdot \alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como $O(E \cdot \alpha(V)) \ll O(E \log E)$, o gargalo de Kruskal reside exclusivamente na ordenação inicial das arestas.

</details>
