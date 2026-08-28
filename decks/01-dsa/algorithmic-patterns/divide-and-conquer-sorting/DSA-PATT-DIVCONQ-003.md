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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">QuickSelect: K-ésimo Menor Elemento em Tempo Linear Esperado O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Partição Unilateral: Descarta uma Metade a Cada Passo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao contrário do QuickSort que entra em recursão em ambos os lados, entra em apenas um.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Série geométrica: N + N/2 + N/4 + ... = 2N → Tempo Médio Estrito O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Encontra a mediana ou o K-ésimo maior elemento sem ordenar o array completo</text>

</svg>

| Estratégia de Pivô | Desempenho com Array Ordenado | Risco de $O(N^2)$ |
|---|---|---|
| **Pivô Fixo na Ponta** | Degrada para $O(N^2)$ | Alto |
| **Pivô Aleatório / Mediana de 3** | $O(N \log N)$ com alta probabilidade | Praticamente Zero |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Na prática, o Quicksort aleatorizado é mais rápido que o Mergesort devido a constantes menores e localidade de cache perfeita (operações in-place).

</details>
