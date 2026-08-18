---
id: CS-OS-VMEM-005
title: "Mapeamento de Arquivos com mmap() e Compartilhamento de Memória"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Como funciona o mapeamento de arquivos em memória com a syscall **`mmap()`** e quais suas vantagens de performance?

## Resposta
### Quick Answer
**Solução Direta**:
- A syscall **`mmap()`** mapeia um arquivo do disco ou um bloco de memória anônima diretamente no espaço de endereçamento virtual do processo.
- **Vantagens de Performance**:
  1. **Elimina Cópia de Buffer (Zero Userspace Copy)**: Em vez de chamar `read()` para copiar bytes do Page Cache do kernel para o buffer da aplicação, o programa lê e escreve diretamente através de ponteiros de memória (`*ptr`).
  2. **Paginação sob Demanda (Lazy Loading)**: O arquivo de 100 GB não é carregado na RAM; apenas as páginas tocadas pelo código são trazidas do disco via Page Faults controlados.
  3. **Compartilhamento Inter-Processos (IPC)**: Múltiplos processos podem mapear o mesmo arquivo com a flag `MAP_SHARED`, compartilhando dados em $O(1)$ sem pipes ou sockets.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/mmap-file-backed-virtual-memory-loop.webm">
    <p>Visualização: Mapeamento de arquivo diretamente nas páginas virtuais do processo com lazy loading sob demanda na primeira leitura.</p>
  </video>
</div>

| Estratégia de Leitura | Caminho dos Dados | Cópias de Memória |
|---|---|---|
| **Syscall `read()` Padrão** | Disco $	o$ Page Cache (Kernel) $	o$ Buffer (App) | 2 cópias |
| **Mapeamento via `mmap()`** | Disco $	o$ Page Cache $	o$ Ponteiro direto do App | 1 cópia única |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Leitura de Arquivo com mmap
```go
package main

import (
  "fmt"
  "os"
  "syscall"
)

func main() {
  f, _ := os.Open("dados.bin")
  defer f.Close()
  stat, _ := f.Stat()

  // Mapeia o arquivo inteiro na memória virtual como somente leitura:
  data, _ := syscall.Mmap(int(f.Fd()), 0, int(stat.Size()), syscall.PROT_READ, syscall.MAP_SHARED)
  defer syscall.Munmap(data)

  // Acesso direto via slice de bytes em memória sem chamar read():
  fmt.Printf("Primeiro byte: %c\n", data[0])
}
```

#### Key Takeaways
- Motores de indexação e bancos embutidos (como **BoltDB**, **LMDB** e **Lucene**) utilizam `mmap()` para delegar todo o gerenciamento de cache de disco e paginação ao kernel Linux.

</details>
