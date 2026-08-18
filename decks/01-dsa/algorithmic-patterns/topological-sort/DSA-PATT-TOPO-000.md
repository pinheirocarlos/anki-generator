---
id: DSA-PATT-TOPO-000
title: "Definição de Ordenação Topológica em Grafos Acíclicos Direcionados (DAGs)"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::google
  - freq::high
---

## Pergunta
O que é uma **Ordenação Topológica (Topological Sort)** e por que ela só é viável em Grafos Acíclicos Direcionados (DAGs)?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Ordenação Topológica** é uma linearização dos vértices de um grafo direcionado tal que, para toda aresta direcionada $u \to v$, o vértice $u$ aparece **obrigatoriamente antes** de $v$ na sequência ordenada.
- **Viabilidade Exclusiva em DAGs**: Se o grafo contiver um ciclo (ex: $A \to B \to C \to A$), $A$ deveria vir antes de $B$, que deveria vir antes de $C$, que deveria vir antes de $A$ (uma contradição lógica insolúvel). Portanto, a ordenação topológica existe se e somente se o grafo for um **DAG (Directed Acyclic Graph)**.

### Dual Coding Visual
| Tipo de Grafo | Possui Ciclo | Ordenação Topológica Válida |
|---|---|---|
| **DAG (Acíclico Direcionado)** | Não | Sim (ao menos uma ordenação válida) |
| **Grafo com Ciclo** | Sim | Impossível (dependência circular) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Um DAG pode admitir múltiplas ordenações topológicas válidas diferentes se houver tarefas independentes em paralelo.

</details>
