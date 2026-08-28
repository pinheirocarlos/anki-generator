---
id: DSA-PATT-BIT-004
title: "Single Number III: Separação de Grupos via Bit Isolado (diff & -diff)"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::google
  - freq::high
---

## Pergunta
Como resolver **Single Number III** (encontrar dois números únicos $X$ e $Y$ em meio a pares duplicados) isolando o bit mais à direita?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Calcula o XOR acumulado de todo o array: $\text{xor} = X \oplus Y$. Como $X \neq Y$, ao menos um bit de `xor` é $1$.
- 2. Isola o bit 1 menos significativo com **`diff = xor & (-xor)`**. Esse bit indica uma posição onde $X$ e $Y$ possuem bits opostos ($0$ e $1$).
- 3. Divide os elementos do array em dois grupos independentes com base nesse bit (`(num & diff) == 0` vs `!= 0`):
  - $X$ cairá no primeiro grupo e todos os seus pares duplicados se anulam.
  - $Y$ cairá no segundo grupo e todos os seus pares se anulam.
- **Complexidade**: $O(N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Isolamento do Bit Menos Significativo Ativo (LSB): n &amp; (-n)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Complemento de Dois: -n = (~n) + 1</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Exemplo: n = 12 (01100₂) → -n = 11100₂ → n &amp; (-n) = 00100₂ = 4 (LSB isolado).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Operação central da Fenwick Tree (Binary Indexed Tree / BIT) para atualizações O(log N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Isola a menor potência de 2 que compõe o número em 1 ciclo de instrução</text>

</svg>

| Grupo de Separação | Condição Bitwise | Resultado do XOR Acumulado |
|---|---|---|
| **Grupo 0** | `(num & diff) == 0` | Produz exatamente o número $X$ |
| **Grupo 1** | `(num & diff) != 0` | Produz exatamente o número $Y$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O isolamento do LSB (`diff & -diff`) atua como uma chave de particionamento binário perfeita em $O(1)$ memória.

</details>
