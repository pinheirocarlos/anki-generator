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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Máxima Soma de Subarray com Janela Fixa K = 3 em O(N)</text>
  <g transform="translate(100, 50)">
    <!-- Subarray -->
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="30" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">2</text><text x="30" y="10" fill="#f43f5e" font-size="10" text-anchor="middle">- Sai</text>
    <rect x="70" y="20" width="60" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/><text x="100" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">1</text>
    <rect x="140" y="20" width="60" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/><text x="170" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">5</text>
    <rect x="210" y="20" width="60" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/><text x="240" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">1</text><text x="240" y="10" fill="#10b981" font-size="10" text-anchor="middle">+ Entra</text>
    <rect x="280" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="310" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">3</text>
    <rect x="350" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="380" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">2</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" text-anchor="middle">Nova Soma = Soma Anterior (2+1+5=8) - 2 (saiu) + 1 (entrou) = 7. Max Soma = max(8, 7) = 8</text>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(N) tempo e O(1) espaço auxiliar</text>
</svg>
<p>Visualização: Deslocamento contínuo de janela fixa de tamanho K atualizando a soma máxima em tempo O(1).</p>

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
