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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/mst-cut-property-proof-loop.webm">
    <p>Visualização: A aresta de menor peso que cruza qualquer corte entre dois conjuntos de vértices pertence obrigatoriamente à MST.</p>
  </video>
</div>

| Densidade do Grafo | Algoritmo Recomendado | Complexidade Assintótica |
|---|---|---|
| **Esparso ($E \approx V$)** | Kruskal com DSU | $O(E \log E)$ |
| **Denso ($E \approx V^2$)** | Prim com Matriz | $O(V^2)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Prim sem Heap (apenas com array de distâncias mínimas) roda em estritos $O(V^2)$ sem custo de logaritmo em grafos completos.

</details>
