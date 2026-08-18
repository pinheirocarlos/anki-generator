---
id: CS-OS-SYNC-001
title: "Mecânica e Latência: Spinlock vs OS Mutex vs Futex no Linux"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a diferença de consumo de CPU e latência entre um **Spinlock**, um **OS Mutex** clássico e um **Futex (Fast Userspace Mutex)** no Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Spinlock**: Executa um laço ativo de CPU (`busy-waiting` com instrução `PAUSE`) testando atomicamente se o lock foi liberado.
  - *Vantagem*: Latência mínima (**~10 ns**); zero overhead de troca de contexto de syscall.
  - *Desvantagem*: Queima 100% de uso de núcleo de CPU enquanto espera; desastroso se a seção crítica demorar.
- **OS Mutex Clássico**: Dispara uma syscall imediata para suspender a thread no kernel (*Sleep*) e colocá-la na fila de espera.
  - *Desvantagem*: Custo fixo pesado de duas trocas de contexto (**~1 a 2 µs**).
- **Futex (Fast Userspace Mutex / Padrão Linux)**: O melhor dos dois mundos:
  1. No caminho feliz sem contenção: adquire o lock em **userspace puro com 1 instrução atômica CAS (~5 ns)** sem tocar no kernel.
  2. Apenas se houver colisão concorrente real: invoca a syscall `futex(FUTEX_WAIT)` para dormir no kernel.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/futex-fast-userspace-mutex-loop.webm">
    <p>Visualização: Espera ocupada na CPU (Spinlock) vs suspensão da thread no kernel (Mutex) vs abordagem híbrida (Futex).</p>
  </video>
</div>

| Primitiva | Caminho Sem Contenção | Comportamento sob Contenção |
|---|---|---|
| **Spinlock** | CAS atômico (~5 ns) | Gira em loop ocupado (100% CPU) |
| **OS Mutex** | Syscall no kernel (~1 µs) | Suspende thread no kernel (0% CPU) |
| **Futex (Linux)** | CAS atômico puro (~5 ns) | Suspende via syscall futex (0% CPU) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Híbrido (Adaptive Mutex em Go e Java)
- Implementações modernas (como o `sync.Mutex` do Go e locks da JVM) utilizam uma abordagem adaptativa:
  - Giram em spinlock por alguns ciclos (ex: 30 tentativas rápidas) torcendo para a outra thread liberar o lock imediatamente.
  - Se o lock não for liberado rápido, desistem do spinlock e dormem usando o Futex do kernel, economizando CPU.

#### Key Takeaways
- Praticamente todas as primitivas de concorrência em Linux de Go (`sync.Mutex`), Rust (`std::sync::Mutex`), C++ (`std::mutex`) e Java são construídas sobre o Futex do kernel Linux.

</details>
