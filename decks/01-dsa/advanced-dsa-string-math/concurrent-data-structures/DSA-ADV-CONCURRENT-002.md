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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Michael-Scott Lock-Free Queue: Enqueue em Duas Etapas com CAS</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Passo 1: CAS em tail.next | Passo 2: Avanço de tail</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se tail.next == null: tenta CAS(tail.next, null, newNode).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Se outra thread já inseriu: ajuda avançando tail com CAS(tail, curTail, curTail.next).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Algoritmo cooperativo garantindo progresso do sistema (lock-free) sem deadlock</text>
</svg>
<p>Visualização: Fila concorrente de Michael-Scott garantindo inserção lock-free via CAS no ponteiro next da cauda.</p>
| Operação Concorrente | Mecanismo de Proteção | Propriedade Garantida |
|---|---|---|
| **Enqueue** | 2 passos com CAS + Helping | Lock-Free (Não bloqueia) |
| **Dequeue** | CAS sobre o ponteiro `head` | Thread-Safe FIFO |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base exata da classe `java.util.concurrent.ConcurrentLinkedQueue`.

</details>
