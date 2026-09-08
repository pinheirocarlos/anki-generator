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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Segment Tree: Decomposição Canônica de Consulta [1, 5] em O(log N)</text>

  <g transform="translate(40, 45)">
    <!-- Root [0-7] -->
    <rect x="250" y="0" width="100" height="24" rx="4" fill="#1e293b" stroke="#64748b"/>
    <text x="300" y="16" fill="#94a3b8" font-size="10" text-anchor="middle">[0-7] Parcial</text>

    <!-- Level 1 -->
    <line x1="260" y1="24" x2="160" y2="45" stroke="#475569"/>
    <rect x="110" y="45" width="100" height="24" rx="4" fill="#1e293b" stroke="#64748b"/>
    <text x="160" y="61" fill="#94a3b8" font-size="10" text-anchor="middle">[0-3] Parcial</text>

    <line x1="340" y1="24" x2="440" y2="45" stroke="#475569"/>
    <rect x="390" y="45" width="100" height="24" rx="4" fill="#1e293b" stroke="#64748b"/>
    <text x="440" y="61" fill="#94a3b8" font-size="10" text-anchor="middle">[4-7] Parcial</text>

    <!-- Level 2 - Canonical Selected Nodes -->
    <line x1="130" y1="69" x2="70" y2="90" stroke="#10b981" stroke-width="2"/>
    <rect x="25" y="90" width="90" height="24" rx="4" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="70" y="106" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">A[1] ✓ Selecionado</text>

    <line x1="190" y1="69" x2="230" y2="90" stroke="#10b981" stroke-width="2"/>
    <rect x="185" y="90" width="90" height="24" rx="4" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="230" y="106" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">[2-3] ✓ Canônico</text>

    <line x1="410" y1="69" x2="370" y2="90" stroke="#10b981" stroke-width="2"/>
    <rect x="325" y="90" width="90" height="24" rx="4" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="370" y="106" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">[4-5] ✓ Canônico</text>

    <line x1="470" y1="69" x2="510" y2="90" stroke="#475569"/>
    <rect x="465" y="90" width="90" height="24" rx="4" fill="#1e293b" stroke="#64748b"/>
    <text x="510" y="106" fill="#64748b" font-size="10" text-anchor="middle">[6-7] Fora</text>
  </g>

  <text x="340" y="180" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Resultado da consulta [1, 5] = A[1] + [2-3] + [4-5] com apenas 3 agregações O(log N)</text>
</svg>

<p>Visualização: Decomposição de consulta de intervalo em nós canônicos da Segment Tree em O(log N).</p>

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
