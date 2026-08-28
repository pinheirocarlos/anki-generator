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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ordenação Topológica em DAG: Resolução Linear de Dependências</text>
  <g transform="translate(120, 50)">
    <rect x="0" y="15" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="40" y="37" fill="#fff" font-size="11" text-anchor="middle">Compilar</text>
    <path d="M 85 32 L 135 32" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>
    <rect x="140" y="15" width="80" height="35" fill="#1e293b" stroke="#10b981" rx="4"/><text x="180" y="37" fill="#fff" font-size="11" text-anchor="middle">Testar</text>
    <path d="M 225 32 L 275 32" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)"/>
    <rect x="280" y="15" width="80" height="35" fill="#1e293b" stroke="#f59e0b" rx="4"/><text x="320" y="37" fill="#fff" font-size="11" text-anchor="middle">Deploy</text>
  </g>
  <text x="340" y="150" fill="#34d399" font-size="11" text-anchor="middle">Ordem linear u antes de v para toda aresta direcionada (u → v)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Só existe se o grafo for Acíclico (DAG): Tempo O(V + E)</text>

</svg>

| Tipo de Grafo | Possui Ciclo | Ordenação Topológica Válida |
|---|---|---|
| **DAG (Acíclico Direcionado)** | Não | Sim (ao menos uma ordenação válida) |
| **Grafo com Ciclo** | Sim | Impossível (dependência circular) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Um DAG pode admitir múltiplas ordenações topológicas válidas diferentes se houver tarefas independentes em paralelo.

</details>
