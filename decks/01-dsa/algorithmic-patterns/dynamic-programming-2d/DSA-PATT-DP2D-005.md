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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DP em Intervalos [i, j]: dp[i][j] = (s[i] == s[j]) &amp;&amp; dp[i+1][j-1]</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Ordem de Preenchimento por Comprimento L = j - i + 1</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Base: L=1 (sempre true); L=2 (true se s[i] == s[i+1]).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Para L ≥ 3: dp[i][j] consulta o sub-intervalo interno menor já computado dp[i+1][j-1].</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: Tempo O(N²) e Espaço O(N²)</text>
</svg>
<p>Visualização: DP sobre intervalos de substrings [i, j] expandindo a partir de palíndromos centrais de comprimento menor.</p>
| Condição de Palíndromo | Equação | Racional |
|---|---|---|
| $S[i] == S[j]$ e $j - i \le 2$ | `true` | Tamanho 1 ou 2 com caracteres iguais |
| $S[i] == S[j]$ e $j - i > 2$ | $DP[i+1][j-1]$ | Depende do miolo interno já ser palíndromo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A técnica de expandir a partir do centro (*Expand Around Center*) atinge a mesma complexidade $O(N^2)$ com $O(1)$ de memória auxiliar.

</details>
