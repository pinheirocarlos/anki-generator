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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fractional Knapsack: Ordenação por Densidade de Valor (val / weight)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Itens Fracionáveis Permitem Abordagem Gulosa Ótima</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ordena decrescentemente por densidade ratio = value / weight.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Consome itens inteiros; no último item que não couber por completo, leva a fração restante W_rest / weight.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Mochila 0/1 exige DP O(N·W); Mochila Fracionária é resolvida gulosamente em O(N log N)</text>

</svg>

| Critério de Ordenação Guloso | Resultado | Status de Otimização |
|---|---|---|
| **Ordenar por Início (`start`)** | Pode escolher tarefa longa que bloqueia tudo | Incorreto |
| **Ordenar por Término (`end`)** | Maximiza tempo livre restante | Matematicamente Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- *Non-overlapping Intervals* (LeetCode 435) é resolvido diretamente calculando $N - \text{maxNonOverlapping(intervals)}$.

</details>
