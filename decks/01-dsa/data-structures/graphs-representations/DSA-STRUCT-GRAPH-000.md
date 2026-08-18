---
id: DSA-STRUCT-GRAPH-000
title: "Definição Formal de Grafo, Direcionamento e Ponderação de Arestas"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::meta
  - freq::high
---

## Pergunta
O que define formalmente um **Grafo** ($G = (V, E)$) e qual a diferença entre grafos direcionados, não-direcionados e ponderados?

## Resposta
### Quick Answer
**Solução Direta**:
- Um Grafo $G = (V, E)$ é composto por um conjunto de vértices/nós $V$ e um conjunto de arestas $E$ conectando pares de nós.
- **Não-Direcionado**: Arestas são bidirecionais ($(u, v) = (v, u)$). Exemplo: conexões de amizade no Facebook.
- **Direcionado (Digrafo)**: Arestas possuem sentido unidirecional ($u \to v \neq v \to u$). Exemplo: seguidores no Twitter/Instagram ou dependências de pacotes.
- **Ponderado**: Cada aresta possui um peso associado (custo, distância, latência).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/graph-types-directed-weighted-loop.webm">
    <p>Visualização: Representação de vértices e arestas direcionadas, bidirecionadas e ponderadas com pesos.</p>
  </video>
</div>

| Tipo de Grafo | Simetria de Aresta | Exemplo de Aplicação |
|---|---|---|
| **Não-Direcionado** | $(u, v) \iff (v, u)$ | Redes de computadores / Amizades |
| **Direcionado (Digrafo)** | $u \to v$ | Navegação web / Pré-requisitos |
| **Ponderado** | $(u, v, w)$ com peso $w$ | Rotas de GPS (distância em km) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O direcionamento e a presença de pesos determinam quais algoritmos são aplicáveis (ex: Dijkstra para ponderados não-negativos, BFS para não-ponderados).

</details>
