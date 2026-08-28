---
id: DSA-PATT-TOPO-005
title: "Modelagem Canônica de Course Schedule I & II com Kahn e DFS"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::amazon
  - freq::high
---

## Pergunta
Como modelar as relações de dependência dos problemas **Course Schedule I (LeetCode 207)** e **Course Schedule II (LeetCode 210)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Course Schedule I**: Pergunta se é possível concluir todos os cursos. Resposta: `kahn(graph).count == numCourses` (detecta se o grafo é acíclico).
- **Course Schedule II**: Pede a ordem exata de realização dos cursos. Resposta: retorna o array `order[]` preenchido pelo Algoritmo de Kahn (ou `[]` se houver ciclo).
- Em ambos, a aresta de dependência $[u, v]$ onde $v$ é pré-requisito de $u$ deve ser modelada como aresta $v \to u$, garantindo que `in-degree[u]++` represente a quantidade de pré-requisitos pendentes.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Caminho Mais Longo em DAG (Critical Path Method) em O(V + E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Em DAGs, o Caminho Mais Longo NÃO é NP-Difícil!</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Encontra a ordenação topológica dos nós do DAG.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Relaxa na ordem topológica buscando máximo: dist[v] = max(dist[v], dist[u] + weight).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Identifica o caminho crítico e o tempo mínimo de conclusão de projetos em O(V + E)</text>

</svg>

| Problema LeetCode | Pergunta Respondida | Retorno Esperado |
|---|---|---|
| **Course Schedule I** | É possível formar? (Sem ciclo) | `boolean` (`true` / `false`) |
| **Course Schedule II** | Qual a ordem de execução? | `int[]` com a sequência válida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A correta orientação das arestas ($v \to u$) é a armadilha mais comum que inverte o grafo e quebra a solução.

</details>
