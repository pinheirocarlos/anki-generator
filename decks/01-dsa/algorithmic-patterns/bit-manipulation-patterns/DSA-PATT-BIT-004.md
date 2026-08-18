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
| Grupo de Separação | Condição Bitwise | Resultado do XOR Acumulado |
|---|---|---|
| **Grupo 0** | `(num & diff) == 0` | Produz exatamente o número $X$ |
| **Grupo 1** | `(num & diff) != 0` | Produz exatamente o número $Y$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O isolamento do LSB (`diff & -diff`) atua como uma chave de particionamento binário perfeita em $O(1)$ memória.

</details>
