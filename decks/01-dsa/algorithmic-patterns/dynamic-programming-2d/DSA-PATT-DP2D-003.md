---
id: DSA-PATT-DP2D-003
title: "Longest Common Subsequence (LCS) e Casamento de Caracteres em O(M·N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::google
  - freq::high
---

## Pergunta
Como a Programação Dinâmica 2D resolve o problema **Longest Common Subsequence (LCS)** em tempo $O(M \times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o comprimento da maior subsequência comum entre os prefixos $S_1[0..i-1]$ e $S_2[0..j-1]$:
  - **Se os caracteres coincidem ($S_1[i-1] == S_2[j-1]$)**: Estendemos a subsequência diagonal anterior:
    $$DP[i][j] = 1 + DP[i-1][j-1]$$
  - **Se são diferentes**: Tomamos o melhor resultado descartando um caractere de $S_1$ ou de $S_2$:
    $$DP[i][j] = \max(DP[i-1][j], \ DP[i][j-1])$$
- **Complexidade**: $O(M \times N)$ tempo e $O(M \times N)$ espaço (ou $O(\min(M, N))$ otimizado).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Longest Common Subsequence (LCS): Correspondência Diagonal vs Máximo</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Match: s1[i-1] == s2[j-1]</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">dp[i][j] = dp[i-1][j-1] + 1</text>
    <text x="15" y="60" fill="#a7f3d0" font-size="10">Avanço diagonal na matriz 2D</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
      <text x="120" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Mismatch: s1[i-1] != s2[j-1]</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">dp[i][j] = max(dp[i-1][j], dp[i][j-1])</text>
      <text x="15" y="60" fill="#fde68a" font-size="10">Propagação do melhor caminho</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Reconstrução do alinhamento ótimo seguindo os ponteiros diagonais em O(M + N)</text>
</svg>
<p>Visualização: Matriz 2D de Longest Common Subsequence computando correspondências diagonais e propagando valores máximos em O(M·N).</p>

| Comparação de Caracteres | Equação de Transição | Direção de Preenchimento |
|---|---|---|
| $S_1[i-1] == S_2[j-1]$ | $1 + DP[i-1][j-1]$ | Diagonal Superior |
| $S_1[i-1] \neq S_2[j-1]$ | $\max(DP[i-1][j], DP[i][j-1])$ | $\max(\text{Cima}, \text{Esquerda})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Práticas
- É a base do utilitário `git diff`, de algoritmos de alinhamento de sequências de DNA (Needleman-Wunsch) e corretores ortográficos.

#### Key Takeaways
- É o problema arquetípico para qualquer problema de processamento de duas strings em entrevistas técnicas.

</details>
