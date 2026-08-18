---
id: DSA-PATT-DIVCONQ-003
title: "Quicksort: Particionamento In-Place (Lomuto vs Hoare) e Pior Caso O(N²)"
tags:
  - level::l3-junior
  - topic::dsa::divide-and-conquer-sorting
  - company::meta
  - freq::high
---

## Pergunta
Como funciona o particionamento in-place no **Quicksort** e sob quais condições ele degenera para $O(N^2)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Quicksort escolhe um elemento pivô e rearranja o array in-place tal que todos os elementos $\le \text{pivô}$ fiquem à esquerda e os $> \text{pivô}$ à direita:
  - **Lomuto Partition**: Usa um único ponteiro de varredura. Mais simples, porém faz mais swaps.
  - **Hoare Partition**: Usa dois ponteiros convergentes nas pontas. Faz em média $3\times$ menos swaps que Lomuto.
- **Degeneração $O(N^2)$**: Se o pivô escolhido for sempre o menor ou maior elemento (ex: array já ordenado com pivô fixo no primeiro/último elemento), o particionamento divide o array em tamanhos $0$ e $N-1$, gerando uma árvore de altura $N$ com custo total $\sum_{i=1}^N i = O(N^2)$.

### Dual Coding Visual
| Estratégia de Pivô | Desempenho com Array Ordenado | Risco de $O(N^2)$ |
|---|---|---|
| **Pivô Fixo na Ponta** | Degrada para $O(N^2)$ | Alto |
| **Pivô Aleatório / Mediana de 3** | $O(N \log N)$ com alta probabilidade | Praticamente Zero |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Na prática, o Quicksort aleatorizado é mais rápido que o Mergesort devido a constantes menores e localidade de cache perfeita (operações in-place).

</details>
