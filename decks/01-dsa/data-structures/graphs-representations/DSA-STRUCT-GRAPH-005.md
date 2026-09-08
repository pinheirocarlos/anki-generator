---
id: DSA-STRUCT-GRAPH-005
title: "Impacto da Representação de Grafos na Complexidade de BFS, DFS e Dijkstra"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::microsoft
  - freq::high
---

## Pergunta
Como a escolha entre Lista de Adjacência e Matriz de Adjacência altera a complexidade assintótica de **BFS, DFS e Dijkstra**?

## Resposta
### Quick Answer
**Solução Direta**:
- **BFS e DFS**:
  - *Com Lista de Adjacência*: $O(V + E)$ ótimo (visita cada nó e aresta uma única vez).
  - *Com Matriz de Adjacência*: $O(V^2)$ (para cada nó, precisa inspecionar todos os $V$ slots da linha).
- **Algoritmo de Dijkstra**:
  - *Com Min-Heap + Lista*: $O((V + E) \log V)$ ótimo para grafos esparsos.
  - *Com Array + Matriz*: $O(V^2)$ ótimo para grafos densos onde $E \approx V^2$ (pois $(V + V^2) \log V > V^2$).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Complexidade Assintótica: Lista de Adjacência vs Matriz de Adjacência</text>
  
  <g transform="translate(45, 45)">
    <!-- Coluna Lista -->
    <rect x="0" y="0" width="280" height="100" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Com Lista de Adjacência</text>
    <text x="15" y="44" fill="#f8fafc" font-size="10">• BFS / DFS: <tspan fill="#34d399" font-weight="bold">O(V + E)</tspan> (visita nós e arestas 1x)</text>
    <text x="15" y="64" fill="#f8fafc" font-size="10">• Dijkstra (Min-Heap): <tspan fill="#34d399" font-weight="bold">O((V + E) log V)</tspan></text>
    <text x="15" y="84" fill="#94a3b8" font-size="10">• Eficiência máxima para grafos esparsos</text>

    <!-- Coluna Matriz -->
    <g transform="translate(310, 0)">
      <rect x="0" y="0" width="280" height="100" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
      <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Com Matriz de Adjacência</text>
      <text x="15" y="44" fill="#f8fafc" font-size="10">• BFS / DFS: <tspan fill="#ef4444" font-weight="bold">O(V²)</tspan> (varre V colunas por nó)</text>
      <text x="15" y="64" fill="#f8fafc" font-size="10">• Dijkstra (Array): <tspan fill="#fbbf24" font-weight="bold">O(V²)</tspan> (ótimo se E ≈ V²)</text>
      <text x="15" y="84" fill="#94a3b8" font-size="10">• Ineficiente se E ≪ V² (tempo ocioso em zeros)</text>
    </g>
  </g>

  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Em entrevistas FAANG: declare O(V + E) como padrão, assumindo sempre representação por lista</text>
</svg>

<p>Visualização: Comparação assintótica de algoritmos de travessia e menor caminho em listas de adjacência versus matrizes.</p>

| Algoritmo | Complexidade (Lista de Adjacência) | Complexidade (Matriz de Adjacência) |
|---|---|---|
| **BFS / DFS** | $O(V + E)$ | $O(V^2)$ |
| **Dijkstra** | $O((V + E) \log V)$ | $O(V^2)$ |
| **Prim (MST)** | $O((V + E) \log V)$ | $O(V^2)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de algoritmos, sempre declare explicitamente a complexidade baseada em Lista de Adjacência ($O(V + E)$) a menos que o problema especifique uma matriz densa.

</details>
