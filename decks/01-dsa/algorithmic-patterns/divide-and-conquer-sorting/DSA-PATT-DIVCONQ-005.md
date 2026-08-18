---
id: DSA-PATT-DIVCONQ-005
title: "TimSort: O Algoritmo Híbrido Adaptativo Padrão de Java e Python"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::apple
  - freq::high
---

## Pergunta
Como o algoritmo **TimSort** combina Insertion Sort e Mergesort para atingir performance linear $O(N)$ em dados quase ordenados?

## Resposta
### Quick Answer
**Solução Direta**:
- Dados do mundo real frequentemente contêm sequências naturais que já estão ordenadas (crescentes ou decrescentes):
  1. **Detecção de Runs**: O TimSort varre o array identificando sequências já ordenadas (*runs*). Se uma run for muito curta ($< \text{minRun} \approx 32\text{ a }64$), estende-a usando **Insertion Sort** (que é imbatível para $N \le 64$).
  2. **Merge Balanceado via Pilha**: Mantém uma pilha de runs garantindo invariantes de tamanho similares aos números de Fibonacci para fundir runs balanceadas.
- **Complexidade**: $O(N)$ no melhor caso (dados já ordenados) e $O(N \log N)$ no pior caso, mantendo estrita estabilidade.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/master-theorem-cases-complexity-loop.webm">
    <p>Visualização: Comparação entre o custo do trabalho local f(n) e a taxa de crescimento das folhas da árvore n^(log_b a).</p>
  </video>
</div>

| Algoritmo | Complexidade (Melhor / Pior) | Estabilidade |
|---|---|---|
| **Quicksort Padrão** | $O(N \log N)$ / $O(N^2)$ | Instável |
| **Mergesort Puro** | $O(N \log N)$ / $O(N \log N)$ | Estável |
| **TimSort (Híbrido)** | **$O(N)$ Linear** / **$O(N \log N)$** | Estável |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo oficial de ordenação de objetos de `java.util.Arrays.sort()`, `Collections.sort()` e do método `sort()` do Python.

</details>
