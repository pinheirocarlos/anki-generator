---
id: DSA-STRUCT-GRAPH-001
title: "Critérios de Engenharia: Lista vs Matriz de Adjacência para Grafos Densos e Esparsos"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::google
  - freq::high
---

## Pergunta
Quais os critérios rigorosos de engenharia para escolher entre Lista de Adjacência e Matriz de Adjacência em sistemas de escala FAANG?

## Resposta
### Quick Answer
**Solução Direta**:
- **Grafo Esparso ($E \ll V^2$, ex: $E = O(V)$)**:
  - Use **Lista de Adjacência**. Economiza gigabytes de memória ($O(V+E)$) e permite BFS/DFS em $O(V+E)$ em vez de $O(V^2)$.
- **Grafo Denso ($E \approx V^2$)**:
  - Use **Matriz de Adjacência**. Ocupa a mesma ordem de memória que a lista, mas possui zero overhead de ponteiros e oferece consultas de aresta instantâneas $O(1)$.
- **Algoritmos com Matriz**: Algoritmos como Floyd-Warshall ($O(V^3)$ All-Pairs Shortest Path) operam naturalmente sobre matrizes contíguas.

### Dual Coding Visual
| Métrica | Grafo Esparso ($V=10^5, E=10^6$) | Grafo Denso ($V=10^4, E=10^8$) |
|---|---|---|
| **Matriz $O(V^2)$** | $\approx 10\text{ GB}$ (99.9% vazia) | $\approx 100\text{ MB}$ (Ótima) |
| **Lista $O(V+E)$** | $\approx 12\text{ MB}$ (Ideal) | $\approx 400\text{ MB}$ (Ponteiros extras) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Para redes sociais de milhões de usuários ($V = 10^8$), a Matriz de Adjacência exigiria $10^{16}$ bytes ($10\text{ Petabytes}$), tornando a Lista de Adjacência a única opção fisicamente viável.

</details>
