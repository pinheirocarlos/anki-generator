---
id: DSA-PATT-DIVCONQ-002
title: "Mergesort: Divisão Balanceada, Estabilidade e Complexidade Garantida O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::divide-and-conquer-sorting
  - company::amazon
  - freq::high
---

## Pergunta
Por que o **Mergesort** garante complexidade $O(N \log N)$ em todos os casos (melhor, médio e pior) e como ele preserva a **estabilidade**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Garantia $O(N \log N)$**: Divide o array estritamente ao meio em $\lfloor N/2 \rfloor$, gerando uma árvore de recursão perfeitamente balanceada de altura $\log_2 N$. Em cada nível, a fusão (`merge`) processa todos os $N$ elementos em tempo linear $O(N)$, totalizando $O(N \log N)$ impreterivelmente.
- **Estabilidade**: Durante o merge de duas metades ordenadas, se dois elementos forem iguais ($A[i] == B[j]$), selecionamos prioritariamente o elemento da metade esquerda ($A[i]$), preservando a ordem relativa original dos itens.
- **Desvantagem**: Exige $O(N)$ de memória auxiliar para o buffer temporário de fusão.

### Dual Coding Visual
<img src="assets/DSA-PATT-DIVCONQ-002.gif" alt="Divisão e Intercalação Estável no MergeSort" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0;" />
<p>Visualização: Divisão recursiva em metades balanceadas e intercalação ordenada estável em tempo O(N log N).</p>

| Caso de Execução | Tempo Mergesort | Tempo Quicksort |
|---|---|---|
| **Melhor Caso** | $O(N \log N)$ | $O(N \log N)$ |
| **Caso Médio** | $O(N \log N)$ | $O(N \log N)$ |
| **Pior Caso** | **$O(N \log N)$ Garantido** | $O(N^2)$ Degenerado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Mergesort é o algoritmo de escolha para ordenação externa em disco e ordenação de listas encadeadas (onde a fusão pode ser feita in-place sem array extra).

</details>
