---
id: DSA-PATT-DP2D-000
title: "Modelagem de DP 2D em Matrizes de Grade (Unique Paths e Minimum Path Sum)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::meta
  - freq::high
---

## Pergunta
Como modelar a função de transição de estados de uma DP 2D em matrizes de grade para problemas como **Unique Paths** e **Minimum Path Sum**?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[r][c]$ como a métrica acumulada até a célula $(r, c)$.
- Como o movimento é restrito para a **direita** e para **baixo**, qualquer caminho até $(r, c)$ vem obrigatoriamente da célula de cima $(r-1, c)$ ou da esquerda $(r, c-1)$:
  - **Unique Paths (Contagem de Caminhos)**:
    $$DP[r][c] = DP[r-1][c] + DP[r][c-1]$$
  - **Minimum Path Sum (Caminho de Menor Custo)**:
    $$DP[r][c] = \text{grid}[r][c] + \min(DP[r-1][c], \ DP[r][c-1])$$
- **Complexidade**: $O(M \times N)$ tempo e $O(M \times N)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de DP 2D em Grade: dp[i][j] = dp[i-1][j] + dp[i][j-1]</text>
  <g transform="translate(160, 50)">
    <rect x="0" y="0" width="80" height="40" fill="#1e293b" stroke="#64748b" rx="4"/>
    <text x="40" y="25" fill="#cbd5e1" font-size="11" text-anchor="middle">dp[i-1][j]</text>

    <text x="40" y="65" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">↓</text>

    <rect x="100" y="0" width="80" height="40" fill="#1e293b" stroke="#64748b" rx="4"/>
    <text x="140" y="25" fill="#cbd5e1" font-size="11" text-anchor="middle">dp[i][j-1]</text>

    <text x="100" y="65" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">→</text>

    <rect x="120" y="45" width="120" height="45" fill="#047857" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="180" y="68" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">dp[i][j] (Destino)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fluxo acíclico da esquerda para a direita e de cima para baixo em tempo O(M × N)</text>
</svg>
<p>Visualização: Matriz de DP em grade 2D agregando caminhos válidos a partir das células superior e esquerda.</p>
| Problema de Grade | Origem dos Subproblemas | Função de Agregação |
|---|---|---|
| **Unique Paths** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Soma ($+$) |
| **Minimum Path Sum** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Célula $+$ Mínimo ($\min$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- As bordas da matriz (linha 0 e coluna 0) formam os casos base, pois só possuem uma direção de entrada possível.

</details>
