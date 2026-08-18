---
id: DSA-STRUCT-ADVTREE-000
title: "Limitação de Prefix Sums em Cenários Dinâmicos de Consulta e Atualização"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Por que arrays de soma de prefixos (*Prefix Sums*) falham em atender cenários com **consultas de intervalo e atualizações pontuais dinâmicas simultâneas**?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um array estático com **Prefix Sums**:
  - Consulta de soma de intervalo $\sum_{i=L}^R A[i] = P[R] - P[L-1]$ executa em tempo instantâneo $O(1)$.
  - **O Gargalo**: Quando um elemento pontual $A[i]$ é atualizado, todos os prefixos subsequentes ($P[i], P[i+1], \dots, P[N]$) precisam ser recalculados, custando **$O(N)$ linear**.
- Para $Q$ operações mistas de consulta e atualização, o custo total se torna $O(Q \times N)$.
- Estruturas como **Segment Tree** e **Fenwick Tree** equilibram ambos para **$O(\log N)$**.

### Dual Coding Visual
| Estrutura de Dados | Range Query (Consulta) | Point Update (Atualização) |
|---|---|---|
| **Array Simples** | $O(N)$ Varredura | $O(1)$ Direto no índice |
| **Prefix Sums** | $O(1)$ Subtração | $O(N)$ Recálculo em cascata |
| **Segment / Fenwick Tree** | $O(\log N)$ Balanceado | $O(\log N)$ Balanceado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Segment Trees e Fenwick Trees resolvem o dilema clássico da computação: equilibrar custo de leitura e custo de escrita para $O(\log N)$.

</details>
