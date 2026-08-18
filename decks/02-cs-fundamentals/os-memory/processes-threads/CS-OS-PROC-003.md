---
id: CS-OS-PROC-003
title: "Estruturas de Dados do Kernel: PCB (Process Control Block) e TCB (Thread Control Block)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
Quais informações essenciais são salvas no **PCB (Process Control Block)** e no **TCB (Thread Control Block)** pelo sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- **PCB (Process Control Block - `task_struct` no Linux)**: Estrutura do kernel que representa o processo inteiro:
  - Identificador de processo (`PID`, `PPID`).
  - Ponteiro para a Tabela de Páginas de Memória Virtual (`struct mm_struct` / registrador `CR3`).
  - Tabela de File Descriptors abertos (`struct files_struct`).
  - Credenciais de segurança, permissões e estado de sinais Unix.
- **TCB (Thread Control Block)**: Estrutura que representa uma linha de execução dentro do processo:
  - Identificador de thread (`TID`).
  - Cópia salva dos registradores de CPU (`RIP, RSP, RAX, RBX...`).
  - Ponteiro para a Stack da thread.
  - Prioridade de escalonamento e afinidade de CPU.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/pcb-tcb-kernel-structs-loop.webm">
    <p>Visualização: Estruturas do Kernel armazenando estado de execução, prioridade, descritores de arquivo e mapeamento de memória.</p>
  </video>
</div>

| Estrutura do Kernel | Dados Armazenados | Escopo |
|---|---|---|
| **PCB (`task_struct`)** | Memória virtual, FDs, credenciais, PID | Global para todo o processo |
| **TCB** | Registradores de CPU, Stack Pointer (`RSP`), TID | Exclusivo de cada thread |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como o Linux Trata Threads (`clone()` Syscall)
- No kernel Linux, não existe uma estrutura totalmente separada para threads; tanto processos quanto threads são instâncias de `task_struct`.
- Ao criar uma thread com a syscall `clone()`, o kernel simplesmente compartilha os ponteiros `mm_struct` (memória) e `files_struct` (arquivos) da struct mãe, usando as flags `CLONE_VM` e `CLONE_FILES`.

#### Key Takeaways
- Essa uniformidade arquitetural do Linux faz com que o escalonador CFS escalone `tasks` de maneira homogênea, sem penalidade extra entre threads e processos leves.

</details>
