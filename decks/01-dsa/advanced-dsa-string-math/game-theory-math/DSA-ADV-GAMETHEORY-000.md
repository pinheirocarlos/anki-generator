---
id: DSA-ADV-GAMETHEORY-000
title: "Posições Vencedoras (N-Positions) e Perdedoras (P-Positions) em Jogos Imparciais"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::google
  - freq::high
---

## Pergunta
O que caracteriza as **Posições Vencedoras (N-Positions)** e **Perdedoras (P-Positions)** na Teoria dos Jogos Combinatórios sob jogo normal?

## Resposta
### Quick Answer
**Solução Direta**:
- Sob a **Convenção de Jogo Normal** (o último jogador a fazer um movimento válido vence):
  - **P-Position (Previous Player Wins - Posição Perdedora para quem joga)**:
    - O estado terminal (sem movimentos válidos) é uma P-Position.
    - De uma P-Position, **qualquer movimento possível** leva obrigatoriamente a uma N-Position.
  - **N-Position (Next Player Wins - Posição Vencedora para quem joga)**:
    - De uma N-Position, existe **ao menos um movimento válido** que transita para uma P-Position (deixando o oponente em estado de derrota).
- Um jogador perfeito sempre escolhe o movimento que força o oponente a cair em uma P-Position.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Jogos Imparciais: Posições Vencedoras (N) e Perdedoras (P)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="130" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Posição N (Next Player Wins)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Existe pelo menos 1 jogada para posição P.</text>
    <text x="15" y="60" fill="#a7f3d0" font-size="10">O jogador atual força a vitória.</text>

    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
      <text x="130" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Posição P (Previous Player Won)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Todas as jogadas válidas levam a posições N.</text>
      <text x="15" y="60" fill="#fca5a5" font-size="10">O jogador atual perde sob jogo perfeito.</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Propagação retroativa a partir dos estados terminais (onde não há movimentos válidos = P)</text>
</svg>
<p>Visualização: Grafo de estados em jogos imparciais classificando posições vencedoras (N) e perdedoras (P) a partir dos estados terminais.</p>
| Tipo de Posição | Significado Prático | Movimentos Disponíveis |
|---|---|---|
| **P-Position** | Quem está com a vez perde | Todos os movimentos levam a N-Positions |
| **N-Position** | Quem está com a vez vence | Ao menos 1 movimento leva a P-Position |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A determinação de vitória em jogos de soma zero finitos é obtida rotulando os estados dos nós do grafo de baixo para cima (retroanálise).

</details>
