---
id: DSA-STRUCT-DSU-000
title: "Conceito de Disjoint Set Union (DSU) e Representação de Conjuntos Disjuntos"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::meta
  - freq::high
---

## Pergunta
O que é a estrutura de dados **Disjoint Set Union (DSU / Union-Find)** e qual problema ela modela?

## Resposta
### Quick Answer
**Solução Direta**:
- O **DSU (Union-Find)** mantém uma coleção de conjuntos disjuntos (não-sobrepostos) de elementos particionados.
- Cada conjunto é identificado por um **elemento representativo único (líder ou raiz)**.
- Suporta duas operações fundamentais:
  - **`find(x)`**: Retorna o líder do conjunto ao qual $x$ pertence.
  - **`union(x, y)`**: Funde os conjuntos que contêm $x$ e $y$ em um único conjunto.
- É a estrutura ideal para consultas dinâmicas de conectividade (*connected components*) em grafos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Disjoint Set Union (DSU): Floresta de Árvores com Vetor parent[i]</text>
  <g transform="translate(100, 50)">
    <circle cx="80" cy="20" r="16" fill="#047857" stroke="#10b981"/><text x="80" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Root 1</text>
    <line x1="70" y1="35" x2="40" y2="60" stroke="#64748b"/>
    <circle cx="35" cy="70" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="35" y="74" fill="#fff" font-size="9" text-anchor="middle">2</text>
    <line x1="90" y1="35" x2="120" y2="60" stroke="#64748b"/>
    <circle cx="125" cy="70" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="125" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>

    <!-- Component 2 -->
    <circle cx="360" cy="20" r="16" fill="#b45309" stroke="#f59e0b"/><text x="360" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Root 4</text>
    <line x1="360" y1="35" x2="360" y2="60" stroke="#64748b"/>
    <circle cx="360" cy="70" r="12" fill="#1e293b" stroke="#f59e0b"/><text x="360" y="74" fill="#fff" font-size="9" text-anchor="middle">5</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Dois elementos estão no mesmo conjunto se e somente se find(x) == find(y)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Disjoint Set Union (DSU): Floresta de Árvores com Vetor parent[i]</text>
  <g transform="translate(100, 50)">
    <circle cx="80" cy="20" r="16" fill="#047857" stroke="#10b981"/><text x="80" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Root 1</text>
    <line x1="70" y1="35" x2="40" y2="60" stroke="#64748b"/>
    <circle cx="35" cy="70" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="35" y="74" fill="#fff" font-size="9" text-anchor="middle">2</text>
    <line x1="90" y1="35" x2="120" y2="60" stroke="#64748b"/>
    <circle cx="125" cy="70" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="125" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>

    <!-- Component 2 -->
    <circle cx="360" cy="20" r="16" fill="#b45309" stroke="#f59e0b"/><text x="360" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Root 4</text>
    <line x1="360" y1="35" x2="360" y2="60" stroke="#64748b"/>
    <circle cx="360" cy="70" r="12" fill="#1e293b" stroke="#f59e0b"/><text x="360" y="74" fill="#fff" font-size="9" text-anchor="middle">5</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Dois elementos estão no mesmo conjunto se e somente se find(x) == find(y)</text>

</svg>

| Operação DSU | Propósito | Pergunta Respondida |
|---|---|---|
| **`find(x)`** | Localiza a raiz canônica do conjunto | "A qual grupo $x$ pertence?" |
| **`union(x, y)`** | Conecta dois grupos distintos | "Funda os grupos de $x$ e $y$" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dois nós $A$ e $B$ estão conectados se e somente se `find(A) == find(B)`.

</details>
