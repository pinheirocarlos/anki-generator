---
id: DSA-PATT-DIVCONQ-000
title: "Paradigma de Divisão e Conquista e o Teorema Mestre para Análise de Recorrência"
tags:
  - level::l3-junior
  - topic::dsa::divide-and-conquer-sorting
  - company::google
  - freq::high
---

## Pergunta
Como o paradigma de **Divisão e Conquista (Divide and Conquer)** decompõe problemas e como o **Teorema Mestre** resolve suas complexidades assintóticas?

## Resposta
### Quick Answer
**Solução Direta**:
- O paradigma segue 3 etapas:
  1. **Dividir**: Quebra o problema original em $a$ subproblemas menores de tamanho $N/b$.
  2. **Conquistar**: Resolve os subproblemas recursivamente (ou diretamente nos casos base).
  3. **Combinar**: Funde as soluções dos subproblemas na solução final com custo $f(N) = O(N^d)$.
- **Teorema Mestre ($T(N) = a T(N/b) + O(N^d)$)**:
  - Se $d < \log_b a \implies T(N) = O(N^{\log_b a})$ (Folhas dominam).
  - Se $d = \log_b a \implies T(N) = O(N^d \log N)$ (Custo uniforme por nível, como Mergesort).
  - Se $d > \log_b a \implies T(N) = O(N^d)$ (Raiz domina).

### Dual Coding Visual
<img src="assets/DSA-PATT-DIVCONQ-000.gif" alt="Particionamento QuickSort In-Place" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0;" />
<p>Visualização: Particionamento in-place do QuickSort organizando elementos menores à esquerda e maiores à direita do pivô.</p>

| Algoritmo | Recorrência e Parâmetros | Complexidade Final |
|---|---|---|
| **Binary Search** | $T(N/2) + O(1)$ com $a=1, b=2, d=0$ | $O(\log N)$ |
| **Mergesort** | $2T(N/2) + O(N)$ com $a=2, b=2, d=1$ | $O(N \log N)$ |
| **Karatsuba** | $3T(N/2) + O(N)$ com $a=3, b=2, d=1$ | $O(N^{1.585})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Teorema Mestre permite deduzir a complexidade de algoritmos recursivos balanceados instantaneamente sem desenhar a árvore completa.

</details>
