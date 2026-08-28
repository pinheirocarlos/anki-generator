---
id: DSA-PATT-DIVCONQ-004
title: "Contagem de Inversões (Inversion Count) com Mergesort Modificado em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::meta
  - freq::high
---

## Pergunta
Como modificar a etapa de fusão do **Mergesort** para contar o número de inversões ($i < j$ com $A[i] > A[j]$) em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma inversão ocorre quando um elemento maior aparece antes de um menor no array.
- Durante a etapa de merge entre duas metades ordenadas `left[]` e `right[]`:
  - Se `right[j] < left[i]`: Como `left[]` está ordenado, todos os elementos restantes de `left[i]` até o fim da metade esquerda são estritamente maiores que `right[j]`.
  - Contabilizamos instantaneamente $(\text{mid} - i + 1)$ inversões em tempo $O(1)$.
- **Complexidade**: $O(N \log N)$ tempo contra $O(N^2)$ da contagem ingênua por pares.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Contagem de Inversões em Array com Merge Sort em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Inversão: Par (i, j) onde i &lt; j e arr[i] &gt; arr[j]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Durante a etapa de merge: se arr[L] &gt; arr[R], todos os elementos restantes na esquerda invertem com arr[R].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">inversions += (mid - L + 1). Contagem acumulada em tempo O(N log N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Mede o grau de desordem de um vetor e resolve problemas de ranqueamento colaborativo</text>

</svg>

| Condição no Merge | Relação de Valor | Inversões Somadas |
|---|---|---|
| `left[i] <= right[j]` | Normal (sem inversão) | $0$ |
| `left[i] > right[j]` | Inversão detectada | $+ (\text{mid} - i + 1)$ de uma vez |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz drasticamente a complexidade de problemas como *Count of Smaller Numbers After Self* e métricas de desordem de rankings.

</details>
