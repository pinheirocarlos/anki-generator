---
id: DSA-STRUCT-STACK-000
title: "Diferença Fundamental entre LIFO (Pilha) e FIFO (Fila)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre o princípio de acesso **LIFO (Pilha)** e **FIFO (Fila)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pilha / Stack (LIFO - Last In, First Out)**: O último elemento inserido (`push`) é o primeiro a ser removido (`pop`). Operações ocorrem exclusivamente no topo.
- **Fila / Queue (FIFO - First In, First Out)**: O primeiro elemento inserido no fim (`enqueue`) é o primeiro a ser removido no início (`dequeue`).
- Ambas as estruturas realizam suas operações primárias de inserção, remoção e consulta em tempo estritamente constante $O(1)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/lifo-stack-fifo-queue-loop.webm">
    <p>Visualização: Comparação visual de disciplinas de acesso: topo da pilha (LIFO) vs início e fim da fila (FIFO).</p>
  </video>
</div>

| Estrutura | Disciplina de Acesso | Ponto de Inserção / Remoção |
|---|---|---|
| **Pilha (Stack)** | LIFO (Último a entrar sai primeiro) | Topo / Topo |
| **Fila (Queue)** | FIFO (Primeiro a entrar sai primeiro) | Fim / Início |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Metáforas do Mundo Real
- **Pilha**: Uma pilha de pratos na cozinha. O último prato lavado é colocado em cima e será o primeiro a ser retirado.
- **Fila**: Uma fila de caixa de supermercado. O primeiro cliente a chegar é o primeiro a ser atendido.

#### Key Takeaways
- Ambas as estruturas impõem restrições intencionais de acesso (sem busca por índice arbitrário) para garantir invariantes de ordem e custo $O(1)$.

</details>
