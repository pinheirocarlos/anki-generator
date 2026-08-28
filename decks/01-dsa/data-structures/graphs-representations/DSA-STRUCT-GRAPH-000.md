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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de Adjacência (Espaço O(V²), Consulta de Aresta O(1))</text>
  <g transform="translate(100, 50)">
    <!-- Small graph -->
    <circle cx="40" cy="20" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="40" y="24" fill="#fff" font-size="10" text-anchor="middle">0</text>
    <line x1="55" y1="20" x2="105" y2="20" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="120" cy="20" r="14" fill="#1e293b" stroke="#10b981"/><text x="120" y="24" fill="#fff" font-size="10" text-anchor="middle">1</text>
    <line x1="40" y1="35" x2="40" y2="65" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="40" cy="80" r="14" fill="#1e293b" stroke="#f59e0b"/><text x="40" y="84" fill="#fff" font-size="10" text-anchor="middle">2</text>

    <!-- Matrix -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="180" height="90" fill="#1e293b" stroke="#3b82f6" rx="4"/>
      <text x="90" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Matriz adj[3][3]</text>
      <text x="40" y="42" fill="#94a3b8" font-size="11" font-family="monospace">[ 0, 1, 1 ]</text>
      <text x="40" y="60" fill="#94a3b8" font-size="11" font-family="monospace">[ 1, 0, 0 ]</text>
      <text x="40" y="78" fill="#94a3b8" font-size="11" font-family="monospace">[ 1, 0, 0 ]</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">hasEdge(u, v) é O(1) instantâneo; inadequada para grafos esparsos devido a O(V²) de memória</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de Adjacência (Espaço O(V²), Consulta de Aresta O(1))</text>
  <g transform="translate(100, 50)">
    <!-- Small graph -->
    <circle cx="40" cy="20" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="40" y="24" fill="#fff" font-size="10" text-anchor="middle">0</text>
    <line x1="55" y1="20" x2="105" y2="20" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="120" cy="20" r="14" fill="#1e293b" stroke="#10b981"/><text x="120" y="24" fill="#fff" font-size="10" text-anchor="middle">1</text>
    <line x1="40" y1="35" x2="40" y2="65" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="40" cy="80" r="14" fill="#1e293b" stroke="#f59e0b"/><text x="40" y="84" fill="#fff" font-size="10" text-anchor="middle">2</text>

    <!-- Matrix -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="180" height="90" fill="#1e293b" stroke="#3b82f6" rx="4"/>
      <text x="90" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Matriz adj[3][3]</text>
      <text x="40" y="42" fill="#94a3b8" font-size="11" font-family="monospace">[ 0, 1, 1 ]</text>
      <text x="40" y="60" fill="#94a3b8" font-size="11" font-family="monospace">[ 1, 0, 0 ]</text>
      <text x="40" y="78" fill="#94a3b8" font-size="11" font-family="monospace">[ 1, 0, 0 ]</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">hasEdge(u, v) é O(1) instantâneo; inadequada para grafos esparsos devido a O(V²) de memória</text>

</svg>

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
