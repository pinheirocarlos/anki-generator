---
id: DSA-STRUCT-GRAPH-003
title: "Representação de Grafos por Lista de Adjacência: Eficiência Espacial O(V+E)"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona a representação por **Lista de Adjacência** e por que ela é o padrão da indústria para grafos esparsos?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Lista de Adjacência** mantém um array de listas (ou vetores dinâmicos) `List<Integer> adj[V]`:
  - `adj[u]` armazena exclusivamente os vizinhos diretos com os quais $u$ compartilha uma aresta.
- **Eficiência Espacial**: Consome estritamente $O(V + E)$ de memória, alocando apenas as arestas reais existentes.
- **Travessia**: Iterar sobre os vizinhos de $u$ custa exatamente o grau do nó $O(\text{deg}(u))$, permitindo que algoritmos como BFS e DFS rodem em tempo ótimo $O(V + E)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/adjacency-list-compact-loop.webm">
    <p>Visualização: Array de listas encadeadas contendo apenas vizinhos reais com travessia de adjacentes sem escanear V colunas.</p>
  </video>
</div>

| Representação | Consumo de Memória | Iteração de Vizinhos de $u$ |
|---|---|---|
| **Matriz de Adjacência** | $O(V^2)$ Quadrático | $O(V)$ Varredura de linha |
| **Lista de Adjacência** | $O(V + E)$ Ótimo | $O(\text{deg}(u))$ Apenas vizinhos reais |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Lista de Adjacência
```go
package main

type Graph struct {
  adj [][]int
}

func NewGraph(v int) *Graph {
  return &Graph{adj: make([][]int, v)}
}

func (g *Graph) AddEdge(u, v int) {
  g.adj[u] = append(g.adj[u], v)
  g.adj[v] = append(g.adj[v], u) // Para não-direcionado
}
```

#### Key Takeaways
- Como a esmagadora maioria dos grafos do mundo real (redes sociais, malhas viárias, web) é esparsa ($E \ll V^2$), a lista de adjacência é a escolha padrão.

</details>
