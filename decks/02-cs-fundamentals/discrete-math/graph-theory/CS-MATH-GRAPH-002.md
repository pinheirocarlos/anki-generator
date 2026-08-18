---
id: CS-MATH-GRAPH-002
title: "Representação de Grafos: Matriz de Adjacência vs Lista de Adjacência"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
Quais são os trade-offs de tempo e espaço entre representar grafos via **Matriz de Adjacência** e via **Lista de Adjacência**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Matriz de Adjacência**: Matriz 2D de tamanho $V \times V$ onde `matrix[u][v] = 1` se existe a aresta $(u \to v)$.
  - *Espaço*: $O(V^2)$ (Inviável para grafos esparsos com milhões de nós).
  - *Checar se aresta $(u, v)$ existe*: $O(1)$ instantâneo.
  - *Iterar sobre vizinhos de $u$*: $O(V)$.
- **Lista de Adjacência**: Array de listas onde `adj[u]` guarda apenas os vizinhos diretos de $u$.
  - *Espaço*: $O(V + E)$ (Ótimo para grafos esparsos onde $E \ll V^2$).
  - *Checar se aresta $(u, v)$ existe*: $O(\text{grau}(u))$.
  - *Iterar sobre vizinhos de $u$*: $O(\text{grau}(u))$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/graph-adjacency-matrix-vs-list-loop.webm">
    <p>Visualização: Matriz O(V²) para grafos densos e verificação O(1) vs Lista O(V+E) para grafos esparsos.</p>
  </video>
</div>

| Operação | Matriz de Adjacência | Lista de Adjacência |
|---|---|---|
| **Consumo de Memória** | $O(V^2)$ | $O(V + E)$ (Muito mais compacto) |
| **Verificar Aresta $(u, v)$** | $O(1)$ Instantâneo | $O(\text{grau}(u))$ |
| **Iterar Vizinhos de $u$** | $O(V)$ | $O(\text{grau}(u))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Lista de Adjacência Compacta
```go
package main

// Grafo com V nós representado via lista de adjacência esparsa:
type Graph struct {
  adj [][]int
}

func NewGraph(numVertices int) *Graph {
  return &Graph{adj: make([][]int, numVertices)}
}

func (g *Graph) AddEdge(u, v int) {
  g.adj[u] = append(g.adj[u], v)
}
```

#### Key Takeaways
- A grande maioria das redes do mundo real (redes sociais, links da web, rotas rodoviárias) é esparsa ($E \ll V^2$), tornando a Lista de Adjacência a escolha padrão absoluta.

</details>
