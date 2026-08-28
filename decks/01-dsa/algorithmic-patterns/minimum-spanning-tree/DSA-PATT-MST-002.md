---
id: DSA-PATT-MST-002
title: "Algoritmo de Kruskal: Abordagem Orientada a Arestas com DSU em O(E log E)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kruskal** constrói a MST ordenando arestas e utilizando DSU em tempo $O(E \log E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Algoritmo de Kruskal opera sob perspectiva de arestas globais:
  1. Ordena todas as $E$ arestas em ordem crescente de peso ($O(E \log E)$).
  2. Inicializa um DSU com $V$ conjuntos disjuntos.
  3. Itera sobre as arestas ordenadas: se os extremos da aresta pertencem a componentes diferentes (`dsu.union(u, v) == true`), adiciona a aresta à MST.
  4. Encerra ao acumular $V - 1$ arestas.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Prim: Crescimento de Vértice com Min-Heap em O((V + E) log V)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Abordagem Baseada em Vértices (Crescimento de Árvore Conexa)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Inicia em um vértice arbitrário e adiciona suas arestas a um Min-Heap.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">A cada passo, extrai a aresta mais leve conectando a árvore a um nó não-visitado.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Estrutura idêntica ao Dijkstra; superior a Kruskal em grafos densos (com Fibonacci Heap O(E + V log V))</text>

</svg>

| Passo de Kruskal | Estrutura Envolvida | Complexidade |
|---|---|---|
| **1. Ordenação Global** | `Arrays.sort(edges)` | $O(E \log E)$ |
| **2. Teste e Fusão** | $E$ chamadas no DSU | $O(E \cdot \alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É extremamente simples de implementar e altamente eficiente para grafos esparsos ($E \approx V$).

</details>
