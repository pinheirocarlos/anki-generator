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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sudoku Solver: Validação de Linha, Coluna e Bloco 3x3</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Mapeamento de Sub-Grade 3x3: box_idx = (r/3)*3 + (c/3)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Rastreia dígitos 1-9 com máscaras de bits: rows[r], cols[c], boxes[box_idx].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Tenta dígitos válidos em células vazias; se travar, desfaz a escrita e retrocede.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante preenchimento determinístico de qualquer grade 9x9 válida em milissegundos</text>

</svg>

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
