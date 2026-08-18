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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dp-1d-fibonacci-loop.webm">
    <p>Visualização: Substituição do array completo por duas variáveis escalares prev1 e prev2 mantendo apenas a janela de dependência.</p>
  </video>
</div>

| Estratégia de DP | Fluxo de Computação | Estrutura de Controle |
|---|---|---|
| **Memoization (Top-Down)** | Problema Maior $\to$ Casos Base | Recursão + Cache (`memo[]`) |
| **Tabulation (Bottom-Up)** | Casos Base $\to$ Problema Maior | Loop iterativo (`for`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, começar descrevendo a intuição recursiva (Top-Down) e converter para a tabela iterativa (Bottom-Up) demonstra maturidade algorítmica completa.

</details>
