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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/choose-explore-unchoose-revert-loop.webm">
    <p>Visualização: Padrão canônico: aplicar modificação de estado antes da recursão e reverter pontualmente após o retorno.</p>
  </video>
</div>

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
