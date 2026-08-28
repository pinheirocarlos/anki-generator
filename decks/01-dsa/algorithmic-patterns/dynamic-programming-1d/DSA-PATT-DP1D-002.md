---
id: DSA-PATT-DP1D-002
title: "Memoization (Top-Down) vs Tabulation (Bottom-Up) em Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::google
  - freq::high
---

## Pergunta
Quais as diferenças estruturais e trade-offs entre **Memoization (Top-Down)** e **Tabulation (Bottom-Up)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Memoization (Top-Down)**: Mantém a estrutura recursiva natural descendo do problema maior para os subproblemas, guardando os retornos em um mapa/array (`memo[]`). Vantagem: calcula apenas os estados estritamente necessários. Desvantagem: overhead de chamadas de função e risco de StackOverflow.
- **Tabulation (Bottom-Up)**: Itera iterativamente a partir dos casos base até o estado final preenchendo uma tabela (`dp[]`). Vantagem: zero overhead de recursão e permite otimizações de espaço in-place ($O(1)$).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coin Change: dp[i] = min(dp[i - coin] + 1) para cada moeda</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transição de Estado 1D (Bottom-Up)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Casos base: dp[0] = 0; todos os outros dp[i] inicializados com infinito (INF).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Para cada quantia i de 1 até Amount: dp[i] = min_{c} (dp[i - c] + 1).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade de Tempo: O(Amount × Moedas) | Complexidade de Espaço: O(Amount)</text>

</svg>

| Estratégia de DP | Fluxo de Computação | Estrutura de Controle |
|---|---|---|
| **Memoization (Top-Down)** | Problema Maior $\to$ Casos Base | Recursão + Cache (`memo[]`) |
| **Tabulation (Bottom-Up)** | Casos Base $\to$ Problema Maior | Loop iterativo (`for`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, começar descrevendo a intuição recursiva (Top-Down) e converter para a tabela iterativa (Bottom-Up) demonstra maturidade algorítmica completa.

</details>
