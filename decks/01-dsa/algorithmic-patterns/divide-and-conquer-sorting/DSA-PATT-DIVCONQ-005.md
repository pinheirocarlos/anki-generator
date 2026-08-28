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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Multiplicação Rápida de Karatsuba: O(N^(log₂ 3)) ≈ O(N^1.585)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Redução de 4 Multiplicações de Subproblemas para 3</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Divide números de N dígitos em partes altas e baixas: X = X1·10^(N/2) + X0.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Calcula z0 = X0·Y0, z2 = X1·Y1 e z1 = (X1+X0)·(Y1+Y0) - z2 - z0 com apenas 3 multiplicações.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base da biblioteca de números inteiros de precisão arbitrária (BigInt em Java/Python)</text>

</svg>

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
