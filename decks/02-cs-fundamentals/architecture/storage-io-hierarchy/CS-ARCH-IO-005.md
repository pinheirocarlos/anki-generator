---
id: CS-ARCH-IO-005
title: "Direct I/O (O_DIRECT) e Evitação de Double Buffering em Bancos de Dados"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::netflix
  - freq::high
---

## Pergunta
Quando bancos de dados relacionais contornam o Page Cache do sistema operacional utilizando a flag **`O_DIRECT`**?

## Resposta
### Quick Answer
**Solução Direta**:
- Bancos de dados de alta performance (como **MySQL InnoDB**, **PostgreSQL** e **Oracle**) implementam seu próprio *Buffer Pool* gerenciado em userspace com políticas de substituição customizadas (ex: variantes avançadas de LRU-2Q).
- **Problema do Double Buffering**: Se o banco ler dados pelo I/O buffered padrão, 1 página de 16 KB residirá no *Buffer Pool* do banco e outra cópia idêntica residirá no *Page Cache* do kernel, desperdiçando 50% da memória RAM do servidor em dados duplicados.
- **`O_DIRECT`**: Flag do Linux que instrui a syscall `open()` a contornar integralmente o Page Cache do kernel, transferindo blocos diretamente entre a memória da aplicação e o disco via DMA.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/direct-io-bypass-page-cache-loop.webm">
    <p>Visualização: Bancos de dados gerenciando seu próprio buffer pool em memória ignorando o Page Cache do Kernel.</p>
  </video>
</div>

| Estratégia de I/O | Caminho dos Dados | Risco de Duplicação de RAM |
|---|---|---|
| **Buffered I/O (Padrão)** | Disco $ightarrow$ Page Cache $ightarrow$ Buffer Pool | Alto (Dupla cópia em RAM) |
| **Direct I/O (`O_DIRECT`)** | Disco $ightarrow$ Buffer Pool (App Direct) | Zero (Cópia única e direta) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em C: Abertura com O_DIRECT
```c
#define _GNU_SOURCE
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>

void readDirect() {
  // Requer memória alinhada ao tamanho de bloco do setor de disco (ex: 4096 bytes):
  void* alignedBuffer;
  posix_memalign(&alignedBuffer, 4096, 4096);

  int fd = open("banco.db", O_RDONLY | O_DIRECT);
  read(fd, alignedBuffer, 4096);
  close(fd);
  free(alignedBuffer);
}
```

#### Key Takeaways
- O uso de `O_DIRECT` impõe restrições estritas: os buffers de memória, offsets de arquivo e tamanhos de transferência devem ser múltiplos exatos do setor lógico do disco (normalmente 512 ou 4.096 bytes).

</details>
