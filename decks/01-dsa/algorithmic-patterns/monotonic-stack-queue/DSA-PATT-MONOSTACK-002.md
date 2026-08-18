---
id: DSA-PATT-MONOSTACK-002
title: "Daily Temperatures (LeetCode 739) e Contagem de Dias até Temperatura Maior em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::amazon
  - freq::high
---

## Pergunta
Como a **Monotonic Stack** resolve o problema **Daily Temperatures** (dias de espera até um dia mais quente) em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma **Pilha Monótona Decrescente** armazenando os **índices** dos dias:
  - Para cada dia $i$ com temperatura $T[i]$:
    - Enquanto a pilha não estiver vazia e a temperatura de hoje for maior que a do topo ($T[i] > T[\text{stack.peek()}]]$):
      - Desempilhamos o índice anterior `prevIndex = stack.pop()`.
      - Calculamos a quantidade de dias de espera: `result[prevIndex] = i - prevIndex`.
    - Empilhamos o índice atual $i$.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/largest-rectangle-histogram-stack-loop.webm">
    <p>Visualização: Cálculo da largura máxima quando a barra atual limita a altura de expansão dos elementos empilhados.</p>
  </video>
</div>

| Estado da Pilha | Temperatura Atual $T[i]$ | Ação |
|---|---|---|
| $T[i] \le T[\text{topo}]$ | Mais fria/igual | Empilha $i$ (mantém ordem decrescente) |
| $T[i] > T[\text{topo}]$ | Mais quente | Desempilha e calcula $\Delta = i - \text{topo}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Daily Temperatures
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class DailyTemperatures {
  public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] res = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
      while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
        int prev = stack.pop();
        res[prev] = i - prev;
      }
      stack.push(i);
    }
    return res;
  }
}
```

#### Key Takeaways
- Armazenar os índices na pilha (em vez dos valores) permite obter tanto o valor quanto a distância relativa em $O(1)$.

</details>
