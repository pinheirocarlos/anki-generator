---
id: CS-MATH-GRAPH-000
title: "Grafo Direcionado Acíclico (DAG) e Ordenação Topológica"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que define um **Grafo Direcionado Acíclico (DAG)** e como a **Ordenação Topológica** resolve dependências em sistemas de compilação e tarefas?

## Resposta
### Quick Answer
**Solução Direta**:
- **DAG (Directed Acyclic Graph)**: É um grafo orientado que não contém nenhum ciclo direcionado (é impossível partir de um vértice $v$ e retornar a $v$ seguindo a direção das arestas).
- **Ordenação Topológica**: É uma ordenação linear de todos os vértices de um DAG tal que, para cada aresta direcionada $(u \to v)$, o vértice $u$ aparece **obrigatoriamente antes** de $v$ na sequência.
- **Aplicações**: Resolução de ordem de compilação de pacotes (npm/Go modules), pipelines de CI/CD, escalonamento de queries em bancos de dados distribuídos e DAGs de orquestração (Apache Airflow / Spark).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/dag-topological-ordering-proof-loop.webm">
    <p>Visualização: Existência de ao menos um nó com in-degree 0 em todo DAG permitindo linearização causal das tarefas.</p>
  </video>
</div>

| Estrutura de Grafo | Possui Ciclo? | Suporta Ordenação Topológica? |
|---|---|---|
| **DAG (Válido)** | Não | Sim (Ao menos 1 ordem linear válida) |
| **Grafo com Ciclo (`A 	o B 	o A`)**| Sim | Não (Gera deadlock de dependência mútua) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Algoritmo de Kahn (Baseado em In-Degree) em $O(V + E)$
1. Calcula o grau de entrada (`in-degree`) de todos os vértices.
2. Insere em uma fila todos os vértices com `in-degree == 0` (sem dependências).
3. Enquanto a fila não estiver vazia:
   - Remove o vértice $u$ e adiciona na lista de resultado ordenado.
   - Decrementa o `in-degree` de todos os vizinhos de $u$. Se algum vizinho atingir zero, adiciona na fila.
4. Se o resultado final tiver menos que $V$ vértices, **o grafo contém ciclos**!

#### Key Takeaways
- Um grafo direcionado admite ordenação topológica se e somente se for um DAG (livre de ciclos).

</details>
