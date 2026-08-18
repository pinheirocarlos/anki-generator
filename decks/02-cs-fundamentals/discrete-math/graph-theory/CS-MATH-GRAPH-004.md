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
