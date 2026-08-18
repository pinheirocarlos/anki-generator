---
id: DSA-PATT-SPATH-000
title: "Por que BFS Falha com Arestas Ponderadas e a Intuição de Dijkstra"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::google
  - freq::high
---

## Pergunta
Por que a BFS tradicional falha em encontrar o caminho mais curto em grafos com **arestas de pesos diferentes** e como Dijkstra resolve essa limitação?

## Resposta
### Quick Answer
**Solução Direta**:
- A BFS assume que cada aresta tem peso unitário uniforme ($1$), medindo distância apenas por contagem de passos.
- Em grafos ponderados, um caminho com **mais arestas** pode ter **custo total menor** que um caminho direto com uma única aresta pesada (ex: $A \to B \to C$ com custo $1 + 1 = 2$ vs $A \to C$ com custo $10$).
- **Dijkstra** substitui a Fila FIFO por uma **Fila de Prioridade (Min-Heap)**, expandindo sempre o nó com a **menor distância acumulada acumulada até o momento**, garantindo a corretude com custos desiguais não-negativos.

### Dual Coding Visual
| Algoritmo | Fila e Métrica de Expansão | Aplicabilidade |
|---|---|---|
| **BFS** | Fila FIFO / Contagem de saltos ($w=1$) | Apenas pesos unitários |
| **Dijkstra** | Min-Heap / Custo acumulado $\sum w$ | Pesos não-negativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dijkstra é essencialmente uma BFS orientada a menor custo acumulado em vez de menor contagem de saltos.

</details>
