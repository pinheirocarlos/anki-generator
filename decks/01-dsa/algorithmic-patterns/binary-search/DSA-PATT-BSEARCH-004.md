---
id: DSA-PATT-BSEARCH-004
title: "Busca Binária de Mediana de Dois Arrays Ordenados em O(log(min(N, M)))"
tags:
  - level::l4-pleno
  - topic::dsa::binary-search
  - company::apple
  - freq::high
---

## Pergunta
Como o algoritmo de partição binária encontra a **Mediana de Dois Arrays Ordenados** em tempo $O(\log(\min(N, M)))$?

## Resposta
### Quick Answer
**Solução Direta**:
- Garantimos que o array $A$ seja o menor ($|A| \le |B|$).
- Fazemos busca binária no ponto de corte $i$ do array $A$ (de $0$ a $|A|$), determinando o corte correspondente em $B$:
  $$j = \frac{|A| + |B| + 1}{2} - i$$
- Os cortes dividem os dois arrays em metades esquerda e direita:
  - Condição de partição válida: $A[i-1] \le B[j]$ e $B[j-1] \le A[i]$.
  - Se $A[i-1] > B[j]$, movemos o corte $i$ para a esquerda (`right = i - 1`).
  - Se $B[j-1] > A[i]$, movemos o corte $i$ para a direita (`left = i + 1`).
- A mediana é computada em $O(1)$ a partir dos extremos da partição.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/rotated-sorted-array-binary-search-loop.webm">
    <p>Visualização: Identificação da metade estritamente ordenada e verificação se o alvo reside nela antes de descartar.</p>
  </video>
</div>

| Metade Esquerda | Metade Direita | Condição de Validade |
|---|---|---|
| $\max(A[i-1], B[j-1])$ | $\min(A[i], B[j])$ | $\text{maxEsquerda} \le \text{minDireita}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É considerado um dos problemas mais célebres do LeetCode (Hard #4) por aplicar busca binária simultânea em duas partições de dados.

</details>
