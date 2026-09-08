---
id: DSA-STRUCT-ADVTREE-000
title: "Limitação de Prefix Sums em Cenários Dinâmicos de Consulta e Atualização"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Por que arrays de soma de prefixos (*Prefix Sums*) falham em atender cenários com **consultas de intervalo e atualizações pontuais dinâmicas simultâneas**?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um array estático com **Prefix Sums**:
  - Consulta de soma de intervalo $\sum_{i=L}^R A[i] = P[R] - P[L-1]$ executa em tempo instantâneo $O(1)$.
  - **O Gargalo**: Quando um elemento pontual $A[i]$ é atualizado, todos os prefixos subsequentes ($P[i], P[i+1], \dots, P[N]$) precisam ser recalculados, custando **$O(N)$ linear**.
- Para $Q$ operações mistas de consulta e atualização, o custo total se torna $O(Q \times N)$.
- Estruturas como **Segment Tree** e **Fenwick Tree** equilibram ambos para **$O(\log N)$**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Segment Tree: Consultas de Intervalo e Atualizações O(log N)</text>
  <g transform="translate(140, 45)">
    <!-- Root [0-3] -->
    <circle cx="200" cy="20" r="16" fill="#047857" stroke="#10b981"/><text x="200" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Sum[0-3]</text>
    <line x1="185" y1="32" x2="115" y2="60" stroke="#64748b"/>
    <circle cx="100" cy="70" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="100" y="74" fill="#fff" font-size="9" text-anchor="middle">[0-1]</text>
    <line x1="215" y1="32" x2="285" y2="60" stroke="#64748b"/>
    <circle cx="300" cy="70" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="300" y="74" fill="#fff" font-size="9" text-anchor="middle">[2-3]</text>

    <!-- Leaves -->
    <line x1="90" y1="82" x2="60" y2="105" stroke="#475569"/>
    <circle cx="50" cy="115" r="12" fill="#1e293b" stroke="#475569"/><text x="50" y="118" fill="#94a3b8" font-size="8" text-anchor="middle">A[0]</text>
    <line x1="110" y1="82" x2="140" y2="105" stroke="#475569"/>
    <circle cx="150" cy="115" r="12" fill="#1e293b" stroke="#475569"/><text x="150" y="118" fill="#94a3b8" font-size="8" text-anchor="middle">A[1]</text>
  </g>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Query(L, R): O(log N) combinando subárvores canônicas disjuntas</text>

</svg>

<p>Visualização: Intervalo [L, R] decomposto em no máximo 2*log(N) nós canônicos.</p>

| Estrutura de Dados | Range Query (Consulta) | Point Update (Atualização) |
|---|---|---|
| **Array Simples** | $O(N)$ Varredura | $O(1)$ Direto no índice |
| **Prefix Sums** | $O(1)$ Subtração | $O(N)$ Recálculo em cascata |
| **Segment / Fenwick Tree** | $O(\log N)$ Balanceado | $O(\log N)$ Balanceado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Segment Trees e Fenwick Trees resolvem o dilema clássico da computação: equilibrar custo de leitura e custo de escrita para $O(\log N)$.

</details>
