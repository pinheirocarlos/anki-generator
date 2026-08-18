---
id: DSA-PATT-GREEDY-002
title: "Interval Scheduling e Seleção de Atividades por Término em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::google
  - freq::high
---

## Pergunta
Por que o problema de **Seleção de Atividades (Interval Scheduling)** exige ordenação por **horário de término (`end`)** em vez de horário de início?

## Resposta
### Quick Answer
**Solução Direta**:
- O objetivo é maximizar o número total de tarefas não-conflitantes:
  - Escolher gulosamente a tarefa que **termina o mais cedo possível (`min end`)** deixa a **maior quantidade de tempo livre restante** para acomodar tarefas futuras.
- **Algoritmo**:
  1. Ordena os intervalos por seu ponto de término $\text{end}_i$ ($O(N \log N)$).
  2. Seleciona a primeira tarefa e registra seu `lastEnd`.
  3. Para cada próxima tarefa $i$: se $\text{start}_i \ge \text{lastEnd}$, seleciona a tarefa e atualiza `lastEnd = end_i`.
- **Complexidade**: $O(N \log N)$ tempo e $O(1)$ espaço auxiliar.

### Dual Coding Visual
| Critério de Ordenação Guloso | Resultado | Status de Otimização |
|---|---|---|
| **Ordenar por Início (`start`)** | Pode escolher tarefa longa que bloqueia tudo | Incorreto |
| **Ordenar por Término (`end`)** | Maximiza tempo livre restante | Matematicamente Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- *Non-overlapping Intervals* (LeetCode 435) é resolvido diretamente calculando $N - \text{maxNonOverlapping(intervals)}$.

</details>
