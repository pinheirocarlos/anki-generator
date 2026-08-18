---
id: DSA-PATT-TRAVERSAL-002
title: "Intuição da Busca em Profundidade (DFS) com Recursão para Conectividade"
tags:
  - level::l3-junior
  - topic::dsa::bfs-dfs-traversals
  - company::google
  - freq::high
---

## Pergunta
Como a **Busca em Profundidade (DFS)** explora caminhos até o esgotamento antes do backtracking e quais suas aplicações primárias?

## Resposta
### Quick Answer
**Solução Direta**:
- A DFS segue recursivamente por um ramo único até atingir um nó folha ou sem vizinhos não-visitados, executando **Backtracking** ao retornar na pilha de chamadas para explorar ramos adjacentes.
- **Aplicações Primárias**:
  - Detecção de componentes conexos em matrizes e grafos (Flood Fill / Number of Islands).
  - Busca exaustiva de todos os caminhos possíveis (*All Paths from Source to Target*).
  - Ordenação Topológica e detecção de ciclos em grafos direcionados.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bfs-shortest-path-unweighted-loop.webm">
    <p>Visualização: Primeira visita a um nó no BFS corresponde estritamente à distância mínima em número de arestas.</p>
  </video>
</div>

| Característica | DFS (Depth-First) | BFS (Breadth-First) |
|---|---|---|
| **Estratégia** | Aprofunda o máximo possível | Varre em ondas circulares |
| **Estrutura** | Call Stack (Recursão) | Fila (`Queue`) |
| **Foco Ideal** | Conectividade / Backtracking | Menor caminho não-ponderado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A DFS é mais concisa de escrever recursivamente, mas consome espaço de pilha proporcional à profundidade máxima do grafo ($O(V)$).

</details>
