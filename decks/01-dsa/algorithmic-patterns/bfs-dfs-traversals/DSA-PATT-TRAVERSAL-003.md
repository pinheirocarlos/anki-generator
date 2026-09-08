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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Consumo de Memória: BFS Fila O(W) vs DFS Pilha O(H)</text>

  <!-- Painel BFS -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="280" height="110" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="140" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">BFS: Fila FIFO O(W) — Largura</text>
    <text x="20" y="46" fill="#94a3b8" font-size="11">• Árvore balanceada com N nós:</text>
    <text x="30" y="66" fill="#f87171" font-size="11" font-weight="bold">Último nível W = N / 2 nós na fila</text>
    <text x="20" y="88" fill="#94a3b8" font-size="10">Exige O(2^H) de RAM (Crítico em ramos largos)</text>
  </g>

  <!-- Painel DFS -->
  <g transform="translate(360, 45)">
    <rect x="0" y="0" width="280" height="110" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="140" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">DFS: Pilha Call Stack O(H) — Altura</text>
    <text x="20" y="46" fill="#94a3b8" font-size="11">• Árvore balanceada com N nós:</text>
    <text x="30" y="66" fill="#34d399" font-size="11" font-weight="bold">Pilha retém apenas o caminho ativo: O(log N)</text>
    <text x="20" y="88" fill="#94a3b8" font-size="10">Pior caso (degenerada em lista linear): O(N)</text>
  </g>

  <text x="340" y="178" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Regra de Ouro: Árvore larga ➔ DFS poupa memória; Solução próxima da raiz ➔ BFS poupa tempo</text>
</svg>
<p>Visualização: Trade-offs de memória: BFS armazena a largura máxima O(W) na fila FIFO, enquanto DFS retém apenas a altura do ramo O(H) na pilha de recursão.</p>

| Formato da Árvore | Consumo de Memória (BFS vs DFS) | Escolha Ideal |
|---|---|---|
| **Balanceada** | BFS: $O(N)$ / DFS: $O(log N)$ | DFS economiza RAM |
| **Profunda ($H approx N$)** | BFS: $O(1)$ / DFS: $O(N)$ | BFS evita StackOverflow |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de System Design e Algoritmos, a decisão entre BFS e DFS deve ser fundamentada pelo formato geométrico esperado da árvore de estados (largura vs profundidade).

</details>
