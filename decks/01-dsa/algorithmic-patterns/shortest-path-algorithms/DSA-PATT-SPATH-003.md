---
id: DSA-PATT-SPATH-003
title: "Por que o Algoritmo de Dijkstra Falha na Presença de Arestas de Peso Negativo"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::meta
  - freq::high
---

## Pergunta
Por que a estratégia gulosa de Dijkstra falha em encontrar o caminho correto quando o grafo possui **arestas de peso negativo**?

## Resposta
### Quick Answer
**Solução Direta**:
- A premissa matemática gulosa de Dijkstra é que, ao extrair um nó $u$ do Min-Heap, **sua menor distância final já foi irrevogavelmente determinada**, pois qualquer caminho alternativo futuro somaria pesos positivos e seria estritamente mais longo.
- **A Falha com Pesos Negativos**: Uma aresta de peso negativo subsequente (ex: $-10$) pode reduzir a distância de um nó após ele já ter sido marcado como finalizado, violando a invariante de Dijkstra e produzindo distâncias incorretas (ou loop infinito em ciclos negativos).
- Para grafos com pesos negativos, deve-se utilizar o **Algoritmo de Bellman-Ford** ($O(V \cdot E)$).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dijkstra-negative-edge-failure-loop.webm">
    <p>Visualização: A premissa gulosa de que a menor distância já finalizada é imutável quebra na presença de pesos negativos.</p>
  </video>
</div>

| Algoritmo | Suporte a Pesos Negativos | Complexidade de Tempo |
|---|---|---|
| **Dijkstra** | Não (produz resultado errado) | $O((V + E) \log V)$ |
| **Bellman-Ford** | Sim (suporta e detecta ciclos) | $O(V \cdot E)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas FAANG, sempre verifique se os pesos das arestas podem ser negativos antes de escolher Dijkstra.

</details>
