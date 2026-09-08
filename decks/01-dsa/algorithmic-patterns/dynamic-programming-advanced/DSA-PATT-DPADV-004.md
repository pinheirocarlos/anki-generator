---
id: DSA-PATT-DPADV-004
title: "Otimização Convex Hull Trick (CHT) para DP Quadrática em Tempo O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-advanced
  - company::meta
  - freq::high
---

## Pergunta
Como a **Otimização Convex Hull Trick (CHT)** reduz a complexidade de transições de DP da forma $DP[i] = \min_j (DP[j] + m_j x_i + c_j)$ de $O(N^2)$ para $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em recorrências onde a transição tem formato de equação de reta linear $y = m_j x + c_j$:
  - Cada estado $j$ anterior define uma reta com inclinação $m_j$ e intercepto $c_j = DP[j]$.
  - O cálculo de $DP[i]$ corresponde a encontrar o valor mínimo entre todas as retas avaliadas no ponto $x = x_i$.
- **Convex Hull Trick**: Mantém o invólucro convexo inferior (*Lower Convex Hull*) dessas retas em um Deque:
  - Retas que se tornam matematicamente redundantes são eliminadas em $O(1)$ amortizado.
  - A consulta do ponto ótimo executa em $O(1)$ com dois ponteiros (se as inclinações forem monotônicas).
- **Complexidade**: Reduz de $O(N^2)$ para **$O(N)$ linear**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Convex Hull Trick (CHT): Otimização de DP de O(N²) → O(N log N) / O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Invólucro Convexo de Retas: y = m_j · x + c_j</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Transição de DP no formato dp[i] = min_{j &lt; i} (m_j · x_i + c_j).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Descarta retas dominadas mantendo apenas o casco convexo com deque ou busca binária.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Reduz transições quadráticas pesadas para tempo linear amortizado O(1) por consulta</text>
</svg>
<p>Visualização: Otimização Convex Hull Trick mantendo o invólucro de retas para encontrar o mínimo em tempo amortizado O(1).</p>
| Abordagem de Transição | Custo por Estado | Complexidade Total |
|---|---|---|
| **DP Quadrática Padrão** | Varre todos os $j < i$ | $O(N^2)$ |
| **Convex Hull Trick (CHT)** | Consulta no invólucro convexo | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas avançadas mais elegantes de otimização geométrica em programação dinâmica.

</details>
