---
id: DSA-PATT-INTERVAL-003
title: "Inserção de Novo Intervalo em Lista Ordenada (Insert Interval) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::intervals-merge
  - company::amazon
  - freq::high
---

## Pergunta
Como inserir um novo intervalo em uma lista de intervalos disjuntos já ordenada (**Insert Interval** - LeetCode 57) em tempo linear $O(N)$ sem reordenar?

## Resposta
### Quick Answer
**Solução Direta**:
- Dividimos o processamento em 3 fases lineares:
  1. **Antes da sobreposição**: Adiciona todos os intervalos cujo término é menor que o início do novo: `intervals[i].end < newInterval.start`.
  2. **Fusão da sobreposição**: Enquanto houver sobreposição (`intervals[i].start <= newInterval.end`), expande o novo intervalo:
     `newInterval.start = min(newInterval.start, intervals[i].start)` e `newInterval.end = max(newInterval.end, intervals[i].end)`. Ao final do laço, adiciona `newInterval`.
  3. **Após a sobreposição**: Adiciona todos os intervalos restantes.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Non-overlapping Intervals: Mínimo de Remoções para Eliminar Sobreposição</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Escolha Gulosa: Remove o Intervalo que Termina Mais Tarde</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao detectar sobreposição entre prev e curr: incrementa contador de remoções.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Mantém o intervalo com menor término: prev.end = min(prev.end, curr.end).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Deixar o menor término livre maximiza o espaço para acomodar intervalos subsequentes</text>

</svg>

| Fase do Algoritmo | Critério de Processamento | Ação |
|---|---|---|
| **Fase 1 (Antes)** | `interval.end < new.start` | Adiciona direto |
| **Fase 2 (Fusão)** | `interval.start <= new.end` | Absorve no `newInterval` |
| **Fase 3 (Depois)** | Restante da lista | Adiciona direto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como a entrada já está ordenada, a inserção executa em tempo linear $O(N)$ estrito, sem custo de $O(N \log N)$.

</details>
