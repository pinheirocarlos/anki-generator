---
id: DSA-PATT-DPADV-003
title: "Digit DP para Contagem de Números sob Restrições de Limite de Prefixo"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Digit DP** conta números em um intervalo $[A, B]$ que satisfazem propriedades específicas em tempo $O(\log_{10}(B))$?

## Resposta
### Quick Answer
**Solução Direta**:
- Convertemos a contagem no intervalo $[A, B]$ para $F(B) - F(A - 1)$.
- Em $F(N)$, processamos os dígitos de $N$ da esquerda para a direita mantendo uma função recursiva com memoization `dfs(index, isLimit, isNum, state)`:
  - `index`: Posição do dígito atual.
  - `isLimit` (booleano): Se `true`, o dígito atual está limitado pelo dígito correspondente de $N$ (não pode ultrapassar); se `false`, pode assumir qualquer dígito de $0$ a $9$.
  - `state`: Propriedade rastreada (ex: soma de dígitos, dígito anterior).
- **Complexidade**: $O(\text{len}(\text{dígitos}) \times \text{estados})$, executando em menos de 1ms para números até $10^{18}$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Digit DP: dp(index, is_tight, is_started, mask/sum)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Construção Dígito a Dígito com Prefixo Restrito (is_tight)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">is_tight = true: limite superior é str[index] (ex: 7); false: dígitos livres de 0 a 9.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Resolve consultas de contagem no intervalo [L, R] via f(R) - f(L - 1) em O(log₁₀(N)).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Elimina varreduras lineares quando N alcança até 10¹⁸</text>
</svg>
<p>Visualização: Digit DP processando dígitos da esquerda para a direita controlando a flag de limite superior e restrições acumuladas.</p>

| Parâmetro de Digit DP | Papel no Algoritmo | Efeito na Ramificação |
|---|---|---|
| `isLimit == true` | Prefixo coincide com $N$ | Dígito limitado a $[0, N[i]]$ |
| `isLimit == false` | Prefixo é estritamente menor | Dígito livre em $[0, 9]$ (Memoizável) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Quando `isLimit == false`, o resultado depende apenas de `index` e `state`, permitindo cache massivo entre ramos.

</details>
