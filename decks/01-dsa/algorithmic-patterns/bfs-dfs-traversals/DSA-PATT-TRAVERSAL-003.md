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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dfs-tri-color-cycle-detection-loop.webm">
    <p>Visualização: Marcação tri-color (Branco=Não visitado, Cinza=Na pilha de recursão, Preto=Concluído) detectando back-edges.</p>
  </video>
</div>

| Formato da Árvore | Consumo de Memória (BFS vs DFS) | Escolha Ideal |
|---|---|---|
| **Balanceada** | BFS: $O(N)$ / DFS: $O(log N)$ | DFS economiza RAM |
| **Profunda ($H approx N$)** | BFS: $O(1)$ / DFS: $O(N)$ | BFS evita StackOverflow |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de System Design e Algoritmos, a decisão entre BFS e DFS deve ser fundamentada pelo formato geométrico esperado da árvore de estados (largura vs profundidade).

</details>
