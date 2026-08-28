---
id: DSA-PATT-TRAVERSAL-003
title: "Trade-offs de Memória: BFS O(W) (Largura Máxima) vs DFS O(H) (Profundidade)"
tags:
  - level::l3-junior
  - topic::dsa::bfs-dfs-traversals
  - company::amazon
  - freq::high
---

## Pergunta
Quais os trade-offs de consumo de memória entre BFS ($O(W)$ largura máxima) e DFS ($O(H)$ altura máxima)?

## Resposta
### Quick Answer
**Solução Direta**:
- **BFS**: Mantém na fila todos os nós do nível mais largo da árvore/grafo ($O(W)$). Em uma árvore binária cheia, o último nível contém $W = N/2$ nós folha, consumindo **$O(N)$ massivo de memória**.
- **DFS**: Mantém na pilha apenas os nós do caminho atual da raiz até a folha ($O(H)$). Em uma árvore balanceada, a altura é $H = O(\log N)$, consumindo **memória mínima de pilha**.
- Em grafos muito largos e rasos, DFS consome muito menos memória; em grafos profundos e estreitos, a BFS é mais estável contra StackOverflow.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Componentes Conexos (Flood Fill / Number of Islands)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Varredura de Matriz 2D com Marcação de Visitados</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para cada célula '1' (terra): incrementa contador de ilhas e dispara DFS/BFS.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Substitui '1' por '0' in-place para eliminar necessidade de matriz 'visited' separada.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tempo total: O(M × N) — Cada célula é processada no máximo 4 vezes (4 direções)</text>

</svg>

| Formato da Árvore | Consumo de Memória (BFS vs DFS) | Escolha Ideal |
|---|---|---|
| **Balanceada** | BFS: $O(N)$ / DFS: $O(log N)$ | DFS economiza RAM |
| **Profunda ($H approx N$)** | BFS: $O(1)$ / DFS: $O(N)$ | BFS evita StackOverflow |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de System Design e Algoritmos, a decisão entre BFS e DFS deve ser fundamentada pelo formato geométrico esperado da árvore de estados (largura vs profundidade).

</details>
