---
id: DSA-PATT-MST-005
title: "Unicidade da Árvore Geradora Mínima quando os Pesos são Distintos"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::google
  - freq::high
---

## Pergunta
Por que a unicidade estrita dos pesos de todas as arestas em um grafo garante que a **MST seja matematicamente única**?

## Resposta
### Quick Answer
**Solução Direta**:
- Pela **Propriedade do Corte**, em qualquer corte que divide o grafo em dois grupos, a aresta de menor peso que atravessa o corte deve obrigatoriamente pertencer a qualquer MST.
- Se todos os pesos das arestas forem distintos:
  - Em cada corte, existe uma **única aresta de peso estritamente mínimo** que o atravessa.
  - Não há empates e, portanto, não há escolhas arbitrárias entre arestas equivalentes.
  - Kruskal e Prim farão exatamente as mesmas escolhas unívocas, resultando em uma **MST única**.

### Dual Coding Visual
| Pesos das Arestas no Grafo | Quantidade de MSTs Possíveis |
|---|---|
| **Todos os pesos distintos** | Garantidamente **1 única MST** |
| **Arestas com pesos repetidos** | Podem existir múltiplas MSTs de mesmo custo total |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É um teorema clássico de teoria dos grafos cobrado frequentemente em perguntas conceituais de entrevistas sênior.

</details>
