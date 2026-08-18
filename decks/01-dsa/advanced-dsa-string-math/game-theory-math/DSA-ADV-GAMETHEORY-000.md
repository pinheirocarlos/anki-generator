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
| Tipo de Posição | Significado Prático | Movimentos Disponíveis |
|---|---|---|
| **P-Position** | Quem está com a vez perde | Todos os movimentos levam a N-Positions |
| **N-Position** | Quem está com a vez vence | Ao menos 1 movimento leva a P-Position |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A determinação de vitória em jogos de soma zero finitos é obtida rotulando os estados dos nós do grafo de baixo para cima (retroanálise).

</details>
