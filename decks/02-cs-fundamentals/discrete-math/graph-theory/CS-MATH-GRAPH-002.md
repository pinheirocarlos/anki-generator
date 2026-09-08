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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Representação de Grafos: Matriz vs Lista de Adjacência</text>
  <g transform="translate(50, 48)">
    <!-- Matrix -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Matriz de Adjacência [V x V]</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Espaço: O(V²) | Consulta hasEdge(u,v): O(1)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Iterar vizinhos: O(V) fixo</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para: Grafos Densos (E ≈ V²)</text>

    <!-- List -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Lista de Adjacência Array[V]</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Espaço: O(V + E) | Consulta: O(deg(u))</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Iterar vizinhos: O(deg(u)) instantâneo</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Ideal para: Grafos Esparsos (Maioria dos problemas reais)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Em entrevistas FAANG: Lista de Adjacência é o padrão de implementação para BFS, DFS e Dijkstra.</text>

</svg>
<p>Visualização: Comparativo estrutural de consumo de memória e latência de consulta entre Matriz de Adjacência e Lista de Adjacência.</p>

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
