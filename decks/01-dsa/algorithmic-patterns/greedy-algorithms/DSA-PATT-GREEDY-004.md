---
id: DSA-PATT-GREEDY-004
title: "Gas Station (LeetCode 134) com Soma Cumulativa e Ponto de Partida em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::greedy-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Como provar que o problema **Gas Station (Postos de Combustível)** pode ser resolvido em uma única passagem linear $O(N)$ e $O(1)$ de espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- **Condição 1 (Existência Global)**: Se $\sum \text{gas}[i] < \sum \text{cost}[i]$, é matematicamente impossível completar o circuito; retorna $-1$.
- **Condição 2 (Identificação do Ponto de Início Guloso)**:
  - Mantemos um `currentTank = 0` e `startStation = 0`.
  - Iteramos pelos postos: $\text{currentTank} += \text{gas}[i] - \text{cost}[i]$.
  - Se $\text{currentTank} < 0$, nenhum posto entre `startStation` e $i$ pode ser o ponto de partida válido (pois todos acumularam saldo positivo intermediário que acabou falhando em $i$).
  - Reiniciamos `startStation = i + 1` e `currentTank = 0`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Jump Game: Rastreamento Guloso da Máxima Posição Alcançável</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">max_reach = max(max_reach, i + nums[i])</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o índice atual i &gt; max_reach → impossível avançar (retorna false).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Se max_reach &gt;= N - 1 → destino alcançado com sucesso (retorna true).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Substitui DP O(N²) por varredura gulosa em tempo linear O(N) e espaço O(1)</text>

</svg>

| Métrica Rastreada | Condição de Teste | Ação |
|---|---|---|
| **`totalTank`** | $\sum (\text{gas} - \text{cost}) < 0$ | Retorna $-1$ no final |
| **`currentTank`** | $\text{currentTank} < 0$ | Pula início: `start = i + 1` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A propriedade gulosa de que nenhum posto intermediário de uma sequência que falhou pode ser a resposta evita reiniciar a busca do zero $N$ vezes ($O(N^2) \to O(N)$).

</details>
