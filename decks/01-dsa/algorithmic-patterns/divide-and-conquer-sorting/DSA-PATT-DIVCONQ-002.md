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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema Mestre para Relações de Recorrência: T(N) = a T(N/b) + f(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Comparação entre f(N) e N^(log_b a)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="10">Caso 1: f(N) &lt; N^(log_b a) → T(N) = Θ(N^(log_b a)) [Custo dominado pelas folhas]</text>
    <text x="20" y="58" fill="#10b981" font-size="10">Caso 2: f(N) = Θ(N^(log_b a)) → T(N) = Θ(N^(log_b a) · log N) [Custo equilibrado por nível]</text>
    <text x="20" y="71" fill="#f59e0b" font-size="10">Caso 3: f(N) &gt; N^(log_b a) → T(N) = Θ(f(N)) [Custo dominado pela raiz]</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Exemplo: Merge Sort T(N) = 2T(N/2) + O(N) → Caso 2 → O(N log N)</text>

</svg>

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
