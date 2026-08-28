---
id: DSA-ADV-SWEEPLINE-004
title: "Par de Pontos Mais Próximos (Closest Pair of Points) via Divisão e Conquista em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como o algoritmo de Divisão e Conquista geométrico encontra o **Par de Pontos Mais Próximos** em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Ordena os pontos por coordenada $X$ e divide ao meio com uma linha vertical.
- 2. Resolve recursivamente para a metade esquerda e direita, obtendo a menor distância $d = \min(d_L, d_R)$.
- 3. **Faixa Central (*Strip*)**: Filtra os pontos que estão a uma distância $< d$ da linha vertical de divisão e ordena-os por $Y$.
- 4. **Teorema Geométrico de Densidade**: Para cada ponto na faixa central, basta compará-lo com no máximo **7 pontos subsequentes** na lista ordenada por $Y$, pois uma caixa $d \times 2d$ não pode conter mais de 8 pontos com distância mútua $\ge d$.
- **Complexidade**: $T(N) = 2T(N/2) + O(N) = O(N \log N)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Closest Pair of Points: Divisão e Conquista / Sweep-Line em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Faixa Central de Largura 2d</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Calcula menor distância d nas metades esquerda e direita.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Na faixa central [-d, +d], cada ponto precisa ser comparado com no máximo 7 vizinhos ordenados por Y.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Elimina o custo quadrático O(N²) de comparação todos-contra-todos</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Closest Pair of Points: Divisão e Conquista / Sweep-Line em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Faixa Central de Largura 2d</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Calcula menor distância d nas metades esquerda e direita.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Na faixa central [-d, +d], cada ponto precisa ser comparado com no máximo 7 vizinhos ordenados por Y.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Elimina o custo quadrático O(N²) de comparação todos-contra-todos</text>

</svg>

| Etapa do Algoritmo | Complexidade | Propriedade Chave |
|---|---|---|
| **Divisão e Conquista** | $2T(N/2)$ | Resolve metades esquerda e direita |
| **Faixa Central ($2d$)** | $O(N)$ | Compara com no máximo 7 vizinhos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Prova como uma análise geométrica rigorosa reduz um teste que seria quadrático na faixa central para tempo linear estrito.

</details>
