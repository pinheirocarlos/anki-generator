---
id: DSA-PATT-MONOSTACK-004
title: "Maximal Rectangle em Matriz Binária Reduzido para Histogramas 1D em O(M·N)"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Como o problema **Maximal Rectangle** (LeetCode 85) em uma matriz binária é decomposto em chamadas repetidas de *Largest Rectangle in Histogram* em $O(M \times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um array de alturas de histograma `heights[]` de tamanho $N$ (número de colunas):
  - Para cada linha $r$ da matriz:
    - Para cada coluna $c$: se $\text{matrix}[r][c] == '1'$, incrementamos $\text{heights}[c]++$; se for $'0'$, resetamos $\text{heights}[c] = 0$.
    - Executamos o algoritmo **Largest Rectangle in Histogram** ($O(N)$) sobre o array `heights[]` acumulado até a linha $r$.
- **Complexidade**: $O(M \times N)$ tempo total e $O(N)$ espaço auxiliar.

### Dual Coding Visual
| Linha da Matriz | Alturas de Histograma (`heights[]`) | Algoritmo Aplicado |
|---|---|---|
| Linha 0 | `[1, 0, 1, 0, 0]` | `largestRectangle(heights)` |
| Linha 1 | `[2, 0, 2, 1, 1]` | `largestRectangle(heights)` |
| Linha 2 | `[3, 1, 3, 2, 2]` | `largestRectangle(heights)` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz um problema aparentemente complexo em 2D para uma sequência de $M$ instâncias de um problema 1D já resolvido eficientemente por pilha monótona.

</details>
