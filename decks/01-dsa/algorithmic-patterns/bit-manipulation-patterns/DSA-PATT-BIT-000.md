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
    <rect x="0" y="0" width="130" height="70" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="65" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">AND (&amp;)</text><text x="65" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">1 &amp; 1 = 1</text><text x="65" y="58" fill="#64748b" font-size="9" text-anchor="middle">Máscara / Clear</text>
    <rect x="140" y="0" width="130" height="70" fill="#1e293b" stroke="#10b981" rx="4"/><text x="205" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">OR (|)</text><text x="205" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">0 | 1 = 1</text><text x="205" y="58" fill="#64748b" font-size="9" text-anchor="middle">Ativar Bits (Set)</text>
    <rect x="280" y="0" width="130" height="70" fill="#1e293b" stroke="#f59e0b" rx="4"/><text x="345" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">XOR (^)</text><text x="345" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">1 ^ 1 = 0</text><text x="345" y="58" fill="#64748b" font-size="9" text-anchor="middle">Inversão / Cancel</text>
    <rect x="420" y="0" width="140" height="70" fill="#1e293b" stroke="#8b5cf6" rx="4"/><text x="490" y="22" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">SHIFTS (&lt;&lt;, &gt;&gt;)</text><text x="490" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">x &lt;&lt; 1 = x * 2</text><text x="490" y="58" fill="#64748b" font-size="9" text-anchor="middle">x &gt;&gt; 1 = x // 2</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Manipulação direta a nível de registradores elimina saltos condicionais e otimiza throughput</text>
</svg>
<p>Visualização: Operações lógicas bitwise fundamentais executadas em um único ciclo de clock na ALU do processador.</p>
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
