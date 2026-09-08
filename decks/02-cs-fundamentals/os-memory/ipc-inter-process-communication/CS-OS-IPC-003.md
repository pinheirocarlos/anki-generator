---
id: CS-OS-IPC-003
title: "Memória Compartilhada POSIX (shm_open) para Transferência de Dados em O(1)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Por que a **Memória Compartilhada (Shared Memory / `shm_open`)** é o mecanismo de IPC de maior velocidade absoluta no sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- Todos os outros mecanismos de IPC (Pipes, Sockets, Filas de Mensagens) exigem que o dado seja copiado:
  $$\text{Buffer do Processo A} \xrightarrow{\text{Syscall}} \text{Buffer do Kernel} \xrightarrow{\text{Syscall}} \text{Buffer do Processo B}$$
- **Memória Compartilhada (Shared Memory)**:
  - O kernel faz com que as Tabelas de Páginas de ambos os processos apontem para os **mesmos frames de memória física RAM**.
  - O Processo A grava um dado no endereço `0x1000`, e o Processo B lê o dado **instantaneamente em tempo zero ($O(1)$)**, com **Zero Cópias de memória** e **Zero Syscalls**.
- **Desafio**: Como o kernel não faz mediação, os processos são responsáveis por sincronizar o acesso concorrente usando Mutexes compartilhados ou primitivas Atômicas Lock-Free.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Memória Compartilhada POSIX (shm_open) para Transferência em O(1)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="15" width="130" height="55" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="65" y="40" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Processo A</text>
    <text x="65" y="55" fill="#94a3b8" font-size="9" text-anchor="middle">Espaço Virtual A</text>

    <!-- Shared Physical Memory -->
    <rect x="180" y="0" width="200" height="85" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="26" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">RAM Física Compartilhada</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Mesmo PFN mapeado em ambos</text>
    <text x="280" y="68" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Zero-Copy Absoluto</text>

    <rect x="430" y="15" width="130" height="55" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="495" y="40" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Processo B</text>
    <text x="495" y="55" fill="#94a3b8" font-size="9" text-anchor="middle">Espaço Virtual B</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Processo A grava na memória e o Processo B lê instantaneamente; sincronização exige semáforos POSIX ou Mutex robustos.</text>

</svg>
<p>Visualização: Mapeamento de memória compartilhada POSIX conectando espaços virtuais distintos ao mesmo quadro físico de RAM com transferência O(1) Zero-Copy.</p>

| Mecanismo de IPC | Cópias de Dados por Mensagem | Envolve Syscalls a cada Mensagem? |
|---|---|---|
| **Pipes / Sockets** | 2 cópias (User $	o$ Kernel $	o$ User) | Sim (`write()` e `read()`) |
| **Shared Memory** | **0 cópias (Acesso direto à RAM)** | **Não (Acesso direto via ponteiro)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em C: Criando Bloco de Memória Compartilhada POSIX
```c
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

int main() {
    int fd = shm_open("/meu_bloco_shm", O_CREAT | O_RDWR, 0666);
    ftruncate(fd, 4096); // Aloca 4 KB
    char *ptr = mmap(0, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);

    ptr[0] = 'A'; // O outro processo lê 'A' instantaneamente na RAM!
    return 0;
}
```

#### Key Takeaways
- Shared Memory é amplamente utilizada em sistemas de trading de ultra-baixa latência (HFT), processamento de vídeo e no PostgreSQL para o *Shared Buffer Pool*.

</details>
