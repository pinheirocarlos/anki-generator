---
id: CS-MATH-NUM-000
title: "Complemento de Dois para Representação de Inteiros e Integer Overflow"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona a representação de inteiros em **Complemento de Dois** e como o hardware lida com **Integer Overflow**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Complemento de Dois**: É o padrão universal de representação de números inteiros com sinal na CPU. O bit mais significativo (MSB) atua com peso negativo ($-2^{N-1}$).
- **Cálculo de $-X$**: Inverte todos os bits de $X$ (`NOT`) e soma 1:
  $$-X = \sim X + 1$$
- **Vantagens**: Permite que a ALU execute subtrações usando o mesmo circuito físico de adição ($A - B = A + (-B)$) e possui **zero único** (`0000 0000` = 0).
- **Integer Overflow**: Ocorre quando o resultado ultrapassa a capacidade de bits (`MaxInt + 1` vira `MinInt`), gerando o flag de overflow (`OF`) na CPU sem disparar exceções por padrão em C/Go.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Complemento de Dois: Representação de Inteiros Negativos</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Mecânica: Inverte todos os bits e soma 1 (~x + 1)</text>
    <text x="280" y="44" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">+5 = 0b00000101 → Inverte: 0b11111010 → Soma 1: 0b11111011 (-5)</text>
    <text x="280" y="68" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Vantagem: Subtração (A - B) torna-se uma simples soma binária A + (~B + 1) na ALU!</text>
  </g>
  <text x="340" y="165" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Integer Overflow: Somar 1 ao maior int32 positivo (0x7FFFFFFF) resulta no menor número negativo (-2^31).</text>

</svg>
<p>Visualização: Representação de inteiros negativos em Complemento de Dois (~x + 1) e mecânica de detecção de integer overflow.</p>

| Valor Decimal (8 bits) | Representação Binária | Significado dos Bits |
|---|---|---|
| **$+127$ (Max)** | `0111 1111` | $0 \times (-128) + 127$ |
| **$0$** | `0000 0000` | Zero único e inequívoco |
| **$-1$** | `1111 1111` | $-128 + 127 = -1$ |
| **$-128$ (Min)** | `1000 0000` | $-128 + 0 = -128$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Wraparound de Inteiro
```go
package main

import (
  "fmt"
  "math"
)

func main() {
  var max int32 = math.MaxInt32 // 2.147.483.647 (0111...1111)
  overflowed := max + 1        // -2.147.483.648 (1000...0000)

  fmt.Printf("Max: %d -> Overflowed: %d\n", max, overflowed)
}
```

#### Key Takeaways
- O bug histórico de overflow na busca binária (`mid = (low + high) / 2`) ocorria quando `low + high` estourava `MaxInt32`. A forma segura é `mid = low + (high - low) / 2`.

</details>
