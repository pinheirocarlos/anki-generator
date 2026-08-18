---
id: DSA-STRUCT-STACK-001
title: "Implementação de MinStack com Consulta O(1) de Mínimo"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::bloomberg
  - freq::high
---

## Pergunta
Como manter a consulta do elemento mínimo (`getMin`) em **tempo constante $O(1)$** em uma `MinStack`?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos duas pilhas paralelas sincronizadas:
  1. `mainStack`: Armazena todos os elementos inseridos.
  2. `minStack`: Armazena o menor valor histórico visível até o nível atual.
- Ao executar `push(x)`:
  - Inserimos `x` na `mainStack`.
  - Inserimos $\min(x, \text{minStack.peek()})$ na `minStack`.
- Ao executar `pop()`: desempilhamos ambas simultaneamente.
- `getMin()` retorna `minStack.peek()` instantaneamente em $O(1)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/min-stack-tracking-loop.webm">
    <p>Visualização: Pilha auxiliar rastreia o valor mínimo corrente empilhado sincronizadamente com a pilha principal.</p>
  </video>
</div>

| Operação | Pilhas (`main` / `min`) | `getMin()` |
|---|---|---|
| `push(5)` | `[5]` / `[5]` | `5` |
| `push(3)` | `[5, 3]` / `[5, 3]` | `3` |
| `push(7)` | `[5, 3, 7]` / `[5, 3, 3]` | `3` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: `MinStack`
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class MinStack {
  private final Deque<Integer> stack = new ArrayDeque<>();
  private final Deque<Integer> minStack = new ArrayDeque<>();

  public void push(int val) {
    stack.push(val);
    int currentMin = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
    minStack.push(currentMin);
  }

  public void pop() {
    stack.pop();
    minStack.pop();
  }

  public int top() {
    return stack.peek();
  }

  public int getMin() {
    return minStack.peek();
  }
}
```

#### Key Takeaways
- A técnica gasta $O(N)$ de memória auxiliar para garantir que `getMin` execute em $O(1)$ sem necessidade de varrer a pilha.

</details>
