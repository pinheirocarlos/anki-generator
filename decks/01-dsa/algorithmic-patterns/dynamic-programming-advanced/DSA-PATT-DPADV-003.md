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
| Parâmetro de Digit DP | Papel no Algoritmo | Efeito na Ramificação |
|---|---|---|
| `isLimit == true` | Prefixo coincide com $N$ | Dígito limitado a $[0, N[i]]$ |
| `isLimit == false` | Prefixo é estritamente menor | Dígito livre em $[0, 9]$ (Memoizável) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Quando `isLimit == false`, o resultado depende apenas de `index` e `state`, permitindo cache massivo entre ramos.

</details>
