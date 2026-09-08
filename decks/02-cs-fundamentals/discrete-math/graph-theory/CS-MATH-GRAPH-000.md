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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafo Direcionado Acíclico (DAG) &amp; Ordenação Topológica</text>
  <g transform="translate(80, 50)">
    <!-- Nodes -->
    <circle cx="40" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="40" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">A</text>

    <path d="M 60 30 L 140 30" stroke="#38bdf8" stroke-width="2"/>

    <circle cx="160" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="160" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">B</text>

    <path d="M 180 30 L 260 30" stroke="#38bdf8" stroke-width="2"/>

    <circle cx="280" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="280" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">C</text>

    <path d="M 300 30 L 380 30" stroke="#38bdf8" stroke-width="2"/>

    <circle cx="400" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="400" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">D</text>
  </g>
  <g transform="translate(60, 115)">
    <rect x="0" y="0" width="560" height="55" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
    <text x="280" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Algoritmo de Kahn (In-Degree) / DFS Post-Order Reverso: Tempo O(V + E)</text>
    <text x="280" y="44" fill="#94a3b8" font-size="10" text-anchor="middle">Aplicações: Ordem de compilação (Make/Bazel), execução de DAGs em Airflow e resolução de dependências.</text>
  </g>

</svg>
<p>Visualização: Grafo Direcionado Acíclico (DAG) e sua correspondente linearização via Ordenação Topológica de dependências.</p>

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
