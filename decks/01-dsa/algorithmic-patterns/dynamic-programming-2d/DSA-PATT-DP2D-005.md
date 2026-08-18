---
id: DSA-PATT-DP2D-005
title: "Longest Palindromic Substring e DP em Intervalos de Substrings [i, j]"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-2d
  - company::amazon
  - freq::high
---

## Pergunta
Como a DP 2D sobre intervalos $[i, j]$ verifica se substrings são palíndromos para resolver **Longest Palindromic Substring** em $O(N^2)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como booleano (`true` se a substring $S[i..j]$ for um palíndromo):
  - Casos base: Substrings de tamanho 1 são sempre palíndromos ($DP[i][i] = \text{true}$).
  - Substrings de tamanho 2: $DP[i][i+1] = (S[i] == S[i+1])$.
  - Substrings de tamanho $\ge 3$: $S[i..j]$ é palíndromo se e somente se as pontas forem iguais e o miolo interno for um palíndromo:
    $$DP[i][j] = (S[i] == S[j]) \ \land \ DP[i+1][j-1]$$
- **Ordem de Preenchimento**: Deve ser preenchida por **comprimento crescente de substring** ou com $i$ decrescendo de $N-1$ até $0$ para que o miolo $DP[i+1][j-1]$ já esteja calculado.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/edit-distance-levenshtein-matrix-loop.webm">
    <p>Visualização: Cálculo de operações mínimas (inserção, deleção, substituição) na transformação de uma string em outra.</p>
  </video>
</div>

| Condição de Palíndromo | Equação | Racional |
|---|---|---|
| $S[i] == S[j]$ e $j - i \le 2$ | `true` | Tamanho 1 ou 2 com caracteres iguais |
| $S[i] == S[j]$ e $j - i > 2$ | $DP[i+1][j-1]$ | Depende do miolo interno já ser palíndromo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A técnica de expandir a partir do centro (*Expand Around Center*) atinge a mesma complexidade $O(N^2)$ com $O(1)$ de memória auxiliar.

</details>
