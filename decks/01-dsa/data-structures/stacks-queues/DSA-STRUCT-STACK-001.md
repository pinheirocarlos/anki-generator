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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Min Stack com Rastreamento Sincronizado O(1)</text>
  <g transform="translate(120, 50)">
    <!-- Main Stack -->
    <rect x="0" y="0" width="180" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="90" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Pilha Principal</text>
    <rect x="30" y="30" width="120" height="15" fill="#2563eb" rx="2"/><text x="90" y="42" fill="#fff" font-size="10" text-anchor="middle">val: 2 (Topo)</text>
    <rect x="30" y="47" width="120" height="15" fill="#1d4ed8" rx="2"/><text x="90" y="59" fill="#fff" font-size="10" text-anchor="middle">val: 6</text>
    <rect x="30" y="64" width="120" height="15" fill="#1e40af" rx="2"/><text x="90" y="76" fill="#fff" font-size="10" text-anchor="middle">val: 3 (Base)</text>

    <!-- Min Stack -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="180" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="90" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Pilha de Mínimos Auxiliar</text>
      <rect x="30" y="30" width="120" height="15" fill="#047857" rx="2"/><text x="90" y="42" fill="#fff" font-size="10" text-anchor="middle">min: 2 (min(2, 3))</text>
      <rect x="30" y="47" width="120" height="15" fill="#065f46" rx="2"/><text x="90" y="59" fill="#fff" font-size="10" text-anchor="middle">min: 3 (min(6, 3))</text>
      <rect x="30" y="64" width="120" height="15" fill="#0f766e" rx="2"/><text x="90" y="76" fill="#fff" font-size="10" text-anchor="middle">min: 3</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">getMin() retorna o topo da pilha auxiliar instantaneamente em tempo O(1)</text>

</svg>

<p>Visualização: Min Stack com rastreamento sincronizado mantendo consulta getMin() em O(1).</p>


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
