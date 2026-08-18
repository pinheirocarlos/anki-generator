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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bfs-wavefront-expansion-loop.webm">
    <p>Visualização: Expansão da fronteira de busca nível por nível em anéis concêntricos usando fila FIFO.</p>
  </video>
</div>

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
