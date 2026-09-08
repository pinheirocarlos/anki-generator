---
id: DSA-PATT-MST-002
title: "Algoritmo de Kruskal: Abordagem Orientada a Arestas com DSU em O(E log E)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kruskal** constrói a MST ordenando arestas e utilizando DSU em tempo $O(E \log E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Algoritmo de Kruskal opera sob perspectiva de arestas globais:
  1. Ordena todas as $E$ arestas em ordem crescente de peso ($O(E \log E)$).
  2. Inicializa um DSU com $V$ conjuntos disjuntos.
  3. Itera sobre as arestas ordenadas: se os extremos da aresta pertencem a componentes diferentes (`dsu.union(u, v) == true`), adiciona a aresta à MST.
  4. Encerra ao acumular $V - 1$ arestas.

### Dual Coding Visual
<img src="assets/DSA-PATT-MST-002.gif" alt="Union-Find Kruskal Demo" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0;" />
<p>Visualização: Estrutura Union-Find prevenindo a formação de ciclos durante o algoritmo de Kruskal.</p>

| Passo de Kruskal | Estrutura Envolvida | Complexidade |
|---|---|---|
| **1. Ordenação Global** | `Arrays.sort(edges)` | $O(E \log E)$ |
| **2. Teste e Fusão** | $E$ chamadas no DSU | $O(E \cdot \alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É extremamente simples de implementar e altamente eficiente para grafos esparsos ($E \approx V$).

</details>
