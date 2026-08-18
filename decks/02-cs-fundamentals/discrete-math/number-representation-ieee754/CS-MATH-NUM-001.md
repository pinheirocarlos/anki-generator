---
id: CS-MATH-NUM-001
title: "Inexatidão de Ponto Flutuante Binário e Tipos Decimais para Finanças"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
Por que a expressão `0.1 + 0.2 == 0.3` avalia como `false` em ponto flutuante IEEE 754 e como mitigar erros de precisão financeira?

## Resposta
### Quick Answer
**Solução Direta**:
- **Causa da Inexatidão**: Na base 10, frações como $0.1 = 1/10$ são exatas. Na base 2, $1/10$ se torna uma **dízima periódica binária infinita**:
  $$0.1_{10} = 0.00011001100110011..._2$$
- Ao truncar em 53 bits de precisão IEEE 754, ocorrem pequenos erros de arredondamento:
  $$0.1 + 0.2 = 0.3000000000000000444089... \neq 0.3$$
- **Mitigação Financeira**:
  1. Utilizar tipos **Ponto Fixo Decimal** (ex: `BigDecimal` em Java, `shopspring/decimal` em Go).
  2. Armazenar valores monetários como **inteiros na menor unidade fracionária** (ex: R$ 10,50 armazenado como `1050` centavos).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/floating-point-inaccuracy-01-02-loop.webm">
    <p>Visualização: Dízimas periódicas binárias (0.1 + 0.2 = 0.30000000000000004) exigindo tipos decimais em sistemas contábeis.</p>
  </video>
</div>

| Abordagem de Cálculo | Representação Interna | Risco de Arredondamento Financeiro |
|---|---|---|
| **`float64` / `double`** | Ponto flutuante binário IEEE 754 | Inaceitável (Dízima periódica em base 2) |
| **Inteiro em Centavos** | Inteiro puro de 64 bits (`int64`) | Zero erro (Aritmética exata) |
| **`BigDecimal`** | Base 10 com escala decimal configurada | Zero erro (Precisão arbitrária exata) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Comparação com Epsilon vs BigDecimal
```java
import java.math.BigDecimal;

public class FinancialCalc {
  public static void main(String[] args) {
    // 1. Comparação perigosa em float:
    double a = 0.1 + 0.2;
    System.out.println(a == 0.3); // false!

    // 2. Comparação segura com Epsilon:
    double EPSILON = 1e-9;
    boolean isEqual = Math.abs(a - 0.3) < EPSILON; // true

    // 3. Padrão Financeiro Profissional (BigDecimal):
    BigDecimal d1 = new BigDecimal("0.1");
    BigDecimal d2 = new BigDecimal("0.2");
    BigDecimal sum = d1.add(d2);
    System.out.println(sum.equals(new BigDecimal("0.3"))); // true
  }
}
```

#### Key Takeaways
- Nunca use `float` ou `double` para calcular juros, preços, saldos bancários ou transações financeiras em entrevistas de System Design e backend.

</details>
