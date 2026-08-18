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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/course-schedule-kahn-dsa-loop.webm">
    <p>Visualização: Verificação de viabilidade curricular contando vértices processados contra total de disciplinas V.</p>
  </video>
</div>

| Problema LeetCode | Pergunta Respondida | Retorno Esperado |
|---|---|---|
| **Course Schedule I** | É possível formar? (Sem ciclo) | `boolean` (`true` / `false`) |
| **Course Schedule II** | Qual a ordem de execução? | `int[]` com a sequência válida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A correta orientação das arestas ($v \to u$) é a armadilha mais comum que inverte o grafo e quebra a solução.

</details>
