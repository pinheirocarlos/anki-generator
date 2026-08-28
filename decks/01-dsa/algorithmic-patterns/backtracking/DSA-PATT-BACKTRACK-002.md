---
id: DSA-PATT-BACKTRACK-002
title: "Padrão Subsets (2^N) vs Permutations (N!) vs Combinations"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::google
  - freq::high
---

## Pergunta
Quais são as diferenças de estrutura de loop e complexidade entre os padrões de **Subsets ($O(2^N)$)**, **Permutations ($O(N!)$)** e **Combinations ($O(\binom{N}{K})$)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Subsets (Subconjuntos - $O(2^N)$)**: A cada nível, adiciona o estado atual à resposta e itera a partir de `start` até $N-1$ (`backtrack(i + 1)`).
- **Permutations (Permutações - $O(N!)$)**: A ordem importa (`[1,2] != [2,1]`). Itera sempre de $0$ a $N-1$, utilizando um array booleano `used[]` para não repetir elementos já selecionados.
- **Combinations (Combinações - $O(\binom{N}{K})$)**: Subsets de tamanho fixo $K$. Itera a partir de `start` até $N-1$, adicionando à resposta quando `path.size() == k`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Problema das N-Rainhas: Validação com Vetores de Colunas e Diagonais</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Validação de Ataques em Tempo O(1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Rastreia ocupação em 3 sets/bitsets: cols[c], diag1[row - col], diag2[row + col].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite posicionar uma rainha por linha sem inspecionar o tabuleiro completo O(N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Tempo reduzido para colocar N rainhas com validação O(1) instantânea</text>

</svg>

| Problema Combinatório | Estrutura de Loop | Complexidade |
|---|---|---|
| **Subsets** | `i = start .. N-1` (Todos os passos) | $O(N \cdot 2^N)$ |
| **Combinations** | `i = start .. N-1` (Quando `len == K`) | $O(K \cdot \binom{N}{K})$ |
| **Permutations** | `i = 0 .. N-1` (Com `used[i]`) | $O(N \cdot N!)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em combinações e subsets, o parâmetro `start` garante que combinações espelhadas (como `[2, 1]` após `[1, 2]`) nunca sejam geradas.

</details>
