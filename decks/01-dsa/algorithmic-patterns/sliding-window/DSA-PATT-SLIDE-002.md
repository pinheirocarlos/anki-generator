---
id: DSA-PATT-SLIDE-002
title: "Sliding Window de Tamanho Fixo K para Máxima Soma de Subarray"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::amazon
  - freq::high
---

## Pergunta
Como estruturar uma **Sliding Window de tamanho fixo $K$** para calcular a soma máxima de subarray em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Inicializa calculando a soma dos primeiros $K$ elementos (`somaAtual`).
- Itera com o ponteiro `right` de $K$ até $N-1$:
  1. Atualiza a janela: `somaAtual += arr[right] - arr[right - K]`.
  2. Atualiza o máximo global: `maxSoma = max(maxSoma, somaAtual)`.
- **Complexidade**: $O(N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Longest Substring Without Repeating Characters (Set / Map na Janela)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Rastreamento da Última Posição Vista last_idx[char]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao encontrar caractere repetido c: left = max(left, last_idx[c] + 1).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Comprimento da maior substring: max_len = max(max_len, right - left + 1).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo: O(N) em uma única passada | Espaço: O(min(N, Σ)) onde Σ é o alfabeto</text>

</svg>

| Passo de Janela Fixa | Operação Delta | Complexidade de Passo |
|---|---|---|
| **Entrada do elemento** | `soma += arr[right]` | $O(1)$ |
| **Saída do elemento** | `soma -= arr[right - K]` | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Janela Fixa
```java
public class FixedSlidingWindow {
  public static int maxSumSubarray(int[] nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];

    int maxSum = windowSum;
    for (int i = k; i < nums.length; i++) {
      windowSum += nums[i] - nums[i - k];
      maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
  }
}
```

#### Key Takeaways
- Em janelas fixas, o ponteiro esquerdo é determinado diretamente por $\text{left} = \text{right} - K + 1$.

</details>
