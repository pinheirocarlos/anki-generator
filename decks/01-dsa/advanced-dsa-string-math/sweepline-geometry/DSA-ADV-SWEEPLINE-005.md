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
| Evento no Eixo $X$ | Atualização na Segment Tree | Cálculo da Área da Faixa |
|---|---|---|
| Avanço $X_{i-1} \to X_i$ | $\pm 1$ no intervalo $[y_1, y_2]$ | $\text{comprimentoY} \times (X_i - X_{i-1})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a técnica ideal para problemas de geometria computacional no LeetCode como *Rectangle Area II* (LeetCode 850).

</details>
