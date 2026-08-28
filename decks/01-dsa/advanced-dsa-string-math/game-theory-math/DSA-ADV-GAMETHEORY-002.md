---
id: DSA-ADV-GAMETHEORY-002
title: "Jogo de Nim e o Teorema de Bouton (Nim-Sum via XOR) em Tempo O(N)"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::meta
  - freq::high
---

## Pergunta
Como o **Teorema de Bouton** utiliza a **Soma de Nim (XOR acumulado das pilhas)** para determinar instantaneamente o vencedor do Jogo de Nim?

## Resposta
### Quick Answer
**Solução Direta**:
- Sejam $n$ pilhas de moedas com tamanhos $x_1, x_2, \dots, x_n$.
- A **Soma de Nim** é calculada como o XOR bitwise de todos os tamanhos de pilha:
  $$S = x_1 \oplus x_2 \oplus \dots \oplus x_n$$
- **Teorema de Bouton**:
  - Se **$S = 0$**: O estado é uma **P-Position** (o primeiro jogador perde com jogo perfeito).
  - Se **$S \neq 0$**: O estado é uma **N-Position** (o primeiro jogador vence garantidamente).
- **Estratégia Vencedora**: Sempre que $S \neq 0$, o jogador atual pode alterar uma pilha $x_k$ para $x_k' = x_k \oplus S < x_k$, restaurando a nova soma de Nim para $0$ e deixando o adversário em posição perdedora.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Euclides Estendido: Coeficientes de Bézout a·x + b·y = gcd(a, b)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cálculo de Inversos Modulares e Equações Diofantinas Lineares</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Recursão clássica: gcd(a, b) = gcd(b, a % b).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">No retorno, atualiza: x = y1, y = x1 - (a / b) · y1 em tempo O(log(min(a, b))).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Pedra fundamental da criptografia de chave pública RSA e ECC</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Euclides Estendido: Coeficientes de Bézout a·x + b·y = gcd(a, b)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cálculo de Inversos Modulares e Equações Diofantinas Lineares</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Recursão clássica: gcd(a, b) = gcd(b, a % b).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">No retorno, atualiza: x = y1, y = x1 - (a / b) · y1 em tempo O(log(min(a, b))).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Pedra fundamental da criptografia de chave pública RSA e ECC</text>

</svg>

| Soma de Nim ($S = \bigoplus x_i$) | Tipo de Posição | Destino do Primeiro Jogador |
|---|---|---|
| $S = 0$ | P-Position | Derrota garantida contra jogo perfeito |
| $S \neq 0$ | N-Position | Vitória garantida com jogada ótima |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Transforma a análise de combinações exponenciais de jogadas em um único cálculo linear de XOR $O(N)$ em tempo constante de memória $O(1)$.

</details>
