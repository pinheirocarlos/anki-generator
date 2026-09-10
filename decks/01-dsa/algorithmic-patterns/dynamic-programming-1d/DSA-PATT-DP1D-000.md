---
id: DSA-PATT-DP1D-000
title: "Subestrutura Ótima e Sobreposição de Subproblemas em Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::meta
  - freq::high
---

## Pergunta
Quais são as duas propriedades matemáticas fundamentais que qualificam um problema para resolução via **Programação Dinâmica (DP)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **1. Subestrutura Ótima (*Optimal Substructure*)**: A solução ótima do problema global pode ser construída a partir das soluções ótimas de seus subproblemas menores.
- **2. Sobreposição de Subproblemas (*Overlapping Subproblems*)**: O mesmo subproblema é recalculado repetidas vezes em múltiplos ramos da árvore recursiva (ex: $\text{fib}(3)$ sendo recalculado por $\text{fib}(5)$ e $\text{fib}(4)$).
- A Programação Dinâmica resolve cada subproblema exatamente uma única vez, armazenando o resultado em cache para consultas futuras em $O(1)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Paradigma de Programação Dinâmica: Subestrutura Ótima &amp; Sobreposição</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="130" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">1. Sobreposição de Subproblemas</text>
    <text x="15" y="45" fill="#f8fafc" font-size="11">Mesmos cálculos repetem-se na árvore.</text>
    <text x="15" y="62" fill="#93c5fd" font-size="11">Ex: Fib(5) resolve Fib(3) múltiplas vezes.</text>

    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">2. Subestrutura Ótima</text>
      <text x="15" y="45" fill="#f8fafc" font-size="11">Solução ótima construída de sub-ótimos.</text>
      <text x="15" y="62" fill="#a7f3d0" font-size="11">dp[i] = combinação ótima de dp[i-k].</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Armazenar subproblemas (Memoization/Tabulation) reduz complexidade de O(2ᴺ) para O(N)</text>
</svg>
<p>Visualização: Sobreposição de subproblemas e subestrutura ótima formando a base para memoization e tabulação.</p>

| Propriedade de DP | Definição | Exemplo Canônico |
|---|---|---|
| **Subestrutura Ótima** | Solução global composta de subsoluções | $DP[i] = DP[i-1] + DP[i-2]$ |
| **Sobreposição de Subproblemas** | Recálculo repetido de mesmos estados | Árvore recursiva de Fibonacci |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Problemas com subestrutura ótima mas **sem** sobreposição de subproblemas (subproblemas disjuntos) são resolvidos por *Divisão e Conquista* (ex: Mergesort), e não por DP.

</details>
