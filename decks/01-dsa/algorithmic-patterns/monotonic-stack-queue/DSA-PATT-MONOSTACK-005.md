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
| Abordagem de DP | Busca do Máximo nos Últimos $K$ | Complexidade Total |
|---|---|---|
| **Varredura Linear de Janela** | Varre $K$ posições | $O(N \cdot K)$ TLE |
| **DP + Monotonic Deque** | Consulta instantânea em `peekFirst` | $O(N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas mais avançadas para otimização de janelas deslizantes em equações de Programação Dinâmica.

</details>
