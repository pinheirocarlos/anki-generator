---
id: DSA-STRUCT-STACK-002
title: "Operações e Estrutura de Deques (Double-Ended Queues)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::google
  - freq::high
---

## Pergunta
Como funciona um **Deque (Double-Ended Queue)** e quais operações ele suporta em tempo $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Deque** é uma fila de extremidade dupla que generaliza pilhas e filas.
- Permite inserção e remoção em tempo $O(1)$ em ambas as extremidades:
  - `pushFirst` / `popFirst`: Inserção e remoção no início.
  - `pushLast` / `popLast`: Inserção e remoção no fim.
- Pode ser implementado de forma eficiente via lista duplamente encadeada ou vetor circular dinâmico (`ArrayDeque`).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Deque (Double-Ended Queue): Inserção e Remoção em Ambas as Pontas</text>
  <g transform="translate(80, 50)">
    <rect x="80" y="20" width="360" height="45" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="6"/>
    
    <!-- Front Ops -->
    <text x="30" y="35" fill="#38bdf8" font-size="10" font-weight="bold">push_front() →</text>
    <text x="30" y="55" fill="#f43f5e" font-size="10" font-weight="bold">← pop_front()</text>

    <!-- Interior items -->
    <rect x="100" y="28" width="60" height="30" fill="#2563eb" rx="3"/><text x="130" y="48" fill="#fff" font-size="11" text-anchor="middle">Item 1</text>
    <rect x="170" y="28" width="60" height="30" fill="#1e40af" rx="3"/><text x="200" y="48" fill="#94a3b8" font-size="11" text-anchor="middle">Item 2</text>
    <rect x="240" y="28" width="60" height="30" fill="#1e40af" rx="3"/><text x="270" y="48" fill="#94a3b8" font-size="11" text-anchor="middle">Item 3</text>
    <rect x="310" y="28" width="60" height="30" fill="#047857" rx="3"/><text x="340" y="48" fill="#fff" font-size="11" text-anchor="middle">Item 4</text>

    <!-- Back Ops -->
    <text x="450" y="35" fill="#10b981" font-size="10" font-weight="bold">← push_back()</text>
    <text x="450" y="55" fill="#f59e0b" font-size="10" font-weight="bold">pop_back() →</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Essencial para Janela Deslizante Monotônica e Algoritmo 0-1 BFS</text>

</svg>

<p>Visualização: Inserção e remoção em O(1) em ambas as extremidades do Deque.</p>


| Operação | Início (`First`) | Fim (`Last`) |
|---|---|---|
| **Inserção (`push`)** | $O(1)$ | $O(1)$ |
| **Remoção (`pop`)** | $O(1)$ | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: `ArrayDeque`
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class DequeExample {
  public static void main(String[] args) {
    Deque<Integer> deque = new ArrayDeque<>();
    deque.addFirst(10); // Início
    deque.addLast(20);  // Fim

    int first = deque.removeFirst(); // 10
    int last = deque.removeLast();   // 20
  }
}
```

#### Key Takeaways
- Em Java, `ArrayDeque` é consideravelmente mais rápido e consome menos memória do que a classe legada `java.util.Stack` (que possui overhead de sincronização com `Vector`).

</details>
