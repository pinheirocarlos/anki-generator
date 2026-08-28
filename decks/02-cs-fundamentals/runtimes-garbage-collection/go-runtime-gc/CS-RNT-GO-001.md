---
id: CS-RNT-GO-001
title: "Escalonador do Go Runtime (GMP Model): Goroutines, OS Threads e Processadores"
tags:
  - level::l4-pleno
  - topic::cs::runtimes
  - company::uber
  - freq::high
---

## Pergunta
Como funciona a arquitetura **G-M-P (Goroutine, Machine, Processor)** do escalonador em nível de usuário do Go Runtime?

## Resposta
### Quick Answer
**Solução Direta**:
- O modelo **GMP** implementa o escalonamento $M:N$ em userspace:
  - **G (Goroutine)**: Representa a goroutine (Stack dinâmico de 2 KB, ponteiro de instrução e estado).
  - **M (Machine / OS Thread)**: Uma thread real do kernel do sistema operacional gerenciada pelo SO.
  - **P (Processor / Contexto Lógico)**: Representa os recursos necessários para executar código Go; a quantidade é fixada por `GOMAXPROCS` (geralmente igual ao número de núcleos de CPU lógicos). Cada $P$ possui sua própria **Fila Local de Execução (Local Run Queue - LRQ)** com até 256 goroutines.
- **Work Stealing**: Quando a fila local de um $P$ esvazia, ele tenta roubar metade das goroutines da fila local de outro $P$ vizinho, mantendo todos os núcleos 100% ocupados sem contenção de lock global.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Modelo GMP do Go Runtime: Goroutines (G), Threads (M) e Processadores (P)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="85" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">G (Goroutine)</text>
    <text x="85" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Stack de 2 KB + PC + status</text>
    <text x="85" y="60" fill="#a7f3d0" font-size="9" text-anchor="middle">Milhões em memória</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">P (Processador Lógico)</text>
    <text x="280" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Recurso de Execução</text>
    <text x="280" y="60" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">GOMAXPROCS (Fila Local LRQ)</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">M (OS Thread Real)</text>
    <text x="475" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Thread do Kernel do Linux</text>
    <text x="475" y="60" fill="#fef3c7" font-size="9" text-anchor="middle">Executa instruções na CPU</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Work-Stealing: Se a fila local de um P esvazia, ele rouba 50% das Goroutines da fila de outro processador em O(1).</text>

</svg>

| Entidade GMP | O que Representa | Quantidade no Sistema |
|---|---|---|
| **G (Goroutine)** | Tarefa concorrente leve | Centenas de milhares |
| **M (Thread do SO)**| Linha de execução física do kernel | Criada sob demanda (até 10.000) |
| **P (Processor)** | Token de execução e fila local | Fixo em `GOMAXPROCS` (ex: 8, 16) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O que Acontece em Syscalls Bloqueantes (Network vs File I/O)
- **Network I/O (Assíncrono via Netpoller)**: A goroutine $G$ é suspensa no Netpoller (baseado em `epoll`), liberando a thread $M$ para rodar outras goroutines do $P$ sem bloqueio.
- **Syscalls de Disco Bloqueantes**: A thread $M_1$ bloqueia na syscall do kernel. O runtime desassocia o processador $P$ de $M_1$ (*Handoff*) e o conecta a uma nova thread $M_2$ para continuar executando o restante da fila.

#### Key Takeaways
- Filas locais por processador $P$ eliminam a contenção de um lock global de escalonador, permitindo que o Go escale perfeitamente em servidores com 128+ núcleos de CPU.

</details>
