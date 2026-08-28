---
id: CS-MATH-GRAPH-004
title: "Relações de Equivalência e Disjoint Set Union (DSU / Union-Find)"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
O que é uma **Relação de Equivalência** e como a estrutura **Disjoint Set Union (DSU)** implementa partição de conjuntos com compressão de caminho?

## Resposta
### Quick Answer
**Solução Direta**:
- **Relação de Equivalência ($sim$)**: É uma relação binária que satisfaz 3 propriedades matemáticas axiomáticas:
  1. **Reflexividade**: $a \sim a$.
  2. **Simetria**: $a \sim b \implies b \sim a$.
  3. **Transitividade**: $a \sim b \land b \sim c \implies a \sim c$.
  - Ela divide um conjunto em **classes de equivalência disjuntas** (partição exata).
- **Disjoint Set Union (DSU / Union-Find)**: Estrutura que mantém conjuntos disjuntos com duas operações:
  - **`Find(u)` com Path Compression**: Encontra o representante da classe e reconecta todos os nós do caminho diretamente à raiz.
  - **`Union(u, v)` por Rank**: Conecta a raiz da árvore mais baixa à raiz da árvore mais alta.
- **Complexidade**: Amortizado **$O(\alpha(N))$ por operação** (onde $\alpha$ é a Função de Ackermann Inversa, $\alpha(N) < 5$ para qualquer $N$ no universo observável).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Disjoint Set Union (DSU / Union-Find) com Path Compression</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="265" height="80" rx="6" fill="#1e293b" stroke="#3b82f6"/>
    <text x="132" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Find(x) com Path Compression</text>
    <text x="132" y="48" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">parent[x] = find(parent[x])</text>
    <text x="132" y="66" fill="#a7f3d0" font-size="9" text-anchor="middle">Achata a árvore diretamente na raiz</text>

    <rect x="295" y="0" width="265" height="80" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="427" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Union(x, y) por Rank / Size</text>
    <text x="427" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Árvore menor acoplada sob a maior</text>
    <text x="427" y="66" fill="#a7f3d0" font-size="9" text-anchor="middle">Mantém a altura controlada em O(log N)</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Complexidade Amortizada: O(α(N)) por operação (Função Inversa de Ackermann ≤ 4 para qualquer N prático).</text>

</svg>

| Operação DSU | Sem Otimização | Com Path Compression & Union-by-Rank |
|---|---|---|
| **`Find(u)`** | $O(N)$ (Árvore degenerada em lista) | $O(\alpha(N)) \approx O(1)$ Quase constante |
| **`Union(u, v)`** | $O(N)$ | $O(\alpha(N)) \approx O(1)$ Quase constante |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: DSU Completo e Idiomático
```go
package main

type DSU struct {
  parent []int
  rank   []int
}

func NewDSU(n int) *DSU {
  parent := make([]int, n)
  rank := make([]int, n)
  for i := range parent {
    parent[i] = i
  }
  return &DSU{parent: parent, rank: rank}
}

func (d *DSU) Find(i int) int {
  if d.parent[i] != i {
    d.parent[i] = d.Find(d.parent[i]) // Path Compression
  }
  return d.parent[i]
}

func (d *DSU) Union(i, j int) bool {
  rootI, rootJ := d.Find(i), d.Find(j)
  if rootI == rootJ {
    return false // Já pertencem à mesma classe de equivalência
  }
  if d.rank[rootI] < d.rank[rootJ] {
    d.parent[rootI] = rootJ
  } else if d.rank[rootI] > d.rank[rootJ] {
    d.parent[rootJ] = rootI
  } else {
    d.parent[rootJ] = rootI
    d.rank[rootI]++
  }
  return true
}
```

#### Key Takeaways
- DSU é a base do **Algoritmo de Kruskal** para Árvore Geradora Mínima (MST) e detecção dinâmica de conectividade em redes em tempo real.

</details>
