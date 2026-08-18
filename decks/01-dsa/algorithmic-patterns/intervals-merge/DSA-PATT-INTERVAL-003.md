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
