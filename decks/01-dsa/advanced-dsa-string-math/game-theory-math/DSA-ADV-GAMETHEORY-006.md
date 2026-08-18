---
id: DSA-ADV-GAMETHEORY-006
title: "Intuição Fundamental de Teoria dos Jogos (Minimax): Pensar na Melhor Jogada do Oponente"
tags:
  - level::l2-fundamental
  - topic::dsa::game-theory-math
  - company::google
  - freq::medium
---

## Pergunta
Qual é o modelo mental do algoritmo Minimax e como a Poda Alpha-Beta evita calcular galhos que um oponente inteligente nunca deixaria você alcançar?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo **Minimax** simula turnos alternados entre dois jogadores: você tenta **Maximizar sua pontuação** no seu turno, assumindo que seu oponente tentará **Minimizar sua pontuação** no turno dele.
- A **Poda Alpha-Beta** descarta ramos inteiros de cálculo quando percebe que o oponente já tem uma jogada comprovadamente melhor para anular aquela linha de raciocínio.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Minimax no Xadrez: Você Maximiza ➔ Oponente Minimiza</text>

  <!-- Turno MAX (Você) -->
  <g transform="translate(60, 45)">
    <!-- Raiz MAX -->
    <rect x="200" y="0" width="80" height="28" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4" />
    <text x="240" y="18" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">MAX: +5 ✓</text>
    <text x="70" y="18" fill="#34d399" font-size="11" font-weight="bold">Seu Turno (MAX):</text>

    <!-- Linhas de Decisão -->
    <line x1="220" y1="28" x2="150" y2="60" stroke="#10b981" stroke-width="2" />
    <line x1="260" y1="28" x2="330" y2="60" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3" />

    <!-- Turno MIN (Oponente) -->
    <text x="70" y="75" fill="#f87171" font-size="11" font-weight="bold">Turno Oponente (MIN):</text>
    
    <rect x="110" y="60" width="80" height="26" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" rx="3" />
    <text x="150" y="77" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">MIN: +5</text>

    <rect x="290" y="60" width="80" height="26" fill="#991b1b" stroke="#ef4444" stroke-width="1.5" rx="3" />
    <text x="330" y="77" fill="#fca5a5" font-size="10" text-anchor="middle">MIN: -10 (Poda ❌)</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Alpha-Beta Pruning: Se você já tem uma jogada garantida que rende +5, não precisa avaliar jogadas onde o oponente pode te punir com -10!</text>
</svg>

| Conceito | Ator | Objetivo na Árvore |
|---|---|---|
| **Nó MAX** | Você (IA do jogador) | Escolhe o caminho com o **maior valor possível** |
| **Nó MIN** | Oponente | Escolhe o caminho que deixa você com o **menor valor possível** |
| **Alpha-Beta Pruning** | Otimização | Poda galhos irrelevantes sem alterar o resultado final |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Jogo da Velha ou Xadrez
Ao planejar seu movimento:
- Você pensa: *"Se eu jogar aqui, qual é a pior coisa que ele pode me fazer?"*.
- O Minimax assume que o oponente nunca cometerá um erro bobo. Ele sempre jogará com perfeição matemática.

#### O Poder da Poda Alpha-Beta
No xadrez, existem mais jogadas possíveis que átomos no universo. O Minimax ingênuo travaria o computador. A poda Alpha-Beta permite que motores como Stockfish olhem 20 a 30 jogadas à frente podando mais de 99% das jogadas absurdas.

#### Key Takeaways
- É o fundamento da inteligência artificial clássica para jogos de tabuleiro e tomada de decisão com adversários.

</details>
