---
id: DSA-STRUCT-ADVTREE-004
title: "Fenwick Tree 2D para Consultas e Atualizações em Matrizes Dinâmicas"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::meta
  - freq::high
---

## Pergunta
Como estender a Fenwick Tree para uma **matriz bidimensional 2D** com consultas e atualizações de submatrizes em $O(\log N \cdot \log M)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Fenwick Tree 2D** aninha dois loops de LSB sobre uma matriz $T[N+1][M+1]$:
  - **`update(row, col, delta)`**: Executa o loop externo em `row += row & (-row)` e, para cada linha, executa o loop interno em `col += col & (-col)` ($O(\log N \cdot \log M)$).
  - **`query(row, col)`**: Soma os acumulados decrescendo `row -= row & (-row)` e `col -= col & (-col)`.
- Para obter a soma de uma submatriz $[r_1, c_1]$ a $[r_2, c_2]$, aplica-se o Princípio da Inclusão-Exclusão 2D:
  $$\text{soma} = Q(r_2, c_2) - Q(r_1-1, c_2) - Q(r_2, c_1-1) + Q(r_1-1, c_1-1)$$

### Dual Coding Visual
| Operação 2D | Abordagem Força Bruta | Fenwick Tree 2D |
|---|---|---|
| **Update Pontual Matriz** | $O(1)$ | $O(\log N \log M)$ |
| **Consulta Submatriz** | $O(N \times M)$ | $O(\log N \log M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A Fenwick Tree 2D é a solução mais elegante para o problema *Range Sum Query 2D - Mutable* (LeetCode 308).

</details>
