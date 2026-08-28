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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">A* Search: Busca Heurística Admissível f(n) = g(n) + h(n)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">g(n) (Custo Real Acumulado) + h(n) (Estimativa Heurística até o Alvo)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Heurística admissível (h(n) nunca superestima o custo real) garante caminho ótimo.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Min-Heap ordena por menor f(n), direcionando a busca radial diretamente para o objetivo.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Explora frações mínimas dos nós explorados por Dijkstra em mapas 2D/3D (GPS routing)</text>

</svg>

| Algoritmo | Suporte a Pesos Negativos | Complexidade de Tempo |
|---|---|---|
| **Dijkstra** | Não (produz resultado errado) | $O((V + E) \log V)$ |
| **Bellman-Ford** | Sim (suporta e detecta ciclos) | $O(V \cdot E)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas FAANG, sempre verifique se os pesos das arestas podem ser negativos antes de escolher Dijkstra.

</details>
