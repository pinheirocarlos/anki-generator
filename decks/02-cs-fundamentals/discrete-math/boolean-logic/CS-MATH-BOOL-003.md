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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/xor-properties-self-canceling-loop.webm">
    <p>Visualização: Auto-anulação (A ^ A = 0) e elemento neutro (A ^ 0 = A) cancelando duplicatas em tempo linear.</p>
  </video>
</div>

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
