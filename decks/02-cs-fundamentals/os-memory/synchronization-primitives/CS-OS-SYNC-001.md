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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mecânica de Sincronização: Spinlock vs Mutex vs Futex</text>
  <g transform="translate(50, 48)">
    <!-- Spinlock -->
    <rect x="0" y="0" width="180" height="95" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="90" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Spinlock (Busy-Wait)</text>
    <text x="90" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Queima CPU em loop CAS</text>
    <text x="90" y="58" fill="#fca5a5" font-size="9" text-anchor="middle">Latência: ~5 a 10 ns</text>
    <text x="90" y="74" fill="#a7f3d0" font-size="9" text-anchor="middle">Ideal p/ esperas curtíssimas</text>
    <text x="90" y="88" fill="#94a3b8" font-size="8" text-anchor="middle">Uso em Kernels e Drivers</text>

    <!-- OS Mutex -->
    <rect x="195" y="0" width="180" height="95" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="285" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">OS Mutex Tradicional</text>
    <text x="285" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Syscall a cada lock/unlock</text>
    <text x="285" y="58" fill="#fca5a5" font-size="9" text-anchor="middle">Latência: ~1.000 ns</text>
    <text x="285" y="74" fill="#94a3b8" font-size="9" text-anchor="middle">Coloca a thread para dormir</text>
    <text x="285" y="88" fill="#94a3b8" font-size="8" text-anchor="middle">Alto custo de syscall</text>

    <!-- Futex -->
    <rect x="390" y="0" width="190" height="95" rx="5" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="485" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Linux Futex (Padrão)</text>
    <text x="485" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Fast Userspace Mutex</text>
    <text x="485" y="58" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Sem contenção: Atomic CAS</text>
    <text x="485" y="74" fill="#fca5a5" font-size="9" text-anchor="middle">Com contenção: Syscall futex_wait()</text>
    <text x="485" y="88" fill="#a7f3d0" font-size="8" text-anchor="middle">Base de std::mutex / sync.Mutex</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Futex combina a velocidade ultrarrápida do atomic em espaço do usuário com a eficiência do Kernel sob contenção real.</text>

</svg>

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
