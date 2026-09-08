---
id: DSA-PATT-DIVCONQ-004
title: "Contagem de Inversões (Inversion Count) com Mergesort Modificado em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::meta
  - freq::high
---

## Pergunta
Como modificar a etapa de fusão do **Mergesort** para contar o número de inversões ($i < j$ com $A[i] > A[j]$) em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma inversão ocorre quando um elemento maior aparece antes de um menor no array.
- Durante a etapa de merge entre duas metades ordenadas `left[]` e `right[]`:
  - Se `right[j] < left[i]`: Como `left[]` está ordenado, todos os elementos restantes de `left[i]` até o fim da metade esquerda são estritamente maiores que `right[j]`.
  - Contabilizamos instantaneamente $(\text{mid} - i + 1)$ inversões em tempo $O(1)$.
- **Complexidade**: $O(N \log N)$ tempo contra $O(N^2)$ da contagem ingênua por pares.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Contagem de Inversões no Merge: (mid - i + 1) em O(1)</text>

  <g transform="translate(60, 48)">
    <!-- Metade Esquerda Ordenada -->
    <text x="75" y="14" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Subarray Esquerdo (Ordenado)</text>
    <rect x="0" y="22" width="50" height="38" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="25" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">2</text>
    <text x="25" y="74" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">i = 0</text>

    <rect x="55" y="22" width="50" height="38" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="80" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">4</text>

    <rect x="110" y="22" width="50" height="38" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="135" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">8</text>
    <text x="135" y="74" fill="#94a3b8" font-size="11" text-anchor="middle">mid = 2</text>

    <!-- Sinal de Comparacao -->
    <text x="195" y="46" fill="#f59e0b" font-size="16" font-weight="bold" text-anchor="middle">&gt;</text>

    <!-- Metade Direita Ordenada -->
    <text x="315" y="14" fill="#a855f7" font-size="11" font-weight="bold" text-anchor="middle">Subarray Direito (Ordenado)</text>
    <rect x="240" y="22" width="50" height="38" rx="4" fill="#7e22ce" stroke="#c084fc" stroke-width="2"/>
    <text x="265" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <text x="265" y="74" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">j = 0</text>

    <rect x="295" y="22" width="50" height="38" rx="4" fill="#581c87" stroke="#c084fc" stroke-width="1"/>
    <text x="320" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">3</text>

    <rect x="350" y="22" width="50" height="38" rx="4" fill="#581c87" stroke="#c084fc" stroke-width="1"/>
    <text x="375" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">5</text>

    <!-- Caixa de Calculo Instantaneo -->
    <rect x="425" y="12" width="140" height="68" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
    <text x="495" y="32" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Inversões Somadas:</text>
    <text x="495" y="50" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">mid - i + 1</text>
    <text x="495" y="68" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">= 2 - 0 + 1 = +3</text>
  </g>

  <!-- Explicacao Pedagógica -->
  <g transform="translate(60, 140)">
    <rect x="0" y="0" width="560" height="62" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="20" y="22" fill="#e2e8f0" font-size="11">Como <tspan fill="#c084fc" font-weight="bold">right[j] = 1</tspan> é menor que <tspan fill="#38bdf8" font-weight="bold">left[i] = 2</tspan> e a metade esquerda está ordenada:</text>
    <text x="20" y="40" fill="#f87171" font-size="11">Todos os elementos de i até mid (2, 4 e 8) formam inversões válidas com o número 1.</text>
    <text x="20" y="54" fill="#34d399" font-size="11" font-weight="bold">Complexidade Total: O(N log N) tempo e O(N) espaço mantendo estabilidade!</text>
  </g>
</svg>
<p>Visualização: Ao detectar right[j] &lt; left[i], o Mergesort soma (mid - i + 1) inversões em tempo O(1).</p>

| Condição no Merge | Relação de Valor | Inversões Somadas |
|---|---|---|
| `left[i] <= right[j]` | Normal (sem inversão) | $0$ |
| `left[i] > right[j]` | Inversão detectada | $+ (\text{mid} - i + 1)$ de uma vez |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz drasticamente a complexidade de problemas como *Count of Smaller Numbers After Self* e métricas de desordem de rankings.

</details>
