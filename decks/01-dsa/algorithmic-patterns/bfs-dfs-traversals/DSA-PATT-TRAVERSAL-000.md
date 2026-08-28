---
id: DSA-PATT-TRAVERSAL-000
title: "Intuição da Busca em Largura (BFS) por Camadas e Fila FIFO para Caminho Mínimo"
tags:
  - level::l3-junior
  - topic::dsa::bfs-dfs-traversals
  - company::meta
  - freq::high
---

## Pergunta
Por que a **Busca em Largura (BFS)** garante encontrar o **caminho mais curto em número de arestas** em grafos não-ponderados?

## Resposta
### Quick Answer
**Solução Direta**:
- A BFS explora o grafo em **camadas concêntricas ordenadas por distância** a partir da raiz usando uma Fila FIFO:
  - Nível 0: Vértice de origem (distância 0).
  - Nível 1: Todos os vizinhos diretos a 1 aresta de distância.
  - Nível $k$: Todos os nós alcançáveis em exatamente $k$ arestas.
- Como a Fila FIFO processa estritamente todos os nós do nível $k$ antes de qualquer nó do nível $k+1$, a primeira vez que o nó alvo é desenfileirado corresponde **garantidamente ao menor número possível de passos**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">BFS (Breadth-First Search): Menor Caminho Nível por Nível com Fila FIFO</text>
  <g transform="translate(140, 45)">
    <circle cx="200" cy="20" r="14" fill="#047857" stroke="#10b981"/><text x="200" y="24" fill="#fff" font-size="10" text-anchor="middle">Nível 0</text>
    <line x1="185" y1="30" x2="115" y2="55" stroke="#64748b"/>
    <circle cx="100" cy="65" r="14" fill="#1e3a8a" stroke="#3b82f6"/><text x="100" y="69" fill="#fff" font-size="10" text-anchor="middle">N1</text>
    <line x1="215" y1="30" x2="285" y2="55" stroke="#64748b"/>
    <circle cx="300" cy="65" r="14" fill="#1e3a8a" stroke="#3b82f6"/><text x="300" y="69" fill="#fff" font-size="10" text-anchor="middle">N1</text>

    <line x1="90" y1="75" x2="55" y2="105" stroke="#475569"/>
    <circle cx="45" cy="115" r="12" fill="#1e293b" stroke="#f59e0b"/><text x="45" y="118" fill="#fff" font-size="9" text-anchor="middle">N2</text>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante menor distância em grafos não-ponderados: Tempo O(V + E), Espaço O(V)</text>

</svg>

| Algoritmo | Estrutura de Dados | Ordem de Exploração |
|---|---|---|
| **BFS (Largura)** | Fila FIFO (`Queue`) | Camadas concêntricas de distância crescente |
| **DFS (Profundidade)** | Pilha / Recursão | Ramo completo até o nó folha |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: BFS de Menor Caminho
```java
public int shortestPathBFS(List<List<Integer>> adj, int src, int dst, int n) {
  boolean[] visited = new boolean[n];
  Queue<Integer> queue = new ArrayDeque<>();
  queue.offer(src);
  visited[src] = true;
  int distance = 0;

  while (!queue.isEmpty()) {
    int levelSize = queue.size();
    for (int i = 0; i < levelSize; i++) {
      int curr = queue.poll();
      if (curr == dst) return distance;
      for (int neighbor : adj.get(curr)) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.offer(neighbor);
        }
      }
    }
    distance++;
  }
  return -1; // Inalcançável
}
```

#### Key Takeaways
- Para grafos não-ponderados, a BFS é a ferramenta mais eficiente para caminhos mínimos ($O(V + E)$).

</details>
