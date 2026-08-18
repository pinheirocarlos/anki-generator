---
id: DSA-STRUCT-STACK-004
title: "Implementação de Fila FIFO com Duas Pilhas LIFO em Custo O(1) Amortizado"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::microsoft
  - freq::high
---

## Pergunta
Como implementar uma **Fila FIFO utilizando duas Pilhas LIFO** garantindo custo $O(1)$ amortizado por operação?

## Resposta
### Quick Answer
**Solução Direta**:
- Utilizamos duas pilhas: `inStack` (para inserções) e `outStack` (para remoções).
- `push(x)`: Sempre insere no topo de `inStack` ($O(1)$).
- `pop()` / `peek()`:
  - Se `outStack` estiver vazia, desempilhamos todos os elementos de `inStack` e empilhamos em `outStack` (essa transferência inverte a ordem de LIFO para FIFO).
  - Desempilhamos o topo de `outStack`.
- Cada elemento é transferido de `inStack` para `outStack` exatamente uma vez ao longo de seu ciclo de vida, conferindo **custo amortizado $O(1)$**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/queue-two-stacks-transfer-loop.webm">
    <p>Visualização: Transferência em lote de stack_in para stack_out invertendo a ordem para consumo FIFO O(1) amortizado.</p>
  </video>
</div>

| Operação | Mecânica das Pilhas | Custo Amortizado |
|---|---|---|
| `push(x)` | Insere em `inStack` | $O(1)$ |
| `pop()` | Transfere para `outStack` se vazia | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prova de Custo Amortizado
- Para $N$ inserções e $N$ remoções, cada elemento sofre no máximo 2 operações de `push` e 2 operações de `pop` no total.
- Custo total para $2N$ operações = $4N$ passos.
- Custo médio por operação = $\frac{4N}{2N} = O(1)$.

#### Key Takeaways
- É um clássico de entrevistas técnicas para testar a compreensão de análise amortizada de algoritmos.

</details>
