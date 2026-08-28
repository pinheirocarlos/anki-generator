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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Minimax Path: Aresta Gargalo na Árvore Geradora Mínima</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Minimiza o Peso Máximo de Aresta entre Qualquer Par de Nós</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">O caminho único entre u e v dentro da MST minimiza a maior aresta ao longo do percurso.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Consulta de menor aresta gargalo respondida em O(log V) com Binary Lifting / LCA.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Aplicações em redes de telecomunicação para garantir largura de banda mínima de tráfego</text>

</svg>

| Abordagem no LeetCode 1584 | Complexidade de Tempo | Espaço de Memória |
|---|---|---|
| **Kruskal (Gera todas as arestas)** | $O(N^2 \log N)$ | $O(N^2)$ para $N^2$ arestas |
| **Prim Otimizado (Array plano)** | $O(N^2)$ | $O(N)$ Mínimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em grafos completos implícitos, Prim com array evita alocar milhões de objetos de aresta no Heap.

</details>
