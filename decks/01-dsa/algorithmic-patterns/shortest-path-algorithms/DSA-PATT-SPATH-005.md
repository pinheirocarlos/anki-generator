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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Johnson's Algorithm: Reponderação de Arestas Negativas em Grafos Esparsos</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">1× Bellman-Ford + V× Dijkstra em O(V · E + V · E log V)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Executa Bellman-Ford a partir de nó fonte artificial para computar potenciais h(v).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Transforma pesos: w'(u, v) = w(u, v) + h(u) - h(v) ≥ 0, viabilizando V execuções de Dijkstra.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Supera Floyd-Warshall O(V³) em grafos esparsos (onde E ≪ V²)</text>

</svg>

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
