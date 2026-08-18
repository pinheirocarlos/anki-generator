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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/twos-complement-integer-overflow-loop.webm">
    <p>Visualização: Inversão de bits somada a 1 (~x + 1) unificando adição e subtração na ALU com wrap-around no estouro.</p>
  </video>
</div>

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
