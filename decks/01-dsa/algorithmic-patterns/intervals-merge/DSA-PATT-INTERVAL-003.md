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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Insert Interval: Inserção Ordenada em Lista sem Sobreposições em O(N)</text>
  <g transform="translate(60, 45)">
    <rect x="0" y="0" width="170" height="70" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="85" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. Antes do Conflito</text>
    <text x="85" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">curr.end &lt; new.start</text>
    <text x="85" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Adiciona direto na resposta</text>

    <rect x="190" y="0" width="180" height="70" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Fusão da Sobreposição</text>
    <text x="280" y="45" fill="#fff" font-size="10" text-anchor="middle">curr.start &lt;= new.end</text>
    <text x="280" y="60" fill="#a7f3d0" font-size="9" text-anchor="middle">Expande: min(start) e max(end)</text>

    <rect x="390" y="0" width="170" height="70" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="475" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">3. Depois do Conflito</text>
    <text x="475" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">curr.start &gt; new.end</text>
    <text x="475" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Adiciona restante do vetor</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Processamento linear de passagem única: O(N) tempo e O(N) espaço para o resultado</text>
</svg>
<p>Visualização: Três fases do Insert Interval: intervalos anteriores, fusão contínua da sobreposição e adição dos posteriores.</p>

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
