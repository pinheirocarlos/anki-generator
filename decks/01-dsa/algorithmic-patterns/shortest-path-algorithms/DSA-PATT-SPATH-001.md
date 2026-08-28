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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bellman-Ford: V - 1 Relaxamentos e Detecção de Ciclos Negativos em O(V · E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Relaxa Todas as E Arestas V - 1 Vezes Sucessivas</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">O caminho mais curto simples contém no máximo V - 1 arestas.</text>
    <text x="20" y="62" fill="#fca5a5" font-size="11">Se na V-ésima iteração alguma distância ainda diminuir → CICLO DE PESO NEGATIVO DETECTADO!</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Tolera arestas negativas e é a base de protocolos de vetor de distância (RIP)</text>

</svg>

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
