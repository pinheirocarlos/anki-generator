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
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Interval Scheduling: Ordenação por Término Mais Cedo (Earliest End Time)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="10" width="120" height="25" fill="#047857" stroke="#10b981" rx="4"/>
    <text x="60" y="27" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">[1, 4] Aceito (Termina cedo)</text>

    <rect x="50" y="45" width="140" height="25" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="120" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">[3, 6] Conflito (Descartado)</text>

    <rect x="150" y="10" width="150" height="25" fill="#047857" stroke="#10b981" rx="4"/>
    <text x="225" y="27" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">[5, 8] Aceito (Start ≥ 4)</text>

    <rect x="330" y="10" width="130" height="25" fill="#047857" stroke="#10b981" rx="4"/>
    <text x="395" y="27" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">[9, 11] Aceito</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estratégia comprovadamente ótima maximizando a quantidade total de eventos não-conflitantes</text>
</svg>
<p>Visualização: Seleção de atividades ordenadas pelo menor tempo de término garantindo a liberação precoce do recurso.</p>
| Critério de Ordenação Guloso | Resultado | Status de Otimização |
|---|---|---|
| **Ordenar por Início (`start`)** | Pode escolher tarefa longa que bloqueia tudo | Incorreto |
| **Ordenar por Término (`end`)** | Maximiza tempo livre restante | Matematicamente Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- *Non-overlapping Intervals* (LeetCode 435) é resolvido diretamente calculando $N - \text{maxNonOverlapping(intervals)}$.

</details>
