---
id: DSA-PATT-MONOSTACK-000
title: "Definição e Invariante de Monotonic Stack (Crescente vs Decrescente)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::meta
  - freq::high
---

## Pergunta
Qual é a invariante estrutural de uma **Monotonic Stack** e quando escolher uma pilha monótona crescente versus decrescente?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Monotonic Stack** é uma pilha onde os elementos são mantidos estritamente ordenados da base até o topo:
  - **Monótona Crescente**: Elementos aumentam da base para o topo ($A[\text{base}] < \dots < A[\text{topo}]$). Usada para encontrar o **Previous / Next Smaller Element**.
  - **Monótona Decrescente**: Elementos diminuem da base para o topo ($A[\text{base}] > \dots > A[\text{topo}]$). Usada para encontrar o **Previous / Next Greater Element**.
- Ao inserir $x$, desempilhamos todos os elementos que violam a invariante de ordem, garantindo amortização total de $O(N)$ linear.

### Dual Coding Visual
| Tipo de Pilha Monótona | Ordem da Base ao Topo | Objetivo de Busca |
|---|---|---|
| **Crescente** | Valores aumentam | Próximo / Anterior **Menor** |
| **Decrescente** | Valores diminuem | Próximo / Anterior **Maior** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como cada elemento entra e sai da pilha no máximo uma vez, a complexidade total sobre todo o array de tamanho $N$ é estritamente $O(2N) = O(N)$.

</details>
