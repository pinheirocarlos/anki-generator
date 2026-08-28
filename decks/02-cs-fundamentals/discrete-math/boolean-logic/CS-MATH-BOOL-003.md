---
id: CS-MATH-BOOL-003
title: "Propriedades do Operador XOR (Involução, Auto-Anulação e Busca de Elemento Único)"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
Quais são as propriedades algébricas fundamentais do **XOR ($oplus$)** e como a auto-anulação permite encontrar elementos únicos em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- O operador **XOR (Exclusive OR / $oplus$)** possui 4 propriedades algébricas essenciais:
  1. **Identidade**: $x \oplus 0 = x$
  2. **Auto-anulação (Involução)**: $x \oplus x = 0$
  3. **Comutatividade**: $x \oplus y = y \oplus x$
  4. **Associatividade**: $(x \oplus y) \oplus z = x \oplus (y \oplus z)$
- **Busca de Elemento Único**: Em um array onde todos os números aparecem 2 vezes exceto 1 único elemento, aplicar XOR cumulativo em todos os elementos anula todos os pares duplicados ($x \oplus x = 0$), restando unicamente o número isolado:
  $$\text{resultado} = a \oplus a \oplus b \oplus b \oplus c = 0 \oplus 0 \oplus c = c$$

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Propriedades Matemáticas do Operador XOR (^)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="85" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Auto-Anulação</text>
    <text x="85" y="45" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">x ^ x = 0</text>
    <text x="85" y="65" fill="#94a3b8" font-size="9" text-anchor="middle">Pares se cancelam</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Identidade Neutra</text>
    <text x="280" y="45" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">x ^ 0 = x</text>
    <text x="280" y="65" fill="#94a3b8" font-size="9" text-anchor="middle">Preserva o operando</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Involução (Reversibilidade)</text>
    <text x="475" y="45" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">(x ^ y) ^ y = x</text>
    <text x="475" y="65" fill="#94a3b8" font-size="9" text-anchor="middle">Base da Criptografia &amp; RAID 5</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Single Number Problem (LeetCode 136): Reduz array de O(N) espaço para O(1) com acumulador XOR.</text>

</svg>

| Propriedade XOR | Expressão Matemática | Efeito em Bits |
|---|---|---|
| **Elemento Neutro** | $x \oplus 0 = x$ | Preserva todos os bits de $x$ |
| **Auto-Anulação** | $x \oplus x = 0$ | Zera todos os bits idênticos |
| **Inversão Seletiva**| $x \oplus 1 = \neg x$ | Inverte o bit alvo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Single Number em $O(N)$ Tempo e $O(1)$ Espaço
```go
package main

func singleNumber(nums []int) int {
  unique := 0
  for _, x := range nums {
    unique ^= x // Pares duplicados se anulam mutuamente
  }
  return unique
}
```

#### Key Takeaways
- A propriedade $x \oplus y \oplus y = x$ é a base criptográfica de One-Time Pads (OTP), listas encadeadas XOR duplamente ligadas (*XOR Linked Lists*) e esquemas de paridade RAID-5.

</details>
