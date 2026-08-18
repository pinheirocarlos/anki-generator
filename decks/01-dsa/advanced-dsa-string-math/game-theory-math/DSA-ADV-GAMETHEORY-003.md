---
id: DSA-ADV-GAMETHEORY-003
title: "Teorema de Sprague-Grundy e a Função MEX para Jogos Combinados e Grafos"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Teorema de Sprague-Grundy** e a função **MEX (Minimum Excluded Value)** convertem qualquer jogo imparcial em um jogo equivalente de Nim?

## Resposta
### Quick Answer
**Solução Direta**:
- **Função MEX (Minimum Excluded Value)**: Para um conjunto de inteiros não-negativos $S$, $\text{MEX}(S)$ é o menor inteiro $\ge 0$ que **não** pertence a $S$ (ex: $\text{MEX}(\{0, 1, 3\}) = 2$).
- **Valor de Grundy ($G(u)$)** de um estado $u$:
  $$G(u) = \text{MEX}(\{ G(v) : u \to v \text{ é uma jogada válida} \})$$
- **Teorema de Sprague-Grundy**: Qualquer jogo imparcial composto pela união de múltiplos subjogo independentes $J_1, J_2, \dots, J_k$ é matematicamente idêntico a um Jogo de Nim cujos tamanhos de pilhas são os valores de Grundy:
  $$G_{\text{global}} = G(J_1) \oplus G(J_2) \oplus \dots \oplus G(J_k)$$
  - Se $G_{\text{global}} \neq 0$, o primeiro jogador vence.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/fast-binary-exponentiation-bits-loop.webm">
    <p>Visualização: Elevação ao quadrado da base e multiplicação do acumulador quando o bit menos significativo do expoente for 1.</p>
  </video>
</div>

| Componente | Definição Matemática | Papel no Jogo |
|---|---|---|
| **MEX** | Menor inteiro $\ge 0$ ausente | Atribui valor ao estado |
| **Grundy XOR** | $G_1 \oplus G_2 \oplus \dots \oplus G_k$ | Determina vitória no jogo composto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a ferramenta universal mais importante da Teoria dos Jogos Combinatórios para resolver problemas compostos no LeetCode.

</details>
