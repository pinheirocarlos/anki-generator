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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Binary Search on Answer (Busca Binária na Resposta Monotônica)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Predicado Monotônico: F, F, F, ..., V, V, V</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Quando a função de viabilidade isPossible(X) é monotônica (se X funciona, X+1 também funciona).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Aplica busca binária no espaço de possíveis respostas [min_ans, max_ans] em O(log(Range) · f(N)).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas clássicos de alocação de capacidade (ex: Koko Eating Bananas, Capacity to Ship)</text>

</svg>

| Metade Esquerda | Metade Direita | Condição de Validade |
|---|---|---|
| $\max(A[i-1], B[j-1])$ | $\min(A[i], B[j])$ | $\text{maxEsquerda} \le \text{minDireita}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É considerado um dos problemas mais célebres do LeetCode (Hard #4) por aplicar busca binária simultânea em duas partições de dados.

</details>
