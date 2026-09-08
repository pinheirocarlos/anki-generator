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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estruturas do Kernel: PCB (task_struct) e TCB</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">No Kernel do Linux, tanto processos quanto threads são instâncias de struct task_struct</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Contém: PID/TID, Estado de execução, Registradores de CPU, mm_struct (Ponteiro de Memória) e files_struct (FDs).</text>
    <text x="280" y="66" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Threads do mesmo processo compartilham os mesmos ponteiros mm e files (flag CLONE_VM | CLONE_FILES em clone()).</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">A flexibilidade da syscall clone() permite implementar desde threads POSIX até contêineres (Namespaces/Cgroups).</text>

</svg>
<p>Visualização: Estrutura interna da task_struct no kernel Linux compartilhando descritores de memória e arquivos entre threads irmãs.</p>

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
