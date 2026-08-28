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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">BFS Multi-Fonte (Multi-Source BFS): Propagação Simultânea</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Inicialização da Fila com Múltiplos Pontos de Partida</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Enfileira todas as fontes iniciais (ex: laranjas podres, focos de incêndio) com dist = 0.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">A propagação em ondas concêntricas calcula a menor distância de qualquer fonte em O(R × C).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Equivalente a criar um nó fantasma conectado a todas as fontes com peso 0</text>

</svg>

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
