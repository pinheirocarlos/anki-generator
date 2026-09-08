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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Modelagem de Course Schedule (LeetCode 207 &amp; 210)</text>

  <!-- Modelagem de aresta -->
  <g transform="translate(50, 45)">
    <rect x="0" y="0" width="260" height="105" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="130" y="20" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Orientação Correta da Aresta</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Par de entrada: [curso 0, pré-req 1]</text>
    <circle cx="50" cy="70" r="14" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="74" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">1</text>
    <line x1="66" y1="70" x2="114" y2="70" stroke="#10b981" stroke-width="2"/>
    <polygon points="114,70 106,66 106,74" fill="#10b981"/>
    <circle cx="130" cy="70" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="130" y="74" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">0</text>
    <text x="130" y="96" fill="#34d399" font-size="9" text-anchor="middle">1 ➔ 0 (inDegree[0]++)</text>
  </g>

  <!-- Resolução I vs II -->
  <g transform="translate(340, 45)">
    <rect x="0" y="0" width="290" height="105" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="145" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Course Schedule I vs II</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">• <tspan fill="#38bdf8" font-weight="bold">Course Schedule I</tspan>: boolean</text>
    <text x="25" y="58" fill="#94a3b8" font-size="10">count == numCourses ? true : false</text>
    <text x="15" y="78" fill="#f8fafc" font-size="10">• <tspan fill="#fbbf24" font-weight="bold">Course Schedule II</tspan>: int[]</text>
    <text x="25" y="94" fill="#94a3b8" font-size="10">count == numCourses ? order : []</text>
  </g>

  <text x="340" y="178" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Armadilha Frequente: Modelar aresta 0 ➔ 1 inverte o grafo e quebra o algoritmo de Kahn</text>
</svg>
<p>Visualização: Modelagem de Course Schedule: pré-requisitos direcionados v → u com vetor de in-degrees gerenciado pelo algoritmo de Kahn.</p>

| Problema LeetCode | Pergunta Respondida | Retorno Esperado |
|---|---|---|
| **Course Schedule I** | É possível formar? (Sem ciclo) | `boolean` (`true` / `false`) |
| **Course Schedule II** | Qual a ordem de execução? | `int[]` com a sequência válida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A correta orientação das arestas ($v \to u$) é a armadilha mais comum que inverte o grafo e quebra a solução.

</details>
