---
id: DSA-PATT-MST-001
title: "Trade-offs de Escolha: Kruskal para Grafos Esparsos vs Prim para Grafos Densos"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::microsoft
  - freq::high
---

## Pergunta
Quais os critérios de escolha entre **Kruskal** e **Prim** com base na densidade de arestas do grafo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Grafo Esparso ($E \ll V^2$, ex: $E = O(V)$)**:
  - **Kruskal** é preferível: $O(E \log E) = O(E \log V)$, com constante muito rápida e estruturas simples (DSU + lista de arestas).
- **Grafo Denso ($E \approx V^2$)**:
  - **Prim com Matriz de Adjacência ($O(V^2)$)** supera Kruskal (que custaria $O(V^2 \log V^2) = O(V^2 \log V)$).
- Para problemas geométricos em 2D com $N$ pontos onde todas as $N^2$ conexões existem (*Min Cost to Connect All Points*), Prim com array plano é a solução mais rápida.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Kruskal: Ordenação de Arestas + DSU em O(E log E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Abordagem Baseada em Arestas</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena todas as E arestas por peso crescente.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">2. Para cada aresta (u, v): se find(u) != find(v) → union(u, v) e adiciona à MST.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Ideal para grafos esparsos (E ≈ V); para assim que V - 1 arestas forem incluídas</text>

</svg>

| Densidade do Grafo | Algoritmo Recomendado | Complexidade Assintótica |
|---|---|---|
| **Esparso ($E \approx V$)** | Kruskal com DSU | $O(E \log E)$ |
| **Denso ($E \approx V^2$)** | Prim com Matriz | $O(V^2)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Prim sem Heap (apenas com array de distâncias mínimas) roda em estritos $O(V^2)$ sem custo de logaritmo em grafos completos.

</details>
