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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">BFS Bidirecional: Redução Exponencial do Espaço O(B^d) → O(B^(d/2))</text>

  <!-- Origem -->
  <g transform="translate(60, 45)">
    <circle cx="60" cy="50" r="42" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="60" cy="50" r="26" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="60" cy="50" r="10" fill="#3b82f6"/>
    <text x="60" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">S</text>
    <text x="60" y="110" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Origem (Raio d/2)</text>
  </g>

  <!-- Interseção -->
  <g transform="translate(310, 75)">
    <rect x="0" y="0" width="60" height="40" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
    <text x="30" y="18" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Encontro</text>
    <text x="30" y="32" fill="#fef3c7" font-size="9" text-anchor="middle">Fronteiras</text>
    <!-- Linhas conectando -->
    <line x1="-30" y1="20" x2="-2" y2="20" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2,2"/>
    <line x1="62" y1="20" x2="90" y2="20" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2,2"/>
  </g>

  <!-- Destino -->
  <g transform="translate(440, 45)">
    <circle cx="120" cy="50" r="42" fill="#1e293b" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="120" cy="50" r="26" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <circle cx="120" cy="50" r="10" fill="#10b981"/>
    <text x="120" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">T</text>
    <text x="120" y="110" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Destino (Raio d/2)</text>
  </g>

  <text x="340" y="175" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Para B=10 e d=6: BFS Tradicional visita 1.000.000 nós; Bidirecional visita apenas 2.000 nós</text>
</svg>
<p>Visualização: Busca em largura bidirecional expandindo simultaneamente de origem e destino até a colisão de fronteiras no meio.</p>

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
