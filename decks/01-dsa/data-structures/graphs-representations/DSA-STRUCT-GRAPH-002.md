---
id: DSA-STRUCT-GRAPH-002
title: "Representação de Grafos por Matriz de Adjacência: Vantagens e Custo O(V²)"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::google
  - freq::high
---

## Pergunta
Como funciona a representação de grafos por **Matriz de Adjacência** e quais suas características de complexidade?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Matriz de Adjacência** é uma matriz bidimensional $M$ de tamanho $V \times V$:
  - $M[u][v] = 1$ (ou peso $w$) se existe uma aresta conectando $u$ a $v$.
  - $M[u][v] = 0$ se não há aresta.
- **Vantagens**: Consulta instantânea $O(1)$ para verificar se dois vértices são adjacentes (`hasEdge(u, v)`).
- **Desvantagens**: Espaço de memória fixo quadrático $O(V^2)$ e iteração sobre vizinhos de um vértice custa sempre $O(V)$, mesmo em grafos esparsos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafos Direcionados vs Não-Direcionados (In-Degree &amp; Out-Degree)</text>
  <g transform="translate(80, 50)">
    <!-- Directed -->
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Direcionado (Arestas com Seta)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">In-Degree: arestas que chegam ao nó</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Out-Degree: arestas que saem do nó</text>

    <!-- Undirected -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Não-Direcionado (Simétrico)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Aresta (u, v) implica (v, u)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Grau total = Σ vizinhos conectados</text>
    </g>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">In-Degree == 0 é a condição inicial de Kahn para Ordenação Topológica</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafos Direcionados vs Não-Direcionados (In-Degree &amp; Out-Degree)</text>
  <g transform="translate(80, 50)">
    <!-- Directed -->
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Direcionado (Arestas com Seta)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">In-Degree: arestas que chegam ao nó</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Out-Degree: arestas que saem do nó</text>

    <!-- Undirected -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Não-Direcionado (Simétrico)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Aresta (u, v) implica (v, u)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Grau total = Σ vizinhos conectados</text>
    </g>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">In-Degree == 0 é a condição inicial de Kahn para Ordenação Topológica</text>

</svg>

| Operação em Matriz | Complexidade | Observação |
|---|---|---|
| **Verificar Aresta $(u, v)$** | $O(1)$ Instantâneo | Acesso direto `M[u][v]` |
| **Listar Vizinhos de $u$** | $O(V)$ | Precisa varrer a linha inteira |
| **Consumo de Memória** | $O(V^2)$ | Proibitivo para $V > 10^5$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Matrizes de adjacência são indicadas apenas para grafos densos ($E \approx V^2$) ou quando $V$ é muito pequeno ($V \le 1000$).

</details>
