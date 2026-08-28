---
id: CS-MATH-NUM-003
title: "Estrutura do Padrão IEEE 754: Sinal, Expoente com Bias e Mantissa"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::apple
  - freq::high
---

## Pergunta
Como o padrão **IEEE 754** divide números de ponto flutuante em *Sinal, Expoente com Bias e Mantissa (Fração)*?

## Resposta
### Quick Answer
**Solução Direta**:
- O padrão **IEEE 754** codifica números reais em 3 campos contíguos de bits:
  1. **Bit de Sinal ($S$)**: 1 bit (0 = positivo, 1 = negativo).
  2. **Expoente com Bias ($E$)**: 8 bits em `float32` (Bias = 127) ou 11 bits em `float64` (Bias = 1023). O expoente real é $E - \text{Bias}$.
  3. **Mantissa / Fração ($M$)**: 23 bits em `float32` ou 52 bits em `float64`. Assume um bit 1 implícito antes da vírgula ($1.M$) para números normalizados.
- **Fórmula de Decodificação**:
  $$\text{Valor} = (-1)^S \times (1 + M) \times 2^{E - \text{Bias}}$$

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura IEEE 754: Ponto Flutuante de Precisão Simples (Float32)</text>
  <g transform="translate(60, 48)">
    <!-- 32-bit layout -->
    <rect x="0" y="0" width="30" height="50" rx="4" fill="#f43f5e"/>
    <text x="15" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">S</text>
    <text x="15" y="42" fill="#fecaca" font-size="9" text-anchor="middle">1b</text>

    <rect x="35" y="0" width="160" height="50" rx="4" fill="#3b82f6"/>
    <text x="115" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Expoente com Bias (127)</text>
    <text x="115" y="42" fill="#bfdbfe" font-size="9" text-anchor="middle">8 bits</text>

    <rect x="200" y="0" width="360" height="50" rx="4" fill="#10b981"/>
    <text x="380" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Mantissa / Fração Normalizada (1.M)</text>
    <text x="380" y="42" fill="#bbf7d0" font-size="9" text-anchor="middle">23 bits</text>
  </g>
  <g transform="translate(60, 115)">
    <rect x="0" y="0" width="560" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">Valor = (-1)^S × (1 + Mantissa) × 2^(Expoente - 127)</text>
    <text x="280" y="42" fill="#94a3b8" font-size="10" text-anchor="middle">Float64 (Double): 1 bit sinal, 11 bits expoente (bias 1023), 52 bits mantissa (53 bits de precisão).</text>
  </g>

</svg>

| Tipo IEEE 754 | Expoente com Bias | Mantissa / Fração |
|---|---|---|
| **Single (`float32`)** | 8 bits (Bias 127) | 23 bits (~7 dígitos precisão) |
| **Double (`float64`)** | 11 bits (Bias 1023)| 52 bits (~16 dígitos precisão) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Decomposição de Bits
- Para representar o número $+1.5$:
  - Sinal $S = 0$.
  - Binário: $1.5 = 1.1_2 = 1.1_2 \times 2^0$.
  - Expoente real = 0 $\rightarrow$ Campo $E = 0 + 127 = 127$ (`01111111`).
  - Mantissa $M = 0.5$ (bit mais significativo da fração é 1 $\rightarrow$ `1000...000`).

#### Key Takeaways
- Como a mantissa tem tamanho finito (52 bits em double), frações binárias periódicas não podem ser representadas com precisão infinita.

</details>
