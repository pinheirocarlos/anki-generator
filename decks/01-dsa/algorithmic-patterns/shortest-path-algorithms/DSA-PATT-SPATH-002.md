---
id: DSA-PATT-SPATH-002
title: "Intuição do Algoritmo de Dijkstra com Min-Heap e Relaxamento Guloso"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Dijkstra** utiliza o Min-Heap e a técnica de **Relaxamento de Arestas** para calcular distâncias mínimas em $O((V + E) \log V)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantém um array `dist[]` inicializado com $\infty$ (com `dist[src] = 0`) e um Min-Heap de pares $(d, u)$.
- A cada passo:
  1. Extrai o nó $u$ com menor distância provisória da raiz do Min-Heap.
  2. Se $d > \text{dist}[u]$, descarta (entrada obsoleta no heap).
  3. **Relaxamento de Aresta**: Para cada vizinho $v$ com aresta $(u, v, w)$:
     $$\text{Se } \text{dist}[u] + w < \text{dist}[v] \implies \text{dist}[v] = \text{dist}[u] + w \quad (\text{insere } (\text{dist}[v], v) \text{ no Min-Heap})$$
- Encerra quando o heap esvaziar, com `dist[]` contendo o menor caminho de `src` para todos os vértices.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Floyd-Warshall: Todos os Pares de Caminhos Mínimos em O(V³)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">DP 3D: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) para cada intermediário k</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">3 loops aninhados simples: k (nó intermediário), i (origem), j (destino).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Calcula caminhos mais curtos entre qualquer par de nós em grafos densos.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se a diagonal dist[i][i] &lt; 0 ao final → existe ciclo de peso negativo no grafo</text>

</svg>

| Operação de Dijkstra | Ação | Complexidade |
|---|---|---|
| **Extração do Mínimo** | `minHeap.poll()` ($V$ vezes) | $O(V \log V)$ |
| **Relaxamento de Aresta** | `minHeap.offer()` ($E$ vezes) | $O(E \log V)$ |
| **Total Combinado** | $O((V + E) \log V)$ | Ótimo para grafos esparsos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Dijkstra Canônico
```java
import java.util.*;

public class Dijkstra {
  public static int[] dijkstra(int n, List<List<int[]>> adj, int src) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    pq.offer(new int[]{0, src}); // {distância, nó}

    while (!pq.isEmpty()) {
      int[] curr = pq.poll();
      int d = curr[0], u = curr[1];
      if (d > dist[u]) continue; // Descarta entrada obsoleta

      for (int[] edge : adj.get(u)) {
        int v = edge[0], weight = edge[1];
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          pq.offer(new int[]{dist[v], v});
        }
      }
    }
    return dist;
  }
}
```

#### Key Takeaways
- O descarte `if (d > dist[u]) continue` é a otimização fundamental que evita lentidão por múltiplas entradas do mesmo nó no Min-Heap.

</details>
