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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lista de Adjacência: Eficiência Espacial O(V + E) e Iteração O(deg(u))</text>
  
  <g transform="translate(60, 45)">
    <!-- Visualização de nós e ponteiros -->
    <rect x="0" y="0" width="560" height="105" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    
    <!-- Linhas da Lista de Adjacência -->
    <g transform="translate(25, 20)">
      <text x="0" y="16" fill="#34d399" font-size="12" font-family="monospace" font-weight="bold">adj[0] ➔</text>
      <rect x="75" y="3" width="30" height="18" fill="#0f172a" stroke="#38bdf8" rx="3"/>
      <text x="90" y="16" fill="#fff" font-size="11" font-family="monospace" text-anchor="middle">1</text>
      <text x="110" y="16" fill="#64748b" font-size="11">➔</text>
      <rect x="125" y="3" width="30" height="18" fill="#0f172a" stroke="#38bdf8" rx="3"/>
      <text x="140" y="16" fill="#fff" font-size="11" font-family="monospace" text-anchor="middle">2</text>

      <text x="0" y="42" fill="#34d399" font-size="12" font-family="monospace" font-weight="bold">adj[1] ➔</text>
      <rect x="75" y="29" width="30" height="18" fill="#0f172a" stroke="#38bdf8" rx="3"/>
      <text x="90" y="42" fill="#fff" font-size="11" font-family="monospace" text-anchor="middle">0</text>
      <text x="110" y="42" fill="#64748b" font-size="11">➔</text>
      <rect x="125" y="29" width="30" height="18" fill="#0f172a" stroke="#38bdf8" rx="3"/>
      <text x="140" y="42" fill="#fff" font-size="11" font-family="monospace" text-anchor="middle">3</text>

      <text x="0" y="68" fill="#34d399" font-size="12" font-family="monospace" font-weight="bold">adj[2] ➔</text>
      <rect x="75" y="55" width="30" height="18" fill="#0f172a" stroke="#38bdf8" rx="3"/>
      <text x="90" y="68" fill="#fff" font-size="11" font-family="monospace" text-anchor="middle">0</text>

      <text x="250" y="25" fill="#f8fafc" font-size="11">• Vetor dinâmico adj[u] armazena apenas vizinhos reais</text>
      <text x="250" y="45" fill="#94a3b8" font-size="11">• Custo de memória total: 2 × |E| inteiros alocados</text>
      <text x="250" y="65" fill="#38bdf8" font-size="11">• BFS/DFS visitam cada aresta exatamente uma vez: O(V + E)</text>
    </g>
  </g>

  <text x="340" y="175" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Padrão dominante na indústria para modelar grafos esparsos do mundo real</text>
</svg>

<p>Visualização: Lista de adjacência mapeando cada vértice apenas aos seus vizinhos diretos em espaço ótimo O(V + E).</p>

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
