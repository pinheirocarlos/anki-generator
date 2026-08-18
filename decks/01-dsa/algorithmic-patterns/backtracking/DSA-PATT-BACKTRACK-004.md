---
id: DSA-PATT-BACKTRACK-004
title: "Sudoku Solver com Poda Rigorosa por Linhas, Colunas e Caixas 3x3"
tags:
  - level::l4-pleno
  - topic::dsa::backtracking
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de Backtracking para **Sudoku Solver** (LeetCode 37) valida números em tempo $O(1)$ com a fórmula de caixas $(r/3) \times 3 + (c/3)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos matrizes booleanas ou bitmasks de dígitos $[0..9]$ para:
  - `rows[9][10]`: Dígitos presentes em cada linha.
  - `cols[9][10]`: Dígitos presentes em cada coluna.
  - `boxes[9][10]`: Dígitos presentes em cada uma das 9 subcaixas $3 \times 3$.
- O índice da caixa $3 \times 3$ correspondente à célula $(r, c)$ é calculado por:
  $$\text{boxId} = \left(\frac{r}{3}\right) \times 3 + \left(\frac{c}{3}\right)$$
- Ao tentar colocar o dígito $d$ em $(r, c)$: testa `!rows[r][d] && !cols[c][d] && !boxes[boxId][d]` em $O(1)$. Se válido, marca as 3 matrizes e avança recursivamente.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/sudoku-solver-backtracking-grid-loop.webm">
    <p>Visualização: Tentativa de dígitos de 1 a 9 com validação em linha, coluna e bloco 3x3 com backtracking nas falhas.</p>
  </video>
</div>

| Restrição de Sudoku | Estrutura de Validação | Fórmula de Índice |
|---|---|---|
| **Linha** | `rows[r][d]` | $r \in [0, 8]$ |
| **Coluna** | `cols[c][d]` | $c \in [0, 8]$ |
| **Caixa $3 \times 3$** | `boxes[boxId][d]` | $(r/3) \times 3 + (c/3)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Retornar um booleano (`true` assim que o primeiro tabuleiro completo for preenchido) interrompe imediatamente a recursão e evita continuar a busca.

</details>
