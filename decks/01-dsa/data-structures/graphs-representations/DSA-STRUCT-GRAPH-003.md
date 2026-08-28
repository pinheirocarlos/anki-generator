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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafos Ponderados: Representação de Custos e Pesos em Arestas</text>
  <g transform="translate(140, 50)">
    <circle cx="50" cy="40" r="16" fill="#1e293b" stroke="#3b82f6"/><text x="50" y="44" fill="#fff" font-size="11" text-anchor="middle">U</text>
    
    <line x1="68" y1="40" x2="232" y2="40" stroke="#f59e0b" stroke-width="2.5"/>
    <rect x="130" y="28" width="40" height="24" fill="#1e293b" stroke="#f59e0b" rx="4"/>
    <text x="150" y="44" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">w=7</text>

    <circle cx="250" cy="40" r="16" fill="#1e293b" stroke="#10b981"/><text x="250" y="44" fill="#fff" font-size="11" text-anchor="middle">V</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">Lista de adjacência: adj[u].push_back({ v, weight = 7 })</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Modelagem de redes de computadores (latência), mapas de trânsito e fluxo de capacidade</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafos Ponderados: Representação de Custos e Pesos em Arestas</text>
  <g transform="translate(140, 50)">
    <circle cx="50" cy="40" r="16" fill="#1e293b" stroke="#3b82f6"/><text x="50" y="44" fill="#fff" font-size="11" text-anchor="middle">U</text>
    
    <line x1="68" y1="40" x2="232" y2="40" stroke="#f59e0b" stroke-width="2.5"/>
    <rect x="130" y="28" width="40" height="24" fill="#1e293b" stroke="#f59e0b" rx="4"/>
    <text x="150" y="44" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">w=7</text>

    <circle cx="250" cy="40" r="16" fill="#1e293b" stroke="#10b981"/><text x="250" y="44" fill="#fff" font-size="11" text-anchor="middle">V</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">Lista de adjacência: adj[u].push_back({ v, weight = 7 })</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Modelagem de redes de computadores (latência), mapas de trânsito e fluxo de capacidade</text>

</svg>

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
