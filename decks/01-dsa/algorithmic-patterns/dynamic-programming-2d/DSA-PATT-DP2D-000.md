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
| Problema de Grade | Origem dos Subproblemas | Função de Agregação |
|---|---|---|
| **Unique Paths** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Soma ($+$) |
| **Minimum Path Sum** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Célula $+$ Mínimo ($\min$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- As bordas da matriz (linha 0 e coluna 0) formam os casos base, pois só possuem uma direção de entrada possível.

</details>
