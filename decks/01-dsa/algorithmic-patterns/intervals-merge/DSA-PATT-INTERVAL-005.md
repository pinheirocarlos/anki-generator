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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Interval List Intersections: Interseção entre Duas Listas com Two Pointers</text>
  <g transform="translate(100, 45)">
    <!-- Lista A -->
    <text x="-30" y="25" fill="#94a3b8" font-size="11" font-weight="bold">A:</text>
    <rect x="0" y="10" width="180" height="24" fill="#3b82f6" rx="4"/><text x="90" y="26" fill="#fff" font-size="10" text-anchor="middle">[0, 6]</text>

    <!-- Lista B -->
    <text x="-30" y="65" fill="#94a3b8" font-size="11" font-weight="bold">B:</text>
    <rect x="60" y="50" width="190" height="24" fill="#f59e0b" rx="4"/><text x="155" y="66" fill="#fff" font-size="10" text-anchor="middle">[2, 8]</text>

    <!-- Interseção -->
    <rect x="60" y="85" width="120" height="20" fill="#047857" stroke="#10b981" stroke-width="2" rx="3"/>
    <text x="120" y="99" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Interseção [2, 6]</text>
  </g>
  <text x="340" y="150" fill="#34d399" font-size="11" text-anchor="middle">start = max(A.start, B.start) = 2; end = min(A.end, B.end) = 6. Se start &lt;= end: há sobreposição!</text>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Avança o ponteiro cujo intervalo termina primeiro (A.end &lt; B.end ? i++ : j++) em O(N + M)</text>
</svg>
<p>Visualização: Interseção entre duas listas ordenadas com Two Pointers avançando o intervalo com menor término em O(N+M).</p>

| Cálculo de Interseção | Condição de Validade | Regra de Descarte |
|---|---|---|
| $[max(S_A, S_B), min(E_A, E_B)]$ | $\text{start} \le \text{end}$ | Avança o que tiver menor `end` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Combina perfeitamente a lógica de intervalos com Two Pointers em complexidade linear ótima $O(N + M)$.

</details>
