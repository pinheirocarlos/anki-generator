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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Constrained Subsequence Sum (LeetCode 1425): DP + Monotonic Deque</text>
  
  <g transform="translate(45, 45)">
    <!-- DP Formula -->
    <rect x="0" y="0" width="240" height="115" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Equação de Recorrência DP:</text>
    <text x="15" y="48" fill="#f8fafc" font-size="10">DP[i] = nums[i] + max(0, max_DP)</text>
    <text x="15" y="70" fill="#fde68a" font-size="10">Onde max_DP = max(DP[j])</text>
    <text x="15" y="86" fill="#fde68a" font-size="10">para j ∈ [i - K, i - 1]</text>
    <text x="15" y="104" fill="#94a3b8" font-size="9">Linear scan = O(N × K) TLE</text>

    <!-- Arrow -->
    <path d="M 255 60 L 285 60" stroke="#f59e0b" stroke-width="2.5"/>

    <!-- Monotonic Deque Optimization -->
    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="290" height="115" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="145" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Otimização com Deque Monótono:</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">1. Remove índices expirados: j &lt; i - K</text>
      <text x="15" y="65" fill="#34d399" font-size="10" font-weight="bold">2. max_DP = DP[deque.peekFirst()] em O(1)</text>
      <text x="15" y="85" fill="#f8fafc" font-size="10">3. Remove do fim DP[last] &lt;= DP[i]</text>
      <text x="15" y="105" fill="#38bdf8" font-size="10">4. Adiciona i ao fim do Deque</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aceleração de O(N · K) para O(N) com consulta instantânea do máximo em O(1)</text>
</svg>

<p>Visualização: Transição de Programação Dinâmica acelerada por Monotonic Deque de O(N·K) para O(N).</p>


| Abordagem de DP | Busca do Máximo nos Últimos $K$ | Complexidade Total |
|---|---|---|
| **Varredura Linear de Janela** | Varre $K$ posições | $O(N \cdot K)$ TLE |
| **DP + Monotonic Deque** | Consulta instantânea em `peekFirst` | $O(N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas mais avançadas para otimização de janelas deslizantes em equações de Programação Dinâmica.

</details>
