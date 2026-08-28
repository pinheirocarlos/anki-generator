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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Merge Sort: Divisão ao Meio e Intercalação Estável O(N log N)</text>
  <g transform="translate(120, 50)">
    <rect x="0" y="0" width="180" height="30" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="90" y="20" fill="#38bdf8" font-size="11" text-anchor="middle">Array [38, 27, 43, 3, 9, 82]</text>
    <line x1="90" y1="30" x2="45" y2="55" stroke="#3b82f6"/>
    <line x1="90" y1="30" x2="135" y2="55" stroke="#3b82f6"/>

    <rect x="0" y="55" width="90" height="24" fill="#1e293b" stroke="#64748b" rx="3"/><text x="45" y="71" fill="#94a3b8" font-size="9" text-anchor="middle">[38, 27, 43]</text>
    <rect x="100" y="55" width="90" height="24" fill="#1e293b" stroke="#64748b" rx="3"/><text x="145" y="71" fill="#94a3b8" font-size="9" text-anchor="middle">[3, 9, 82]</text>

    <g transform="translate(240, 15)">
      <path d="M 0 35 L 40 35" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)"/>
      <rect x="50" y="15" width="190" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
      <text x="145" y="38" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Merge([27,38,43], [3,9,82])</text>
      <text x="145" y="68" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">→ [3, 9, 27, 38, 43, 82]</text>
    </g>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante O(N log N) no pior caso e estabilidade de ordem com espaço O(N)</text>

</svg>

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
