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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/fixed-sliding-window-k-sum-loop.webm">
    <p>Visualização: Janela de amplitude constante K avançando a cada iteração mantendo o acumulador máximo.</p>
  </video>
</div>

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
