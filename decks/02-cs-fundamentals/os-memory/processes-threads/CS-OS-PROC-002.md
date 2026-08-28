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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Goroutines e Green Threads vs Threads do Kernel do OS</text>
  <g transform="translate(50, 48)">
    <!-- Kernel Threads -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">OS Kernel Threads (Modelo 1:1)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Stack fixo grande: ~1 a 8 MB por thread</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Escalonamento via Kernel Syscall (~1.000 ns)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Limite prático: ~5.000 a 10.000 threads ativas</text>

    <!-- Goroutines -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Goroutines (Modelo M:N em User Space)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Stack dinâmico contíguo: Começa com apenas 2 KB</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Escalonamento em User Space (~10 a 20 ns)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Capacidade: Milhões de Goroutines concorrentes</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">O runtime do Go gerencia cooperativamente pontos de preempção em chamadas de função e I/O de rede não-bloqueante.</text>

</svg>

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
