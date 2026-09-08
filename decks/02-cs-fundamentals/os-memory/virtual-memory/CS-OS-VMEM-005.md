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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mapeamento de Arquivos com mmap()</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">mmap(addr, length, prot, flags, fd, offset)</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Projeta um arquivo de disco diretamente no espaço de endereçamento virtual da aplicação.</text>
    <text x="280" y="65" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Acesso por ponteiros C/Go (*ptr) dispensando read() e write() manuais com paginação por demanda.</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Arquitetura de armazenamento do LMDB, Kafka (índices), SQLite e motores de busca baseados em Lucene.</text>

</svg>
<p>Visualização: Mapeamento de arquivo em memória via syscall mmap() associando blocos de disco diretamente a endereços virtuais acessados via ponteiros.</p>

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
