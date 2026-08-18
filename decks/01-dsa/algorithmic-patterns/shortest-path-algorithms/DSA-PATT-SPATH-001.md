---
id: DSA-PATT-SPATH-001
title: "Matriz Comparativa de Caminhos Mínimos: Dijkstra vs Bellman-Ford vs Floyd vs A*"
tags:
  - level::l4-pleno
  - topic::dsa::shortest-path-algorithms
  - company::google
  - freq::high
---

## Pergunta
Qual é a matriz de trade-offs entre **Dijkstra**, **Bellman-Ford**, **Floyd-Warshall** e **A* Search** para problemas de caminho mínimo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Dijkstra ($O((V+E)\log V)$)**: Único ponto de origem (*Single-Source*) em grafos com pesos não-negativos. Mais rápido na prática.
- **Bellman-Ford ($O(V \cdot E)$)**: Suporta pesos negativos e detecta **Ciclos de Peso Negativo**.
- **Floyd-Warshall ($O(V^3)$)**: Todos os pares para todos os pares (*All-Pairs*) com Programação Dinâmica sobre matrizes.
- **A* Search ($O(E)$ com boa heurística)**: Utiliza função heurística $f(n) = g(n) + h(n)$ para direcionar a busca em direção ao alvo em mapas espaciais (GPS e IA de jogos).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dijkstra-min-heap-complexity-loop.webm">
    <p>Visualização: Extração de V nós e atualização de até E arestas resultando em complexidade O((V+E) log V).</p>
  </video>
</div>

| Algoritmo | Complexidade e Tipo | Suporta Pesos Negativos |
|---|---|---|
| **Dijkstra** | $O((V+E)log V)$ (Single-Source) | Não |
| **Bellman-Ford** | $O(V cdot E)$ (Single-Source) | Sim (com detecção) |
| **Floyd-Warshall** | $O(V^3)$ (All-Pairs DP) | Sim (sem ciclos neg) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Escolher o algoritmo certo depende da quantidade de origens (1 vs todas) e das restrições de peso do grafo.

</details>
