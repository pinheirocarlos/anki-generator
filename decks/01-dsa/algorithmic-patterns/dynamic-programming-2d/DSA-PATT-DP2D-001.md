---
id: DSA-PATT-DP2D-001
title: "Problema da Mochila 0/1 (0-1 Knapsack) com Restrição de Capacidade e Peso"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-2d
  - company::meta
  - freq::high
---

## Pergunta
Como formular a Programação Dinâmica do problema da **Mochila 0/1 (0-1 Knapsack)** e por que a otimização de espaço exige iteração reversa?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][w]$ como o valor máximo considerando os primeiros $i$ itens com capacidade $w$:
  $$DP[i][w] = \begin{cases} DP[i-1][w] & \text{se } \text{wt}[i-1] > w \\ \max(DP[i-1][w], \ DP[i-1][w - \text{wt}[i-1]] + \text{val}[i-1]) & \text{caso contrário} \end{cases}$$
- **Otimização para Array 1D**: Ao comprimir para um array `dp[w]`, devemos iterar a capacidade $w$ de forma **estritamente decrescente** (de $W$ até $\text{wt}[i]$). Isso garante que o valor $DP[w - \text{wt}[i]]$ consultado venha da linha anterior ($i-1$) e impeça que o mesmo item seja reutilizado mais de uma vez.

### Dual Coding Visual
| Tipo de Mochila | Ordem de Iteração da Capacidade $w$ | Reutilização de Itens |
|---|---|---|
| **0/1 Knapsack** | **Decrescente** ($W \to \text{wt}[i]$) | Cada item usado no máximo 1 vez |
| **Unbounded Knapsack** | **Crescente** ($\text{wt}[i] \to W$) | Itens infinitos reutilizáveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A direção do loop interno (crescente vs decrescente) é a diferença fundamental entre Mochila Não-Limitada e Mochila 0/1.

</details>
