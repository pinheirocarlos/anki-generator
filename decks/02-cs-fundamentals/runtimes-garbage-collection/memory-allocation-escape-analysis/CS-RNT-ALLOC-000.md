---
id: CS-RNT-ALLOC-000
title: "Alocação de Memória: Stack vs Heap e Trade-offs de Performance"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre **Stack Allocation** e **Heap Allocation** em termos de velocidade e impacto no Garbage Collector?

## Resposta
### Quick Answer
**Solução Direta**:
- **Stack Allocation (Pilha)**:
  - Alocação ultra-rápida em **1 único ciclo de CPU** incrementando/decrementando o registrador Stack Pointer (`RSP`).
  - Escopo estritamente restrito ao tempo de vida do método atual; a desalocação é **instantânea e com custo zero** quando o método retorna.
  - Zero trabalho para o Garbage Collector; possui excelente localidade de cache L1/L2.
- **Heap Allocation (Monte)**:
  - Alocação dinâmica para objetos cujo tamanho é desconhecido em tempo de compilação ou cujo tempo de vida ultrapassa o retorno da função.
  - Exige busca em estruturas de gerenciamento de memória (*Size Classes / Free Lists*), gerando fragmentação.
  - Cria trabalho contínuo de rastreamento e varredura para o **Garbage Collector**, impactando a latência da aplicação.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/runtimes/stack-vs-heap-memory-allocation-loop.webm">
    <p>Visualização: Alocação e liberação instantânea por avanço de ponteiro (Stack) vs alocação dinâmica com gerenciamento de fragmentação (Heap).</p>
  </video>
</div>

| Métrica | Stack Allocation | Heap Allocation |
|---|---|---|
| **Custo de Alocação** | 1 ciclo de clock (`SUB RSP, N`) | Busca em blocos / Lock / Syscall |
| **Custo de Desalocação** | 0 ns (Automático ao retornar método) | Rastreamento e varredura pelo GC |
| **Localidade de Cache**| Máxima (Quente nos caches L1/L2) | Espalhada pela memória RAM |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Regra Prática de Otimização em Go / Java / Rust
- *"Mantenha dados na Stack sempre que possível"*.
- Projetar código que evita alocações desnecessárias no Heap reduz diretamente o tempo que a CPU gasta pausando ou executando ciclos de Garbage Collection.

#### Key Takeaways
- Alocações na Stack não precisam de locks de sincronização nem de algoritmos de rastreamento de ponteiros.

</details>
