---
id: DSA-PATT-MST-000
title: "Conceito de Árvore Geradora Mínima (MST) e a Propriedade do Corte (Cut Property)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::meta
  - freq::high
---

## Pergunta
O que é uma **Árvore Geradora Mínima (MST)** e qual a intuição da **Propriedade do Corte (Cut Property)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **MST** é um subconjunto de $V - 1$ arestas de um grafo conexo e não-direcionado que conecta todos os $V$ vértices com o **menor custo total de pesos possível**, sem formar ciclos.
- **Propriedade do Corte (Cut Property)**: Se dividirmos os vértices do grafo em dois conjuntos disjuntos $S$ e $V \setminus S$ (um corte), a **aresta de menor peso que atravessa esse corte pertence garantidamente à Árvore Geradora Mínima**.
- Essa propriedade matemática é o fundamento da corretude dos algoritmos gulosos de Kruskal e Prim.

### Dual Coding Visual
| Propriedade de MST | Requisito Estrutural | Quantidade de Arestas |
|---|---|---|
| **Conexão Total** | Todos os $V$ nós conectados | Exatamente $V - 1$ arestas |
| **Sem Ciclos** | É uma árvore matemática | 0 ciclos |
| **Custo Mínimo** | $\sum w(e)$ minimizado globalmente | Baseado na Cut Property |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Uma MST conecta todos os vértices gastando o mínimo possível, mas **não garante** o menor caminho entre dois nós individuais (esse é o papel de Dijkstra).

</details>
