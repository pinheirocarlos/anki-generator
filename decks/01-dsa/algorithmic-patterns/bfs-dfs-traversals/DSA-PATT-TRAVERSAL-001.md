---
id: DSA-PATT-TRAVERSAL-001
title: "BFS Bidirecional para Redução Exponencial de Espaço de Busca O(B^(d/2))"
tags:
  - level::l4-pleno
  - topic::dsa::bfs-dfs-traversals
  - company::google
  - freq::high
---

## Pergunta
Como a **BFS Bidirecional (Bidirectional BFS)** reduz a complexidade de espaço e tempo de $O(B^d)$ para $O(B^{d/2})$ em problemas de busca de caminhos (ex: Word Ladder)?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma BFS unidirecional padrão com fator de ramificação $B$ e distância $d$ explora uma árvore com $O(B^d)$ nós.
- A **BFS Bidirecional** dispara duas buscas simultâneas: uma a partir da origem (`beginSet`) e outra a partir do destino (`endSet`), expandindo sempre o conjunto de menor tamanho a cada rodada.
- As buscas se encontram na metade do caminho ($d/2$).
- O número total de nós visitados cai drasticamente para $2 \times O(B^{d/2}) = O(B^{d/2})$. Para $B=10$ e $d=6$, reduz de $1.000.000$ para apenas $2.000$ nós avaliados ($500\times$ mais rápido).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DFS (Depth-First Search): Exploração em Profundidade com Pilha/Recursão</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Mergulho até as Folhas com Backtracking</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Visita um ramo completo até o final antes de retroceder e explorar irmãos.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Espaço de memória proporcional à profundidade máxima: O(h), ideal para grafos profundos.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Base para detecção de ciclos, ordenação topológica e caminhos Eulerianos</text>

</svg>

| Técnica de BFS | Nós Avaliados ($B=10, d=6$) | Complexidade de Nós |
|---|---|---|
| **BFS Unidirecional** | $10^6 = 1.000.000$ nós | $O(B^d)$ |
| **BFS Bidirecional** | $2 \times 10^3 = 2.000$ nós | $O(B^{d/2})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Word Ladder (LeetCode 127)
A transição de BFS unidirecional para bidirecional transforma uma solução com tempo de execução de ~400ms em uma solução de ~15ms em Java.

#### Key Takeaways
- É aplicável sempre que o estado final exato for conhecido previamente (como no jogo do quebra-cabeça de 8 peças ou transformações de palavras).

</details>
