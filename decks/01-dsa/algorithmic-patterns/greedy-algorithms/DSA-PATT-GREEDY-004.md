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
| Métrica Rastreada | Condição de Teste | Ação |
|---|---|---|
| **`totalTank`** | $\sum (\text{gas} - \text{cost}) < 0$ | Retorna $-1$ no final |
| **`currentTank`** | $\text{currentTank} < 0$ | Pula início: `start = i + 1` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A propriedade gulosa de que nenhum posto intermediário de uma sequência que falhou pode ser a resposta evita reiniciar a busca do zero $N$ vezes ($O(N^2) \to O(N)$).

</details>
