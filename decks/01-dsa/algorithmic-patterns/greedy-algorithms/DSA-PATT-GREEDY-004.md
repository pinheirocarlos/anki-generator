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
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Gas Station: Rastreamento do Tanque em Passada Única O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Propriedade: Se de A até B o tanque esgota, nenhum ponto entre A e B pode ser início viável</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">tank += gas[i] - cost[i]. Se tank &lt; 0: start = i + 1; tank = 0.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Condição global: se sum(gas) ≥ sum(cost), a solução única retornada é start; caso contrário, -1.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo linear estrito O(N) e espaço auxiliar estrito O(1)</text>
</svg>
<p>Visualização: Algoritmo guloso de Gas Station reiniciando o ponto de partida sempre que o saldo acumulado do tanque se torna negativo.</p>
| Métrica Rastreada | Condição de Teste | Ação |
|---|---|---|
| **`totalTank`** | $\sum (\text{gas} - \text{cost}) < 0$ | Retorna $-1$ no final |
| **`currentTank`** | $\text{currentTank} < 0$ | Pula início: `start = i + 1` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A propriedade gulosa de que nenhum posto intermediário de uma sequência que falhou pode ser a resposta evita reiniciar a busca do zero $N$ vezes ($O(N^2) \to O(N)$).

</details>
