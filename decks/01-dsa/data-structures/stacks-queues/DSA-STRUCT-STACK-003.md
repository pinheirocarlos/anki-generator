---
id: DSA-STRUCT-STACK-003
title: "Cenários de Aplicação Real: Pilhas (Call Stack) vs Filas (Job Buffers)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::apple
  - freq::high
---

## Pergunta
Em quais cenários reais de engenharia de software cada estrutura (Pilha vs Fila) é tipicamente aplicada?

## Resposta
### Quick Answer
**Solução Direta**:
- **Aplicações de Pilha (LIFO)**:
  - Call stack de execução de funções e recursão de programas.
  - Avaliação de expressões e parsing sintático (validação de parênteses).
  - Mecanismos de Desfazer/Refazer (`Undo/Redo`) e navegação no histórico de páginas do navegador (*Back button*).
- **Aplicações de Fila (FIFO)**:
  - Filas de processamento de tarefas em segundo plano (RabbitMQ, SQS, Celery).
  - Algoritmos de busca em largura (BFS) em grafos e árvores.
  - Buffers de I/O de streaming de vídeo e áudio.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/call-stack-frames-buffer-loop.webm">
    <p>Visualização: Empilhamento de stack frames na execução de funções vs enfileiramento assíncrono de jobs.</p>
  </video>
</div>

| Estrutura | Caso de Uso Canônico | Algoritmo Associado |
|---|---|---|
| **Pilha (Stack)** | Recursão / Parsing | DFS (Depth-First Search) |
| **Fila (Queue)** | Processamento de Mensagens | BFS (Breadth-First Search) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A escolha entre Pilha e Fila define diretamente a estratégia de exploração espacial de um algoritmo: profundidade (DFS com Pilha) vs largura por camadas (BFS com Fila).

</details>
