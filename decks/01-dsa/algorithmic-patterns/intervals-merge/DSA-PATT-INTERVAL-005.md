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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Employee Free Time: Janelas Livres Compartilhadas entre Cronogramas</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Fusão de Todos os Intervalos de Trabalho e Identificação de Gaps</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Funde todos os períodos ocupados em uma linha do tempo unificada com Min-Heap / Sort.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Os intervalos entre prev.end e curr.start (onde prev.end &lt; curr.start) são os horários livres comuns.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(N log K), onde N é o total de intervalos e K é o número de funcionários</text>

</svg>

| Cálculo de Interseção | Condição de Validade | Regra de Descarte |
|---|---|---|
| $[max(S_A, S_B), min(E_A, E_B)]$ | $\text{start} \le \text{end}$ | Avança o que tiver menor `end` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Combina perfeitamente a lógica de intervalos com Two Pointers em complexidade linear ótima $O(N + M)$.

</details>
