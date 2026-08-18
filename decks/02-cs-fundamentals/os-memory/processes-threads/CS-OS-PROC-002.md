---
id: CS-OS-PROC-002
title: "Goroutines e Green Threads vs Threads do Kernel do OS"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que são **Goroutines / Green Threads (Threads de Userspace)** e por que elas consomem apenas ~2 KB contra ~1 MB de uma Thread do Kernel?

## Resposta
### Quick Answer
**Solução Direta**:
- **OS Kernel Threads (1:1)**: Gerenciadas diretamente pelo kernel do sistema operacional. Cada thread aloca uma pilha de tamanho fixo grande (tipicamente **1 a 2 MB**) e sua alternância exige troca de modo (*Kernel Space Context Switch*).
- **Goroutines / Green Threads (M:N)**: Gerenciadas puramente em **Userspace** pelo runtime da linguagem (como Go ou Java Virtual Threads):
  - **Pilha Dinâmica Minúscula**: Iniciam com apenas **~2 KB de memória Stack** e crescem/encolhem dinamicamente sob demanda.
  - **Troca de Contexto Rápida**: A alternância ocorre em userspace sem invocar syscalls nem invalidar TLB, custando **~10 a 30 ns** contra ~1 a 2 µs de uma thread do SO.
- Permite que um único servidor execute **centenas de milhares de Goroutines simultâneas** consumindo poucos gigabytes de RAM.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/goroutines-m-to-n-scheduler-loop.webm">
    <p>Visualização: Goroutines leves (2KB) escalonadas em User Space vs Threads do Kernel (1-2MB) com sobrecarga de syscall.</p>
  </video>
</div>

| Característica | OS Kernel Thread | Goroutine (Go Runtime) |
|---|---|---|
| **Consumo Inicial de Stack** | ~1.048.576 bytes (1 MB fixo) | ~2.048 bytes (2 KB dinâmico) |
| **Tempo de Troca de Contexto**| ~1.000 a 2.000 ns (Syscall / Kernel) | ~15 a 30 ns (Userspace puro) |
| **Capacidade por Servidor** | Poucas milhares (~5.000) | Centenas de milhares (~500.000+) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Criando 100.000 Concorrências em Segundos
```go
package main

import (
  "sync"
  "time"
)

func main() {
  var wg sync.WaitGroup
  for i := 0; i < 100_000; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      time.Sleep(10 * time.Millisecond) // Ocupa apenas 2 KB de Stack
    }()
  }
  wg.Wait()
}
```

#### Key Takeaways
- O modelo de Goroutines viabilizou a substituição do modelo de I/O reativo complexo baseado em callbacks pelo modelo síncrono bloqueante imperativo com concorrência massiva transparente.

</details>
