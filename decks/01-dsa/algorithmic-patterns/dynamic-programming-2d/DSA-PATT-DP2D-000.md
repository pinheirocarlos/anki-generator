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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de DP 2D: Grid de Estados dp[i][j]</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Definição Bidimensional</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">i: índice do item / prefixo da string 1</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">j: capacidade restante / prefixo da string 2</text>

    <g transform="translate(260, 0)">
      <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Ordem de Preenchimento</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Linha por linha (Top → Bottom)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Garante que dp[i-1][j] já está calculado</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base para problemas de Mochila, LCS, Distância de Edição e Caminhos em Grid</text>

</svg>

| Problema de Grade | Origem dos Subproblemas | Função de Agregação |
|---|---|---|
| **Unique Paths** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Soma ($+$) |
| **Minimum Path Sum** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Célula $+$ Mínimo ($\min$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- As bordas da matriz (linha 0 e coluna 0) formam os casos base, pois só possuem uma direção de entrada possível.

</details>
