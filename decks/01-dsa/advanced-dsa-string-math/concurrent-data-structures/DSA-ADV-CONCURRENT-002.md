---
id: DSA-ADV-CONCURRENT-002
title: "Fila Concorrente Lock-Free de Michael-Scott com Ponteiros Atômicos"
tags:
  - level::l3-junior
  - topic::dsa::concurrent-data-structures
  - company::meta
  - freq::high
---

## Pergunta
Como a **Fila de Michael-Scott (ConcurrentLinkedQueue)** implementa operações de enfileiramento e desenfileiramento lock-free usando dois ponteiros atômicos?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantém um nó sentinela fictício (`dummy node`) com ponteiros `head` e `tail` do tipo `AtomicReference`:
  - **Enqueue(x)**:
    1. Cria o novo nó.
    2. Lê `tail` e `tail.next`.
    3. Se `tail.next == null`, tenta avançar `tail.next` para o novo nó via CAS.
    4. Se bem-sucedido, tenta avançar o ponteiro global `tail` para o novo nó. Se outra thread já tiver avançado, auxilia no avanço (*helping mechanism*).
  - **Dequeue()**: Tenta avançar o ponteiro `head` para `head.next` via CAS e retorna o valor do nó.

### Dual Coding Visual
| Operação Concorrente | Mecanismo de Proteção | Propriedade Garantida |
|---|---|---|
| **Enqueue** | 2 passos com CAS + Helping | Lock-Free (Não bloqueia) |
| **Dequeue** | CAS sobre o ponteiro `head` | Thread-Safe FIFO |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base exata da classe `java.util.concurrent.ConcurrentLinkedQueue`.

</details>
