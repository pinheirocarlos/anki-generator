---
id: DSA-PATT-MONOSTACK-003
title: "Monotonic Queue / Deque para Sliding Window Maximum (LeetCode 239) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Como um **Monotonic Deque** obtém o valor máximo de cada janela deslizante em **Sliding Window Maximum** em tempo estritamente linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um **Deque Monótono Decrescente** que armazena os índices dos elementos:
  1. **Remoção de Elementos Expirados**: Remove do início do deque índices que saíram da janela: `deque.peekFirst() <= i - K`.
  2. **Manutenção da Monotonicidade**: Remove do fim do deque todos os índices cujos valores sejam menores que o elemento atual (`nums[deque.peekLast()] < nums[i]`), pois eles jamais poderão ser o máximo enquanto `nums[i]` estiver na janela.
  3. Adiciona $i$ ao fim do deque.
  4. O elemento máximo da janela ativa reside sempre em **`nums[deque.peekFirst()]`** em $O(1)$.
- **Complexidade**: $O(N)$ tempo contra $O(N \log K)$ do Heap.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sliding Window Maximum (LeetCode 239) via Monotonic Deque</text>
  
  <g transform="translate(40, 45)">
    <!-- Array with Window Highlight [1, 3, -1, -3, 5, 3, 6, 7] -->
    <text x="0" y="15" fill="#94a3b8" font-size="11" font-weight="bold">Array &amp; Janela Ativa (k=3):</text>
    
    <g transform="translate(0, 25)">
      <!-- Elements -->
      <rect x="0" y="0" width="40" height="35" fill="#1e293b" stroke="#334155" rx="3"/>
      <text x="20" y="22" fill="#64748b" font-size="12" text-anchor="middle">1</text>
      
      <!-- Active Window [3, -1, -3] -->
      <rect x="45" y="-4" width="135" height="43" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" rx="4"/>
      
      <rect x="45" y="0" width="40" height="35" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="3"/>
      <text x="65" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">3</text>
      
      <rect x="90" y="0" width="40" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="110" y="22" fill="#f8fafc" font-size="12" text-anchor="middle">-1</text>
      
      <rect x="135" y="0" width="40" height="35" fill="#1e293b" stroke="#3b82f6" rx="3"/>
      <text x="155" y="22" fill="#f8fafc" font-size="12" text-anchor="middle">-3</text>

      <rect x="180" y="0" width="40" height="35" fill="#1e293b" stroke="#334155" rx="3"/>
      <text x="200" y="22" fill="#64748b" font-size="12" text-anchor="middle">5</text>

      <rect x="225" y="0" width="40" height="35" fill="#1e293b" stroke="#334155" rx="3"/>
      <text x="245" y="22" fill="#64748b" font-size="12" text-anchor="middle">3</text>
    </g>

    <!-- Monotonic Deque -->
    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="280" height="115" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="140" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Deque Monótono Decrescente</text>
      
      <!-- Front: Max Candidate -->
      <rect x="20" y="32" width="70" height="30" fill="#065f46" stroke="#10b981" rx="3"/>
      <text x="55" y="47" fill="#a7f3d0" font-size="9" text-anchor="middle">Front: idx 1</text>
      <text x="55" y="58" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">(val: 3)</text>
      
      <!-- Back items -->
      <rect x="100" y="32" width="70" height="30" fill="#1e40af" stroke="#3b82f6" rx="3"/>
      <text x="135" y="47" fill="#bfdbfe" font-size="9" text-anchor="middle">Mid: idx 2</text>
      <text x="135" y="58" fill="#ffffff" font-size="10" text-anchor="middle">(val: -1)</text>

      <rect x="180" y="32" width="70" height="30" fill="#1e40af" stroke="#3b82f6" rx="3"/>
      <text x="215" y="47" fill="#bfdbfe" font-size="9" text-anchor="middle">Back: idx 3</text>
      <text x="215" y="58" fill="#ffffff" font-size="10" text-anchor="middle">(val: -3)</text>

      <text x="140" y="85" fill="#fde68a" font-size="10" text-anchor="middle">Ao chegar 5: descarta -3, -1 e 3 do fim!</text>
      <text x="140" y="102" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">peekFirst() retorna o máximo da janela em O(1)</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Deque de índices descarta dominados e garante custo amortizado total O(N)</text>
</svg>

<p>Visualização: Deque monótono descartando elementos menores do fim e mantendo o máximo no início em O(1).</p>


| Estrutura para Janela Máxima | Consulta do Máximo | Custo por Deslizamento |
|---|---|---|
| **Max-Heap** | $O(1)$ na raiz | $O(\log K)$ Inserção / Deleção |
| **Monotonic Deque** | $O(1)$ em `peekFirst` | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Sliding Window Maximum
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class SlidingWindowMax {
  public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] res = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
      // 1. Remove fora da janela
      if (!deque.isEmpty() && deque.peekFirst() <= i - k) {
        deque.pollFirst();
      }
      // 2. Remove menores
      while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
        deque.pollLast();
      }
      deque.offerLast(i);
      // 3. Coleta resultado
      if (i >= k - 1) {
        res[i - k + 1] = nums[deque.peekFirst()];
      }
    }
    return res;
  }
}
```

#### Key Takeaways
- Eliminar candidatos subótimos do fim do deque é o segredo para manter o máximo sempre no início em $O(1)$.

</details>
