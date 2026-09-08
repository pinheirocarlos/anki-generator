---
id: DSA-PATT-MONOSTACK-004
title: "Maximal Rectangle em Matriz Binária Reduzido para Histogramas 1D em O(M·N)"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Como o problema **Maximal Rectangle** (LeetCode 85) em uma matriz binária é decomposto em chamadas repetidas de *Largest Rectangle in Histogram* em $O(M \times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um array de alturas de histograma `heights[]` de tamanho $N$ (número de colunas):
  - Para cada linha $r$ da matriz:
    - Para cada coluna $c$: se $\text{matrix}[r][c] == '1'$, incrementamos $\text{heights}[c]++$; se for $'0'$, resetamos $\text{heights}[c] = 0$.
    - Executamos o algoritmo **Largest Rectangle in Histogram** ($O(N)$) sobre o array `heights[]` acumulado até a linha $r$.
- **Complexidade**: $O(M \times N)$ tempo total e $O(N)$ espaço auxiliar.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Maximal Rectangle (LeetCode 85): Matriz 2D → Histogramas 1D</text>
  
  <g transform="translate(45, 45)">
    <!-- 2D Binary Matrix -->
    <text x="0" y="15" fill="#94a3b8" font-size="11" font-weight="bold">Matriz Binária 2D:</text>
    
    <g transform="translate(0, 25)">
      <!-- Row 0: [1, 0, 1, 0, 0] -->
      <text x="-15" y="16" fill="#64748b" font-size="9">r0</text>
      <rect x="0" y="0" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="11" y="15" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="25" y="0" width="22" height="22" fill="#1e293b" stroke="#334155" rx="2"/><text x="36" y="15" fill="#64748b" font-size="10" text-anchor="middle">0</text>
      <rect x="50" y="0" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="61" y="15" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="75" y="0" width="22" height="22" fill="#1e293b" stroke="#334155" rx="2"/><text x="86" y="15" fill="#64748b" font-size="10" text-anchor="middle">0</text>
      <rect x="100" y="0" width="22" height="22" fill="#1e293b" stroke="#334155" rx="2"/><text x="111" y="15" fill="#64748b" font-size="10" text-anchor="middle">0</text>

      <!-- Row 1: [1, 0, 1, 1, 1] -->
      <text x="-15" y="41" fill="#64748b" font-size="9">r1</text>
      <rect x="0" y="25" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="11" y="40" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="25" y="25" width="22" height="22" fill="#1e293b" stroke="#334155" rx="2"/><text x="36" y="40" fill="#64748b" font-size="10" text-anchor="middle">0</text>
      <rect x="50" y="25" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="61" y="40" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="75" y="25" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="86" y="40" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="100" y="25" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="111" y="40" fill="#fff" font-size="10" text-anchor="middle">1</text>

      <!-- Row 2: [1, 1, 1, 1, 1] -->
      <text x="-15" y="66" fill="#64748b" font-size="9">r2</text>
      <rect x="0" y="50" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="11" y="65" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="25" y="50" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="36" y="65" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="50" y="50" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="61" y="65" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="75" y="50" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="86" y="65" fill="#fff" font-size="10" text-anchor="middle">1</text>
      <rect x="100" y="50" width="22" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="111" y="65" fill="#fff" font-size="10" text-anchor="middle">1</text>
    </g>

    <!-- Arrow -->
    <path d="M 140 65 L 175 65" stroke="#f59e0b" stroke-width="2.5"/>

    <!-- 1D Accumulated Histogram per row -->
    <g transform="translate(195, 0)">
      <rect x="0" y="0" width="395" height="115" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="197" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Histogramas Acumulados Linha a Linha:</text>
      <text x="15" y="44" fill="#94a3b8" font-size="10">Linha 0: heights = [1, 0, 1, 0, 0] → Max Area = 1</text>
      <text x="15" y="64" fill="#94a3b8" font-size="10">Linha 1: heights = [2, 0, 2, 1, 1] → Max Area = 3</text>
      <text x="15" y="84" fill="#fde68a" font-size="10">Linha 2: heights = [3, 1, 3, 2, 2] → Max Area = 6 (h=2 × w=3)</text>
      <text x="15" y="104" fill="#38bdf8" font-size="10" font-weight="bold">Aplica Largest Rectangle in Histogram O(N) por linha</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Redução de Matriz 2D para M chamadas 1D: Complexidade Ótima O(M × N)</text>
</svg>

<p>Visualização: Redução de matriz 2D para histogramas acumulados linha a linha resolvidos por pilha monótona em O(M·N).</p>


| Linha da Matriz | Alturas de Histograma (`heights[]`) | Algoritmo Aplicado |
|---|---|---|
| Linha 0 | `[1, 0, 1, 0, 0]` | `largestRectangle(heights)` |
| Linha 1 | `[2, 0, 2, 1, 1]` | `largestRectangle(heights)` |
| Linha 2 | `[3, 1, 3, 2, 2]` | `largestRectangle(heights)` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz um problema aparentemente complexo em 2D para uma sequência de $M$ instâncias de um problema 1D já resolvido eficientemente por pilha monótona.

</details>
