---
id: DSA-PATT-INTERVAL-005
title: "Interseção de Listas de Intervalos Ordenados em Tempo O(N + M)"
tags:
  - level::l4-pleno
  - topic::dsa::intervals-merge
  - company::apple
  - freq::high
---

## Pergunta
Como encontrar a interseção entre duas listas de intervalos ordenados e disjuntos (**Interval List Intersections**) em tempo linear $O(N + M)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Usamos dois ponteiros $i$ e $j$ para percorrer as listas $A$ e $B$:
  - O intervalo de sobreposição potencial entre $A[i]$ e $B[j]$ é:
    $$\text{start} = \max(A[i].\text{start}, B[j].\text{start}), \quad \text{end} = \min(A[i].\text{end}, B[j].\text{end})$$
  - Se $\text{start} \le \text{end}$, adicionamos $[	ext{start}, 	ext{end}]$ ao resultado.
  - **Avanço de Ponteiro**: Avançamos o ponteiro do intervalo que **termina primeiro** (se $A[i].\text{end} < B[j].\text{end}$, fazemos $i++$; senão $j++$), pois ele não pode mais intersectar nenhum intervalo futuro.

### Dual Coding Visual
| Cálculo de Interseção | Condição de Validade | Regra de Descarte |
|---|---|---|
| $[max(S_A, S_B), min(E_A, E_B)]$ | $\text{start} \le \text{end}$ | Avança o que tiver menor `end` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Combina perfeitamente a lógica de intervalos com Two Pointers em complexidade linear ótima $O(N + M)$.

</details>
