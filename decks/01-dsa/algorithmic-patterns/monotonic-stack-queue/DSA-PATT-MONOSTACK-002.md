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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Daily Temperatures (LeetCode 739): Resolução com Pilha Monótona</text>
  
  <g transform="translate(50, 45)">
    <!-- Temperatures Array -->
    <text x="0" y="15" fill="#94a3b8" font-size="11" font-weight="bold">Temperaturas:</text>
    
    <g transform="translate(0, 25)">
      <!-- Day 0: 73 -->
      <rect x="0" y="0" width="45" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="22" y="18" fill="#f8fafc" font-size="12" text-anchor="middle">73°</text>
      <text x="22" y="30" fill="#64748b" font-size="9" text-anchor="middle">d=0</text>

      <!-- Day 1: 74 -->
      <rect x="50" y="0" width="45" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="72" y="18" fill="#f8fafc" font-size="12" text-anchor="middle">74°</text>
      <text x="72" y="30" fill="#64748b" font-size="9" text-anchor="middle">d=1</text>

      <!-- Day 2: 75 -->
      <rect x="100" y="0" width="45" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="122" y="18" fill="#f8fafc" font-size="12" text-anchor="middle">75°</text>
      <text x="122" y="30" fill="#64748b" font-size="9" text-anchor="middle">d=2</text>

      <!-- Day 3: 71 -->
      <rect x="150" y="0" width="45" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="172" y="18" fill="#f8fafc" font-size="12" text-anchor="middle">71°</text>
      <text x="172" y="30" fill="#64748b" font-size="9" text-anchor="middle">d=3</text>

      <!-- Day 4: 69 -->
      <rect x="200" y="0" width="45" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="222" y="18" fill="#f8fafc" font-size="12" text-anchor="middle">69°</text>
      <text x="222" y="30" fill="#64748b" font-size="9" text-anchor="middle">d=4</text>

      <!-- Day 5: 72 (Warmer arrival!) -->
      <rect x="250" y="0" width="45" height="35" fill="#065f46" stroke="#10b981" stroke-width="2" rx="3"/>
      <text x="272" y="18" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">72°</text>
      <text x="272" y="30" fill="#34d399" font-size="9" text-anchor="middle">d=5</text>
    </g>

    <!-- Stack State & Resolution -->
    <g transform="translate(320, 0)">
      <rect x="0" y="0" width="260" height="115" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Ao processar Dia 5 (72°):</text>
      <text x="15" y="42" fill="#fde68a" font-size="10">1. 72° &gt; 69° (Dia 4) → res[4] = 5 - 4 = 1 dia</text>
      <text x="15" y="62" fill="#fde68a" font-size="10">2. 72° &gt; 71° (Dia 3) → res[3] = 5 - 3 = 2 dias</text>
      <text x="15" y="82" fill="#94a3b8" font-size="10">3. 72° &lt; 75° (Dia 2) → Para desempilhar</text>
      <text x="15" y="102" fill="#38bdf8" font-size="10" font-weight="bold">4. Empilha índice 5 (72°)</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Pilha monótona decrescente de índices resolve cada dia em O(1) amortizado</text>
</svg>

<p>Visualização: Pilha de índices aguardando temperaturas maiores para resolver a distância em dias.</p>


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
