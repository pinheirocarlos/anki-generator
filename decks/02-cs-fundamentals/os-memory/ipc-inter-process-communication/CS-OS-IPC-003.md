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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/posix-shared-memory-shm-loop.webm">
    <p>Visualização: Mapeamento do mesmo bloco de memória física nos espaços virtuais de dois processos para transferência em O(1).</p>
  </video>
</div>

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
