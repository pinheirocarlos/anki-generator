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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mediana de Dois Arrays Ordenados: Partição Binária Cruzada O(log(min(N, M)))</text>
  <g transform="translate(90, 45)">
    <!-- Array A -->
    <text x="-20" y="25" fill="#94a3b8" font-size="11" font-weight="bold">A:</text>
    <rect x="10" y="10" width="110" height="30" fill="#1e3a8a" stroke="#3b82f6" rx="3"/><text x="65" y="29" fill="#93c5fd" font-size="10" text-anchor="middle">A[0..i-1] (Esq)</text>
    <line x1="125" y1="5" x2="125" y2="45" stroke="#f59e0b" stroke-width="2.5"/>
    <rect x="130" y="10" width="110" height="30" fill="#1e293b" stroke="#64748b" rx="3"/><text x="185" y="29" fill="#e2e8f0" font-size="10" text-anchor="middle">A[i..N-1] (Dir)</text>

    <!-- Array B -->
    <text x="-20" y="75" fill="#94a3b8" font-size="11" font-weight="bold">B:</text>
    <rect x="10" y="60" width="140" height="30" fill="#1e3a8a" stroke="#3b82f6" rx="3"/><text x="80" y="79" fill="#93c5fd" font-size="10" text-anchor="middle">B[0..j-1] (Esq)</text>
    <line x1="155" y1="55" x2="155" y2="95" stroke="#f59e0b" stroke-width="2.5"/>
    <rect x="160" y="60" width="140" height="30" fill="#1e293b" stroke="#64748b" rx="3"/><text x="230" y="79" fill="#e2e8f0" font-size="10" text-anchor="middle">B[j..M-1] (Dir)</text>

    <!-- Condições de Partição -->
    <rect x="330" y="10" width="170" height="80" fill="#1e293b" stroke="#10b981" rx="4"/>
    <text x="415" y="30" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Condição de Partição:</text>
    <text x="345" y="50" fill="#f8fafc" font-size="10">A[i-1] &lt;= B[j]</text>
    <text x="345" y="68" fill="#f8fafc" font-size="10">B[j-1] &lt;= A[i]</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante metades balanceadas: Mediana = max(Esq) ou média(max(Esq), min(Dir))</text>
</svg>
<p>Visualização: Particionamento binário cruzado em O(log(min(N, M))) equilibrando as metades esquerda e direita dos dois arrays.</p>

| Metade Esquerda | Metade Direita | Condição de Validade |
|---|---|---|
| $\max(A[i-1], B[j-1])$ | $\min(A[i], B[j])$ | $\text{maxEsquerda} \le \text{minDireita}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É considerado um dos problemas mais célebres do LeetCode (Hard #4) por aplicar busca binária simultânea em duas partições de dados.

</details>
