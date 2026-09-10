---
id: DSA-ADV-GAMETHEORY-001
title: "Algoritmo Minimax e Poda Alfa-Beta (Alpha-Beta Pruning) para Jogos com 2 Jogadores"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como a **Poda Alfa-Beta (Alpha-Beta Pruning)** reduz o número de nós avaliados pelo Algoritmo Minimax de $O(B^d)$ para $O(B^{d/2})$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo **Minimax** assume que o jogador MAX tenta maximizar a pontuação e MIN tenta minimizá-la.
- **Poda Alfa-Beta**: Mantém dois limites na árvore de recursão:
  - $\alpha$: A melhor pontuação que o jogador MAX já garantiu até o momento.
  - $\beta$: A melhor pontuação que o jogador MIN já garantiu até o momento.
- **Condição de Poda**: Se em qualquer nó for detectado que **$\beta \le \alpha$**, a busca naquele ramo é **imediatamente abortada**:
  - Significa que o oponente em um nível superior jamais permitirá que o jogo chegue a este estado, tornando inútil calcular seus filhos.
- **Complexidade**: Com ordenação ótima de jogadas, reduz a árvore de $O(B^d)$ para **$O(B^{d/2})$**, dobrando a profundidade explorável no mesmo tempo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Minimax com Poda Alpha-Beta (Alpha-Beta Pruning)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Condição de Corte: se beta ≤ alpha ➔ Interrompe Exploração do Ramo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">alpha: melhor valor já garantido para MAX | beta: melhor valor já garantido para MIN.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Em ordenação ótima de jogadas, reduz complexidade de O(bᵈ) para O(b^(d/2)), dobrando a profundidade explorável.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Fundamento de engines clássicas de xadrez, damas e jogos de tabuleiro adversariais</text>
</svg>
<p>Visualização: Árvore Minimax com poda Alfa-Beta descartando ramos irrelevantes quando o limite superior beta é menor ou igual a alfa.</p>

| Parâmetro de Poda | Papel na Busca | Condição de Corte |
|---|---|---|
| **$\alpha$ (Alfa)** | Maximizador (Piso de pontuação) | Se $\beta \le \alpha \implies$ Poda ramo |
| **$\beta$ (Beta)** | Minimizador (Teto de pontuação) | Se $\beta \le \alpha \implies$ Poda ramo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo central para motores de jogos clássicos como Xadrez, Damas e Jogo da Velha (Tic-Tac-Toe).

</details>
