---
id: CS-MATH-NUM-006
title: "Intuição Fundamental de Ponto Flutuante (IEEE 754): Por que no Computador 0.1 + 0.2 != 0.3"
tags:
  - level::l2-fundamental
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Por que números decimais com vírgula (como 0.1) sofrem pequenos erros de precisão quando armazenados em ponto flutuante binário (IEEE 754)?

## Resposta
### Quick Answer
**Solução Direta**:
- Assim como a fração $1/3$ não pode ser escrita de forma exata com dígitos decimais finitos (vira a dízima periódica $0.3333...$), o número decimal $0.1 = 1/10$ se transforma em uma **dízima periódica infinita em base binária** ($0.0001100110011..._2$).
- Como o computador tem espaço limitado (32 ou 64 bits), ele é obrigado a cortar a dízima (*truncamento*). Quando você soma $0.1 + 0.2$, o resultado binário é $0.30000000000000004$, gerando um erro sutil, mas perigoso em cálculos financeiros.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Estrutura IEEE 754 Double Precision (64 bits): Notação Científica Binária</text>

  <!-- Bits breakdown -->
  <g transform="translate(40, 50)">
    <!-- Sinal 1 bit -->
    <rect x="0" y="0" width="50" height="60" fill="#ef4444" rx="4" />
    <text x="25" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Sinal</text>
    <text x="25" y="44" fill="#fee2e2" font-size="9" text-anchor="middle">1 bit</text>

    <!-- Expoente 11 bits -->
    <rect x="60" y="0" width="140" height="60" fill="#3b82f6" rx="4" />
    <text x="130" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Expoente (E)</text>
    <text x="130" y="44" fill="#dbeafe" font-size="9" text-anchor="middle">11 bits (Ordem de grandeza)</text>

    <!-- Mantissa 52 bits -->
    <rect x="210" y="0" width="310" height="60" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="365" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Mantissa / Fração (M)</text>
    <text x="365" y="44" fill="#ffffff" font-size="10" text-anchor="middle">52 bits (Dígitos significativos da precisão)</text>
  </g>

  <!-- Fórmula -->
  <text x="300" y="145" fill="#f8fafc" font-size="12" font-family="monospace" text-anchor="middle">Fórmula: (-1)^Sinal × 1.Mantissa × 2^(Expoente - 1023)</text>
  <text x="300" y="172" fill="#ef4444" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Regra de Ouro: NUNCA use float/double para dinheiro! Use inteiros (centavos) ou BigDecimal.</text>
</svg>

| Tipo Numérico | Como Armazena | Melhor Caso de Uso |
|---|---|---|
| **Inteiro (Int64 / Two's Comp)** | Exato e perfeito em base 2 | Contadores, IDs, dinheiro em centavos |
| **Float / Double (IEEE 754)** | Notação científica aproximada | Gráficos 3D, física, jogos, machine learning |
| **Decimal / BigDecimal** | Dígitos decimais exatos em software | Sistemas bancários e faturamento fiscal |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Metáfora da Régua Decimal vs Binária
- Em base 10, podemos representar frações que dividem 10 perfeitamente (como $1/2 = 0.5$ e $1/5 = 0.2$).
- Em base 2, só podemos representar frações que dividem potências de 2 ($1/2 = 0.5$, $1/4 = 0.25$, $1/8 = 0.125$).
- Como $1/10$ não é uma potência de 2, ele vira uma dízima sem fim, da mesma forma que tentar escrever $1/3$ em uma calculadora de 8 dígitos gera $0.33333333$.

#### Key Takeaways
- Complemento de Dois (*Two's Complement*) é a forma padrão universal de representar inteiros negativos em hardware sem precisar de circuitos separados de subtração.
- Testar igualdade estrita de floats (`if (val == 0.3)`) é um antipadrão: sempre compare com uma margem de tolerância (`if (abs(val - 0.3) < 1e-9)`).

</details>
