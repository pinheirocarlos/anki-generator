---
id: DSA-STRUCT-ADVTREE-002
title: "Intuição e Estrutura da Segment Tree para Consultas de Intervalo em O(log N)"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::meta
  - freq::high
---

## Pergunta
Como a **Segment Tree (Árvore de Segmentos)** decompõe intervalos para responder consultas associativas (soma, mínimo, GCD) em $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Segment Tree** é uma árvore binária onde:
  - As folhas representam os elementos individuais do array original ($A[i]$).
  - Cada nó interno armazena o resultado agregado (soma, $\min$, $\max$) do seu intervalo correspondente $[L, R]$, calculado pela combinação dos seus dois filhos $[L, M]$ e $[M+1, R]$.
- Qualquer intervalo de consulta arbitrário $[Q_L, Q_R]$ pode ser decomposto em no máximo **$O(\log N)$ nós canônicos disjuntos** da árvore, calculando a resposta em $O(\log N)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/segment-tree-range-query-loop.webm">
    <p>Visualização: Decomposição do intervalo [L, R] em no máximo 2 log N nós canônicos da árvore.</p>
  </video>
</div>

| Nível da Segment Tree | Intervalo Coberto | Operação Agregada |
|---|---|---|
| **Raiz** | $[0, N-1]$ | Soma total do array |
| **Nós Internos** | Metades recursivas $[L, M]$ e $[M+1, R]$ | $\text{soma}(\text{left}) + \text{soma}(\text{right})$ |
| **Folhas** | $[i, i]$ | Valor unitário $A[i]$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Capacidade do Array de Representação
Uma Segment Tree construída sobre $N$ elementos pode ser armazenada em um array contíguo de tamanho máximo **$4N$**, com o filho esquerdo em $2i+1$ e direito em $2i+2$.

#### Key Takeaways
- Funciona para qualquer operação matemática **associativa** (Soma, Mínimo, Máximo, MDC/GCD, Multiplicação de Matrizes).

</details>
