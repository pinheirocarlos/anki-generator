---
id: DSA-ADV-SWEEPLINE-004
title: "Par de Pontos Mais Próximos (Closest Pair of Points) via Divisão e Conquista em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como o algoritmo de Divisão e Conquista geométrico encontra o **Par de Pontos Mais Próximos** em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Ordena os pontos por coordenada $X$ e divide ao meio com uma linha vertical.
- 2. Resolve recursivamente para a metade esquerda e direita, obtendo a menor distância $d = \min(d_L, d_R)$.
- 3. **Faixa Central (*Strip*)**: Filtra os pontos que estão a uma distância $< d$ da linha vertical de divisão e ordena-os por $Y$.
- 4. **Teorema Geométrico de Densidade**: Para cada ponto na faixa central, basta compará-lo com no máximo **7 pontos subsequentes** na lista ordenada por $Y$, pois uma caixa $d \times 2d$ não pode conter mais de 8 pontos com distância mútua $\ge d$.
- **Complexidade**: $T(N) = 2T(N/2) + O(N) = O(N \log N)$.

### Dual Coding Visual
| Etapa do Algoritmo | Complexidade | Propriedade Chave |
|---|---|---|
| **Divisão e Conquista** | $2T(N/2)$ | Resolve metades esquerda e direita |
| **Faixa Central ($2d$)** | $O(N)$ | Compara com no máximo 7 vizinhos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Prova como uma análise geométrica rigorosa reduz um teste que seria quadrático na faixa central para tempo linear estrito.

</details>
