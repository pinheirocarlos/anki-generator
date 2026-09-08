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

  <text x="340" y="26" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Fenwick Tree 2D: Inclusão-Exclusão e Loops Aninhados de LSB</text>

  <!-- Left: 2D Grid Visual -->
  <g transform="translate(60, 45)">
    <!-- Outer rectangle representing matrix Q(r2, c2) -->
    <rect x="0" y="0" width="180" height="110" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
    
    <!-- Excluded top part: Q(r1-1, c2) -->
    <rect x="0" y="0" width="180" height="35" fill="#7f1d1d" fill-opacity="0.6" stroke="#ef4444" rx="2"/>
    <text x="90" y="22" fill="#fca5a5" font-size="9" text-anchor="middle">- Q(r1-1, c2)</text>

    <!-- Excluded left part: Q(r2, c1-1) -->
    <rect x="0" y="0" width="55" height="110" fill="#7f1d1d" fill-opacity="0.6" stroke="#ef4444" rx="2"/>
    <text x="27" y="75" fill="#fca5a5" font-size="9" text-anchor="middle">- Q(r2, c1-1)</text>

    <!-- Double subtracted top-left corner: + Q(r1-1, c1-1) -->
    <rect x="0" y="0" width="55" height="35" fill="#065f46" stroke="#10b981" rx="2"/>
    <text x="27" y="22" fill="#6ee7b7" font-size="8" font-weight="bold" text-anchor="middle">+ Q(int)</text>

    <!-- Target Submatrix -->
    <rect x="55" y="35" width="125" height="75" fill="#047857" fill-opacity="0.7" stroke="#10b981" stroke-width="2" rx="2"/>
    <text x="117" y="77" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Submatriz Alvo [r1..r2, c1..c2]</text>
  </g>

  <!-- Right: Bitwise Nested Loops -->
  <g transform="translate(280, 45)">
    <rect x="0" y="0" width="340" height="110" fill="#1e293b" stroke="#38bdf8" rx="6"/>
    <text x="170" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Estrutura de Loops Bitwise Aninhados</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">update(r, c, delta):</text>
    <text x="25" y="62" fill="#93c5fd" font-size="10">for (; r ≤ N; r += r &amp; -r) for (; c ≤ M; c += c &amp; -c)</text>
    <text x="15" y="82" fill="#f8fafc" font-size="10">query(r, c):</text>
    <text x="25" y="98" fill="#93c5fd" font-size="10">for (; r &gt; 0; r -= r &amp; -r) for (; c &gt; 0; c -= c &amp; -c)</text>
  </g>

  <text x="340" y="180" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Consulta e Atualização 2D executam em estritos O(log N · log M) passos</text>
</svg>

<p>Visualização: Matriz Fenwick Tree 2D com atualização aninhada de LSB e princípio de inclusão-exclusão.</p>

| Operação 2D | Abordagem Força Bruta | Fenwick Tree 2D |
|---|---|---|
| **Update Pontual Matriz** | $O(1)$ | $O(\log N \log M)$ |
| **Consulta Submatriz** | $O(N \times M)$ | $O(\log N \log M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A Fenwick Tree 2D é a solução mais elegante para o problema *Range Sum Query 2D - Mutable* (LeetCode 308).

</details>
