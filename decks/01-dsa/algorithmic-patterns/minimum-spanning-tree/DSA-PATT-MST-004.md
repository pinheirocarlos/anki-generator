---
id: DSA-PATT-MST-004
title: "Modelagem de Redes de Menor Custo com MST (Min Cost to Connect All Points)"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::meta
  - freq::high
---

## Pergunta
Como modelar o problema **Min Cost to Connect All Points** (LeetCode 1584) como uma MST sobre distâncias de Manhattan?

## Resposta
### Quick Answer
**Solução Direta**:
- Dados $N$ pontos 2D, o custo de conectar o ponto $i$ ao ponto $j$ é a distância de Manhattan:
  $$w(i, j) = |x_i - x_j| + |y_i - y_j|$$
- Modelamos um grafo completo não-direcionado ponderado com $V = N$ vértices e $E = \frac{N(N-1)}{2}$ arestas implícitas.
- Aplicando o **Algoritmo de Prim** com um array `minCost[]` de tamanho $N$:
  - A cada passo, seleciona o ponto fora da árvore com menor custo de conexão em $O(N)$ e atualiza as distâncias dos demais pontos.
- **Complexidade**: $O(N^2)$ tempo e $O(N)$ espaço auxiliar.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Min Cost to Connect All Points: Grafo Completo e Prim O(N²)</text>

  <!-- Pontos no Plano 2D -->
  <g transform="translate(60, 45)">
    <!-- Pontos com coordenadas -->
    <circle cx="30" cy="80" r="10" fill="#10b981"/>
    <text x="30" y="102" fill="#34d399" font-size="9" text-anchor="middle">(0,0)</text>

    <circle cx="70" cy="25" r="10" fill="#10b981"/>
    <text x="70" y="15" fill="#34d399" font-size="9" text-anchor="middle">(2,2)</text>

    <circle cx="160" cy="40" r="10" fill="#10b981"/>
    <text x="160" y="28" fill="#34d399" font-size="9" text-anchor="middle">(3,10)</text>

    <circle cx="180" cy="90" r="10" fill="#10b981"/>
    <text x="180" y="112" fill="#34d399" font-size="9" text-anchor="middle">(5,2)</text>

    <!-- Linhas Manhattan conectando -->
    <line x1="30" y1="80" x2="70" y2="25" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="50" fill="#a7f3d0" font-size="9">|Δx|+|Δy|=4</text>

    <line x1="70" y1="25" x2="180" y2="90" stroke="#10b981" stroke-width="2"/>
    <text x="130" y="70" fill="#a7f3d0" font-size="9">dist=9</text>

    <line x1="70" y1="25" x2="160" y2="40" stroke="#10b981" stroke-width="2"/>
    <text x="105" y="25" fill="#a7f3d0" font-size="9">dist=9</text>
  </g>

  <!-- Comparação Kruskal vs Prim -->
  <g transform="translate(290, 45)">
    <rect x="0" y="0" width="340" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="170" y="20" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Por que Prim com Array Plano O(N²) Supera Kruskal</text>
    <text x="15" y="42" fill="#f87171" font-size="10">• Kruskal: exige gerar todas as N² arestas ➔ O(N² log N) e O(N²) RAM.</text>
    <text x="15" y="62" fill="#34d399" font-size="10">• Prim Otimizado: sem Heap, apenas array minDist[N] atualizado linearmente.</text>
    <text x="15" y="82" fill="#fcd34d" font-size="10">• Tempo: O(N²) estrito | Espaço: O(N) mínimo (Economiza ~100MB em 1000 nós).</text>
  </g>

  <text x="340" y="175" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Em grafos densos onde E ≈ V², Prim O(V²) é assintoticamente superior a Kruskal O(E log E)</text>
</svg>
<p>Visualização: Conexão de menor custo entre pontos 2D em grafo completo: Prim com array O(V²) conecta todos os nós com distância Manhattan mínima.</p>

| Abordagem no LeetCode 1584 | Complexidade de Tempo | Espaço de Memória |
|---|---|---|
| **Kruskal (Gera todas as arestas)** | $O(N^2 \log N)$ | $O(N^2)$ para $N^2$ arestas |
| **Prim Otimizado (Array plano)** | $O(N^2)$ | $O(N)$ Mínimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em grafos completos implícitos, Prim com array evita alocar milhões de objetos de aresta no Heap.

</details>
