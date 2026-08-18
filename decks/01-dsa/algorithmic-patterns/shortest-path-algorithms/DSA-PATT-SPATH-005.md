---
id: DSA-PATT-SPATH-005
title: "Algoritmo de Floyd-Warshall para All-Pairs Shortest Path com DP em O(V³)"
tags:
  - level::l4-pleno
  - topic::dsa::shortest-path-algorithms
  - company::microsoft
  - freq::high
---

## Pergunta
Como o **Algoritmo de Floyd-Warshall** computa o caminho mais curto entre todos os pares de vértices via Programação Dinâmica em tempo $O(V^3)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantém uma matriz $\text{dist}[i][j]$ inicializada com o peso direto das arestas (e $0$ na diagonal principal).
- Itera sobre todos os vértices intermediários possíveis $k$ de $0$ a $V-1$:
  - Para cada par $(i, j)$, testa se passar por $k$ reduz o custo:
    $$\text{dist}[i][j] = \min(\text{dist}[i][j], \ \text{dist}[i][k] + \text{dist}[k][j])$$
- **Estrutura**: Três loops aninhados simples (`for k, for i, for j`).
- **Complexidade**: $O(V^3)$ tempo e $O(V^2)$ espaço em matriz contígua.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/floyd-warshall-all-pairs-matrix-loop.webm">
    <p>Visualização: Programação dinâmica tridimensional atualizando matriz de adjacência dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).</p>
  </video>
</div>

| Algoritmo All-Pairs | Estrutura de Código | Complexidade |
|---|---|---|
| **$V \times$ Dijkstra** | $V$ chamadas de Min-Heap | $O(V \cdot E \log V)$ |
| **Floyd-Warshall** | 3 loops simples sobre matriz | $O(V^3)$ (código em 5 linhas) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Floyd-Warshall
```java
public class FloydWarshall {
  public void floydWarshall(int[][] dist, int V) {
    for (int k = 0; k < V; k++) {
      for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
          if (dist[i][k] != Integer.MAX_VALUE && dist[k][j] != Integer.MAX_VALUE) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
          }
        }
      }
    }
  }
}
```

#### Key Takeaways
- O loop mais externo **deve ser obrigatoriamente o vértice intermediário $k$** para que a propriedade de subestrutura ótima da DP seja respeitada.

</details>
