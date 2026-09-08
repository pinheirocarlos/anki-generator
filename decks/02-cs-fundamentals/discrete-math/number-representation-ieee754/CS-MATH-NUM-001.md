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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inexatidão de Float Binário: Por Que 0.1 + 0.2 ≠ 0.3</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">0.1 em binário é uma dízima periódica infinita: 0.0001100110011...</text>
    <text x="280" y="44" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">0.1 + 0.2 = 0.300000000000000044408920985006...</text>
    <text x="280" y="70" fill="#fef3c7" font-size="11" font-weight="bold" text-anchor="middle">Regra para Finanças &amp; Bancos: NUNCA use float/double para valores monetários!</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Solução: Inteiros representando centavos (int64) ou tipos decimais exatos (BigDecimal / shopspring/decimal).</text>

</svg>
<p>Visualização: Inexatidão de ponto flutuante binário por dízima periódica (0.1 + 0.2 != 0.3) e adoção de tipos decimais de precisão exata.</p>

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
