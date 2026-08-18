---
id: CS-MATH-NUM-004
title: "Valores Especiais IEEE 754 (Subnormais, NaN, Infinito) e Penalidade de FPU"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que são **números Subnormais (Denormais)**, `NaN` e `Infinito` no padrão IEEE 754 e qual o impacto de performance na FPU?

## Resposta
### Quick Answer
**Solução Direta**:
- O padrão reserva combinações específicas no campo de expoente para estados especiais:
  - **$\pm \infty$ (Infinito)**: Expoente = todos 1 (`255` ou `2047`), Mantissa = 0 (resultado de divisões por zero: `1.0 / 0.0`).
  - **NaN (Not a Number)**: Expoente = todos 1, Mantissa $\neq$ 0 (resultado de `0.0 / 0.0` ou `sqrt(-1)`). Todo teste `NaN == NaN` retorna `false`.
  - **Subnormais (Denormais)**: Expoente = todos 0 (`000...0`), Mantissa $\neq$ 0. Permite *Underflow gradual* para valores extremamente próximos de zero ($0 < |x| < 2^{-1022}$).
- **Penalidade de Performance**: Muitas CPUs não processam subnormais no pipeline veloz da FPU e disparam microcode traps, causando lentidão de **10x a 100x** em loops intensivos.

### Dual Coding Visual
| Estado Especial | Padrão dos Bits | Comportamento em Execução |
|---|---|---|
| **Zero ($\pm 0$)** | Expoente 0 / Mantissa 0 | `+0.0 == -0.0` retorna `true` |
| **Subnormal** | Expoente 0 / Mantissa $\neq 0$ | Underflow gradual ($10\times$ mais lento) |
| **Infinito ($\pm \infty$)**| Expoente 1s / Mantissa 0 | Ultrapassou o maior expoente |
| **NaN** | Expoente 1s / Mantissa $\neq 0$ | Não ordenável (`x != x` é `true`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Desabilitar Subnormais em Processamento de Áudio/Jogos
- Em aplicações de tempo real (processamento de áudio DSP, motores de física), desenvolvedores ativam as flags da FPU **DAZ (Denormals-Are-Zero)** e **FTZ (Flush-To-Zero)** no registrador `MXCSR` da CPU, forçando qualquer subnormal a virar zero instantaneamente em 1 ciclo.

#### Key Takeaways
- A única forma confiável de checar se uma variável é `NaN` em código sem funções nativas é testar `x != x`.

</details>
