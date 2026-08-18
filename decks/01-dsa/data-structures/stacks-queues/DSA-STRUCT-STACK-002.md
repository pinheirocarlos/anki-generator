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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/double-ended-queue-deque-loop.webm">
    <p>Visualização: Inserções e remoções em O(1) em ambas as extremidades (front e rear) de um Deque.</p>
  </video>
</div>

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
