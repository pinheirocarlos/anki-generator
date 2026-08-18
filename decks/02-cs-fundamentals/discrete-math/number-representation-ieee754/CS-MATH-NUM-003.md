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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/ieee-754-floating-point-layout-loop.webm">
    <p>Visualização: Decomposição binária em 1 bit de sinal, 8 bits de expoente com bias e 23 bits de mantissa normalizada.</p>
  </video>
</div>

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
