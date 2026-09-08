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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Valores Especiais IEEE 754: NaN, Infinito e Subnormais</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="175" height="75" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="87" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">NaN (Not a Number)</text>
    <text x="87" y="42" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">0/0, sqrt(-1)</text>
    <text x="87" y="60" fill="#fecaca" font-size="9" text-anchor="middle">NaN ≠ NaN (sempre falso)</text>

    <rect x="190" y="0" width="180" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="280" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Infinito (±Inf)</text>
    <text x="280" y="42" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">1.0 / 0.0 → +Inf</text>
    <text x="280" y="60" fill="#fef3c7" font-size="9" text-anchor="middle">Exp = Todos 1, Mant = 0</text>

    <rect x="385" y="0" width="175" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="472" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Subnormais (Denormais)</text>
    <text x="472" y="42" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">Exp = 0, Mant ≠ 0</text>
    <text x="472" y="60" fill="#bfdbfe" font-size="9" text-anchor="middle">Penalidade grave de FPU</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Números subnormais podem tornar cálculos de FPU até 100x mais lentos se não tratados via flags FTZ/DAZ.</text>

</svg>
<p>Visualização: Codificação de valores especiais no padrão IEEE 754: NaN, infinitos positivo/negativo e números subnormais com penalidade de clock.</p>

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
