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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">0/1 Knapsack: dp[i][w] = max(dp[i-1][w], dp[i-1][w - wt[i]] + val[i])</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Decisão Binária de Inclusão vs Exclusão</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Excluir item i: preserva o valor da linha anterior dp[i-1][w].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Incluir item i: soma val[i] ao valor com peso reduzido dp[i-1][w - wt[i]].</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo: O(N × W) pseudo-polinomial | Espaço: O(N × W) reduzível para O(W) 1D reverso</text>
</svg>
<p>Visualização: Tabela 2D da Mochila 0/1 comparando a inclusão do item i com capacidade residual versus a exclusão do item.</p>
| Tipo de Mochila | Ordem de Iteração da Capacidade $w$ | Reutilização de Itens |
|---|---|---|
| **0/1 Knapsack** | **Decrescente** ($W \to \text{wt}[i]$) | Cada item usado no máximo 1 vez |
| **Unbounded Knapsack** | **Crescente** ($\text{wt}[i] \to W$) | Itens infinitos reutilizáveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A direção do loop interno (crescente vs decrescente) é a diferença fundamental entre Mochila Não-Limitada e Mochila 0/1.

</details>
