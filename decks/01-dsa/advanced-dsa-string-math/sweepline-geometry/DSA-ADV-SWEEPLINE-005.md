---
id: DSA-ADV-SWEEPLINE-005
title: "União de Retângulos 2D (Rectangle Area II) com Sweep-Line e Segment Tree em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como a combinação de **Linha de Varredura** com **Árvore de Segmentos (Segment Tree)** calcula a área total da união de retângulos em $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada retângulo $[x_1, y_1, x_2, y_2]$:
  - Cria um evento em $x_1$ inserindo o intervalo vertical $[y_1, y_2]$ com peso $+1$.
  - Cria um evento em $x_2$ removendo o intervalo $[y_1, y_2]$ com peso $-1$.
- Ordenamos todos os eventos por $X$.
- Mantemos uma **Segment Tree com compressão de coordenadas em $Y$**:
  - A raiz da Segment Tree reporta em $O(1)$ o comprimento total coberto no eixo $Y$ (`totalCoveredY`).
  - Ao avançar da posição anterior $x_{\text{prev}}$ para a atual $x_{\text{curr}}$:
    $$\text{Área Acumulada} += \text{totalCoveredY} \times (x_{\text{curr}} - x_{\text{prev}})$$
- **Complexidade**: $O(N \log N)$ tempo contra $O(N^2)$ da abordagem sem Segment Tree.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Área de União de Retângulos: Sweep-Line + Segment Tree em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Discretização de Coordenadas Y</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Linha vertical varre eventos de início e fim de retângulos no eixo X.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Segment Tree mantém o comprimento total coberto no eixo Y: Área += ΔX · Y_covered.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve sobreposição massiva de milhares de retângulos em tempo O(N log N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Área de União de Retângulos: Sweep-Line + Segment Tree em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Discretização de Coordenadas Y</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Linha vertical varre eventos de início e fim de retângulos no eixo X.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Segment Tree mantém o comprimento total coberto no eixo Y: Área += ΔX · Y_covered.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve sobreposição massiva de milhares de retângulos em tempo O(N log N)</text>

</svg>

| Evento no Eixo $X$ | Atualização na Segment Tree | Cálculo da Área da Faixa |
|---|---|---|
| Avanço $X_{i-1} \to X_i$ | $\pm 1$ no intervalo $[y_1, y_2]$ | $\text{comprimentoY} \times (X_i - X_{i-1})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a técnica ideal para problemas de geometria computacional no LeetCode como *Rectangle Area II* (LeetCode 850).

</details>
