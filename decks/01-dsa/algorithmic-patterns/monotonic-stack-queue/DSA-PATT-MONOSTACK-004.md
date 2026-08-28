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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Monotonic Deque para Sliding Window Maximum</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Deque de Índices Mantendo Candidatos Vivos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Frente do Deque: sempre o índice do maior elemento da janela atual.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Fim do Deque: remove elementos menores que o novo elemento inserido.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Obtém o máximo de cada janela em tempo O(1) amortizado</text>

</svg>

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
