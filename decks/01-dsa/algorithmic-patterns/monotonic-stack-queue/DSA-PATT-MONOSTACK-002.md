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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Largest Rectangle in Histogram com Pilha Monotônica em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Cálculo de Área de Barra como Altura Mínima</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao desempilhar barra de altura H: largura = i - stack.peek() - 1.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Área = H × largura. Rastreia max_area em uma única passada linear.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Substitui a abordagem quadrática O(N²) por complexidade linear ótima O(N)</text>

</svg>

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
