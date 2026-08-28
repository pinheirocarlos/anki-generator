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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Crivo de Eratóstenes: Primos até N em Tempo O(N log log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Marcação de Múltiplos com Array Booleano is_prime[]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para cada primo p de 2 até √N: marca múltiplos p², p²+p, p²+2p... como compostos.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite consultas de primalidade O(1) e fatoração em fatores primos em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Calcula todos os primos até 10⁷ em menos de 100 milissegundos</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Crivo de Eratóstenes: Primos até N em Tempo O(N log log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Marcação de Múltiplos com Array Booleano is_prime[]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para cada primo p de 2 até √N: marca múltiplos p², p²+p, p²+2p... como compostos.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite consultas de primalidade O(1) e fatoração em fatores primos em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Calcula todos os primos até 10⁷ em menos de 100 milissegundos</text>

</svg>

| Componente | Definição Matemática | Papel no Jogo |
|---|---|---|
| **MEX** | Menor inteiro $\ge 0$ ausente | Atribui valor ao estado |
| **Grundy XOR** | $G_1 \oplus G_2 \oplus \dots \oplus G_k$ | Determina vitória no jogo composto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a ferramenta universal mais importante da Teoria dos Jogos Combinatórios para resolver problemas compostos no LeetCode.

</details>
