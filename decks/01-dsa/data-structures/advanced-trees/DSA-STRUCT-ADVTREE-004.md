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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Splay Tree: Auto-Ajuste com Operação Splay Trazendo Nós à Raiz</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Princípio de Localidade Temporal (Zig-Zig &amp; Zig-Zag)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Todo nó acessado é promovido à raiz através de uma sequência de rotações duplas.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Custo amortizado de busca, inserção e deleção: O(log N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Ideal para caches de memória e alocadores onde certos nós são acessados frequentemente</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Splay Tree: Auto-Ajuste com Operação Splay Trazendo Nós à Raiz</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Princípio de Localidade Temporal (Zig-Zig &amp; Zig-Zag)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Todo nó acessado é promovido à raiz através de uma sequência de rotações duplas.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Custo amortizado de busca, inserção e deleção: O(log N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Ideal para caches de memória e alocadores onde certos nós são acessados frequentemente</text>

</svg>

| Operação 2D | Abordagem Força Bruta | Fenwick Tree 2D |
|---|---|---|
| **Update Pontual Matriz** | $O(1)$ | $O(\log N \log M)$ |
| **Consulta Submatriz** | $O(N \times M)$ | $O(\log N \log M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A Fenwick Tree 2D é a solução mais elegante para o problema *Range Sum Query 2D - Mutable* (LeetCode 308).

</details>
