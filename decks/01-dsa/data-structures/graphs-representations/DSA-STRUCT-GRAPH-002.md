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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de Adjacência: Consulta O(1) e Custo Espacial O(V²)</text>
  
  <g transform="translate(70, 45)">
    <!-- Grafo de 4 nós -->
    <g transform="translate(20, 10)">
      <circle cx="30" cy="20" r="14" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
      <text x="30" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">0</text>

      <line x1="44" y1="20" x2="106" y2="20" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="120" cy="20" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="120" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">1</text>

      <line x1="30" y1="34" x2="30" y2="76" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="30" cy="90" r="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="30" y="94" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">2</text>

      <line x1="44" y1="90" x2="106" y2="34" stroke="#a855f7" stroke-width="2"/>
      <circle cx="120" cy="90" r="14" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
      <text x="120" y="94" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">3</text>
      <line x1="120" y1="34" x2="120" y2="76" stroke="#10b981" stroke-width="2"/>
    </g>

    <!-- Matriz bidimensional -->
    <g transform="translate(250, 0)">
      <rect x="0" y="0" width="270" height="105" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
      <text x="135" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Matriz adj[4][4] (Memória Contígua)</text>
      <text x="35" y="40" fill="#94a3b8" font-size="10" font-family="monospace">idx   0  1  2  3</text>
      <text x="35" y="55" fill="#f8fafc" font-size="10" font-family="monospace">0:  [ 0, 1, 1, 0 ]</text>
      <text x="35" y="70" fill="#f8fafc" font-size="10" font-family="monospace">1:  [ 1, 0, 1, 1 ]</text>
      <text x="35" y="85" fill="#f8fafc" font-size="10" font-family="monospace">2:  [ 1, 1, 0, 0 ]</text>
      <text x="35" y="100" fill="#f8fafc" font-size="10" font-family="monospace">3:  [ 0, 1, 0, 0 ]</text>
    </g>
  </g>

  <text x="340" y="175" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">hasEdge(u, v) é O(1) direto na célula; iterar vizinhos de u exige varrer toda a linha O(V)</text>
</svg>

<p>Visualização: Matriz de adjacência bidimensional com consulta direta de arestas em tempo O(1) e custo espacial quadrático O(V²).</p>

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
