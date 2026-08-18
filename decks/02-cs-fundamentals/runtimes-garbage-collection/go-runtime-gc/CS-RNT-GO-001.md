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
