---
id: DSA-PATT-MST-004
title: "Modelagem de Redes de Menor Custo com MST (Min Cost to Connect All Points)"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::meta
  - freq::high
---

## Pergunta
Como modelar o problema **Min Cost to Connect All Points** (LeetCode 1584) como uma MST sobre distâncias de Manhattan?

## Resposta
### Quick Answer
**Solução Direta**:
- Dados $N$ pontos 2D, o custo de conectar o ponto $i$ ao ponto $j$ é a distância de Manhattan:
  $$w(i, j) = |x_i - x_j| + |y_i - y_j|$$
- Modelamos um grafo completo não-direcionado ponderado com $V = N$ vértices e $E = \frac{N(N-1)}{2}$ arestas implícitas.
- Aplicando o **Algoritmo de Prim** com um array `minCost[]` de tamanho $N$:
  - A cada passo, seleciona o ponto fora da árvore com menor custo de conexão em $O(N)$ e atualiza as distâncias dos demais pontos.
- **Complexidade**: $O(N^2)$ tempo e $O(N)$ espaço auxiliar.

### Dual Coding Visual
| Abordagem no LeetCode 1584 | Complexidade de Tempo | Espaço de Memória |
|---|---|---|
| **Kruskal (Gera todas as arestas)** | $O(N^2 \log N)$ | $O(N^2)$ para $N^2$ arestas |
| **Prim Otimizado (Array plano)** | $O(N^2)$ | $O(N)$ Mínimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em grafos completos implícitos, Prim com array evita alocar milhões de objetos de aresta no Heap.

</details>
