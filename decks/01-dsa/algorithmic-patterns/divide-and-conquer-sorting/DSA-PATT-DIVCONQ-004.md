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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/quicksort-random-pivot-avoid-worst-loop.webm">
    <p>Visualização: Pivô aleatório evitando a degeneração quadrática em arrays já ordenados garantindo média O(N log N).</p>
  </video>
</div>

| Condição no Merge | Relação de Valor | Inversões Somadas |
|---|---|---|
| `left[i] <= right[j]` | Normal (sem inversão) | $0$ |
| `left[i] > right[j]` | Inversão detectada | $+ (\text{mid} - i + 1)$ de uma vez |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz drasticamente a complexidade de problemas como *Count of Smaller Numbers After Self* e métricas de desordem de rankings.

</details>
