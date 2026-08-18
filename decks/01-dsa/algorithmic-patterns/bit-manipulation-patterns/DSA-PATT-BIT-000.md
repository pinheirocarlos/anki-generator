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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bitwise-operations-truth-table-loop.webm">
    <p>Visualização: Execução direta na ALU em 1 ciclo de instrução para operações lógicas bit a bit.</p>
  </video>
</div>

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
