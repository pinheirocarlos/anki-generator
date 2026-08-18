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
| Abordagem de Transição | Custo por Estado | Complexidade Total |
|---|---|---|
| **DP Quadrática Padrão** | Varre todos os $j < i$ | $O(N^2)$ |
| **Convex Hull Trick (CHT)** | Consulta no invólucro convexo | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas avançadas mais elegantes de otimização geométrica em programação dinâmica.

</details>
