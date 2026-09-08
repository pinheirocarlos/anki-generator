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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Geração de Subconjuntos (Power Set O(2ᴺ)) vs Permutações (O(N!))</text>
  <g transform="translate(60, 45)">
    <!-- Subconjuntos -->
    <rect x="0" y="0" width="260" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="130" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Subconjuntos (Subsets / Combinações)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">• Decisão binária: Incluir ou Não Incluir</text>
    <text x="15" y="62" fill="#94a3b8" font-size="10">• Próxima chamada: backtrack(i + 1)</text>
    <text x="15" y="78" fill="#38bdf8" font-size="10">• Complexidade total: 2 × 2 × ... × 2 = O(2ᴺ)</text>

    <!-- Permutações -->
    <rect x="300" y="0" width="260" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="430" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Permutações (Permutations)</text>
    <text x="315" y="45" fill="#f8fafc" font-size="10">• Ordem importa: escolher qualquer elemento não usado</text>
    <text x="315" y="62" fill="#94a3b8" font-size="10">• Vetor de visitados: boolean[] used</text>
    <text x="315" y="78" fill="#34d399" font-size="10">• Complexidade total: N × (N-1) × ... × 1 = O(N!)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Diferenciação crítica em entrevistas para prever o custo assintótico da busca exaustiva</text>
</svg>
<p>Visualização: Árvore de decisão comparando espaço de estados: Subconjuntos O(2ᴺ) vs Permutações O(N!).</p>

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
