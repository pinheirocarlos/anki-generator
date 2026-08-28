---
id: DSA-PATT-BIT-000
title: "Operadores Bitwise Fundamentais (AND, OR, XOR, NOT, Shifts) e Propriedades"
tags:
  - level::l3-junior
  - topic::dsa::bit-manipulation-patterns
  - company::google
  - freq::high
---

## Pergunta
Como funcionam os operadores bitwise fundamentais (`&`, `|`, `^`, `~`, `<<`, `>>`) e quais suas identidades matemáticas básicas?

## Resposta
### Quick Answer
**Solução Direta**:
- **AND (`&`)**: $1 \ \& \ 1 = 1$; todos os outros dão $0$ (usado para máscaras de filtragem).
- **OR (`|`)**: $0 \mid 0 = 0$; todos os outros dão $1$ (usado para ligar bits).
- **XOR (`^`)**: $x \oplus x = 0$, $x \oplus 0 = x$ (dá $1$ se os bits forem diferentes; usado para alternar bits e detectar elementos únicos).
- **NOT (`~`)**: Inverte todos os bits ($~x = -x - 1$ em complemento de dois).
- **Left Shift (`x << k`)**: Multiplica $x$ por $2^k$.
- **Right Shift (`x >> k`)**: Divide $x$ por $2^k$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operações Bitwise Fundamentais em Hardware (1 Ciclo de CPU)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="120" height="65" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="60" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">AND (&amp;)</text>
    <text x="60" y="42" fill="#f8fafc" font-size="10">1 &amp; 1 = 1</text>
    <text x="60" y="56" fill="#94a3b8" font-size="9">Máscara / Clear</text>

    <rect x="140" y="0" width="120" height="65" fill="#1e293b" stroke="#10b981" rx="4"/>
    <text x="200" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">OR (|)</text>
    <text x="200" y="42" fill="#f8fafc" font-size="10">0 | 1 = 1</text>
    <text x="200" y="56" fill="#94a3b8" font-size="9">Set Bit</text>

    <rect x="280" y="0" width="120" height="65" fill="#1e293b" stroke="#f59e0b" rx="4"/>
    <text x="340" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">XOR (^)</text>
    <text x="340" y="42" fill="#f8fafc" font-size="10">1 ^ 1 = 0</text>
    <text x="340" y="56" fill="#94a3b8" font-size="9">Toggle / Diff</text>

    <rect x="420" y="0" width="140" height="65" fill="#1e293b" stroke="#a855f7" rx="4"/>
    <text x="490" y="22" fill="#d8b4fe" font-size="11" font-weight="bold" text-anchor="middle">Shifting (&lt;&lt;, &gt;&gt;)</text>
    <text x="490" y="42" fill="#f8fafc" font-size="10">x &lt;&lt; 1 = x * 2</text>
    <text x="490" y="56" fill="#94a3b8" font-size="9">x &gt;&gt; 1 = x / 2</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Executadas diretamente pela ALU do processador em tempo O(1) de altíssima vazão</text>

</svg>

| Operador | Operação em Bits | Identidade Chave |
|---|---|---|
| **Operador AND** | Interseção de bits | $x \ \& \ x = x, \quad x \ \& \ 0 = 0$ |
| **Operador OR** | União de bits | $x \mid x = x, \quad x \mid 0 = x$ |
| **Operador XOR** | Diferença simétrica | $x \oplus x = 0, \quad x \oplus 0 = x$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Operações bitwise executam em 1 ciclo de clock da ALU, sendo as instruções mais rápidas da computação.

</details>
