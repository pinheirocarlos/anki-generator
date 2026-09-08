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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Matriz de Decisão para Caminhos Mínimos: Topologia &amp; Pesos</text>

  <!-- 4 Cards de Algoritmo -->
  <g transform="translate(25, 40)">
    <!-- Dijkstra -->
    <rect x="0" y="0" width="145" height="110" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="5"/>
    <text x="72" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Dijkstra</text>
    <text x="12" y="42" fill="#94a3b8" font-size="10">Pesos: <tspan fill="#34d399" font-weight="bold">w ≥ 0</tspan></text>
    <text x="12" y="60" fill="#94a3b8" font-size="10">Alvo: <tspan fill="#fff">Single-Source</tspan></text>
    <text x="12" y="78" fill="#94a3b8" font-size="10">Tempo: <tspan fill="#60a5fa">O((V+E) log V)</tspan></text>
    <text x="12" y="96" fill="#fcd34d" font-size="9">Maps, Roteadores</text>

    <!-- Bellman-Ford -->
    <rect x="160" y="0" width="145" height="110" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="5"/>
    <text x="232" y="20" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Bellman-Ford</text>
    <text x="172" y="42" fill="#94a3b8" font-size="10">Pesos: <tspan fill="#fbbf24" font-weight="bold">w negativos</tspan></text>
    <text x="172" y="60" fill="#94a3b8" font-size="10">Ciclo Neg: <tspan fill="#34d399">Detecta</tspan></text>
    <text x="172" y="78" fill="#94a3b8" font-size="10">Tempo: <tspan fill="#f87171">O(V · E)</tspan></text>
    <text x="172" y="96" fill="#fcd34d" font-size="9">Arbitragem Câmbio</text>

    <!-- Floyd-Warshall -->
    <rect x="320" y="0" width="145" height="110" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5" rx="5"/>
    <text x="392" y="20" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Floyd-Warshall</text>
    <text x="332" y="42" fill="#94a3b8" font-size="10">Pesos: <tspan fill="#a78bfa" font-weight="bold">Sem ciclo neg</tspan></text>
    <text x="332" y="60" fill="#94a3b8" font-size="10">Alvo: <tspan fill="#fff">All-Pairs (Todos)</tspan></text>
    <text x="332" y="78" fill="#94a3b8" font-size="10">Tempo: <tspan fill="#f87171">O(V³)</tspan></text>
    <text x="332" y="96" fill="#fcd34d" font-size="9">Grafos Densos V≤400</text>

    <!-- A* Search -->
    <rect x="480" y="0" width="145" height="110" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="5"/>
    <text x="552" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">A* (A-Star)</text>
    <text x="492" y="42" fill="#94a3b8" font-size="10">Heurística: <tspan fill="#38bdf8" font-weight="bold">f = g + h</tspan></text>
    <text x="492" y="60" fill="#94a3b8" font-size="10">Alvo: <tspan fill="#fff">Single-Pair guiado</tspan></text>
    <text x="492" y="78" fill="#94a3b8" font-size="10">Tempo: <tspan fill="#60a5fa">O(E) heurística</tspan></text>
    <text x="492" y="96" fill="#fcd34d" font-size="9">Jogos e Robótica</text>
  </g>

  <text x="340" y="176" fill="#94a3b8" font-size="11" text-anchor="middle">Dica de Entrevista: Grafos não ponderados ➔ BFS O(V+E); Pesos ≥ 0 ➔ Dijkstra; Pesos negativos ➔ Bellman-Ford</text>
</svg>
<p>Visualização: Matriz de decisão para caminhos mínimos comparando restrições de peso, objetivos de pares e complexidades.</p>

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
