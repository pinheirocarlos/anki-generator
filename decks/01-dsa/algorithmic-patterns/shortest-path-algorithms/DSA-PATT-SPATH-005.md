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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Floyd-Warshall: Programação Dinâmica All-Pairs em O(V³)</text>

  <!-- Triângulo de Nós i, k, j -->
  <g transform="translate(60, 45)">
    <!-- Nó i -->
    <circle cx="40" cy="80" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="40" y="84" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">i</text>

    <!-- Nó j -->
    <circle cx="200" cy="80" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="200" y="84" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">j</text>

    <!-- Rota direta i -> j -->
    <line x1="60" y1="80" x2="180" y2="80" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3"/>
    <text x="120" y="98" fill="#94a3b8" font-size="10" text-anchor="middle">dist[i][j] direto</text>

    <!-- Nó intermediário k -->
    <circle cx="120" cy="20" r="18" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="120" y="24" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">k</text>

    <!-- Rota via k: i -> k -> j -->
    <line x1="55" y1="67" x2="105" y2="33" stroke="#10b981" stroke-width="2.5"/>
    <line x1="135" y1="33" x2="185" y2="67" stroke="#10b981" stroke-width="2.5"/>
    <text x="65" y="40" fill="#34d399" font-size="9" font-weight="bold">dist[i][k]</text>
    <text x="175" y="40" fill="#34d399" font-size="9" font-weight="bold">dist[k][j]</text>
  </g>

  <!-- Equação de Recorrência -->
  <g transform="translate(320, 45)">
    <rect x="0" y="0" width="320" height="95" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5" rx="6"/>
    <text x="160" y="22" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Equação de Bellman / DP</text>
    <text x="160" y="48" fill="#fbbf24" font-size="11" font-family="monospace" text-anchor="middle">dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])</text>
    <text x="15" y="72" fill="#f8fafc" font-size="10">• Loop k mais externo: k = 0 até V-1 (Intermediário)</text>
    <text x="15" y="88" fill="#94a3b8" font-size="10">• Loops i e j internos: testa todos os pares (i, j)</text>
  </g>

  <text x="340" y="175" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">3 loops aninhados simples; se dist[i][i] &lt; 0 na diagonal, detecta ciclo negativo</text>
</svg>
<p>Visualização: Programação dinâmica de Floyd-Warshall: relaxamento do caminho entre i e j considerando o nó k como intermediário em O(V³).</p>

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
