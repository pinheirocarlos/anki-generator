---
id: DSA-PATT-MONOSTACK-005
title: "Constrained Subsequence Sum (LeetCode 1425) com DP Acelerada por Monotonic Deque"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::apple
  - freq::high
---

## Pergunta
Como um **Monotonic Deque** acelera a transição de DP $DP[i] = nums[i] + \max_{i-K \le j < i} (0, DP[j])$ de $O(N \cdot K)$ para $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em **Constrained Subsequence Sum**, a transição de DP busca o valor máximo de $DP[j]$ nos últimos $K$ índices anteriores.
- Uma busca linear nos últimos $K$ termos resultaria em $O(N \cdot K)$ (inviável para $N, K = 10^5$).
- **Monotonic Deque ($O(N)$)**:
  - Mantemos um Deque monótono decrescente com os valores de $DP$:
    - Remove índices expirados: `deque.peekFirst() < i - K`.
    - $DP[i] = nums[i] + \max(0, DP[\text{deque.peekFirst()}])$.
    - Mantém ordem decrescente no deque removendo elementos do fim menores que $DP[i]$.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Shortest Subarray with Sum at Least K (Monotonic Deque + Prefix Sums)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Suporte a Números Negativos no Array</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Calcula vetor de somas prefixas P[i]. Mantém Deque de índices com P[i] estritamente crescente.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Enquanto P[i] - P[deque.front()] &gt;= K: min_len = min(min_len, i - deque.pop_front()).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Supera a limitação de Two Pointers para arrays com valores negativos em O(N)</text>

</svg>

| Abordagem de DP | Busca do Máximo nos Últimos $K$ | Complexidade Total |
|---|---|---|
| **Varredura Linear de Janela** | Varre $K$ posições | $O(N \cdot K)$ TLE |
| **DP + Monotonic Deque** | Consulta instantânea em `peekFirst` | $O(N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas mais avançadas para otimização de janelas deslizantes em equações de Programação Dinâmica.

</details>
