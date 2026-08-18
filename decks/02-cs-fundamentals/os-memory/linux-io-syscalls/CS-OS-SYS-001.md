---
id: CS-OS-SYS-001
title: "Direct I/O (O_DIRECT) vs Buffered I/O e Page Cache"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é **Direct I/O (`O_DIRECT`)** e por que bancos de dados relacionais transacionais (como PostgreSQL e MySQL InnoDB) contornam o **Page Cache** do Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Buffered I/O (Padrão Linux)**:
  - Toda escrita com `write()` grava primeiro no **Page Cache do kernel** na RAM e retorna imediatamente (*Write-Back Assíncrono*).
  - O kernel decide quando descarregar para o disco (*Dirty Pages Flush*).
  - *Problema para Bancos*: Causa **Double Buffering** (o mesmo bloco de 16 KB fica duplicado no Buffer Pool do banco e no Page Cache do OS) e dificulta garantias estritas de durabilidade ACID.
- **Direct I/O (`O_DIRECT`)**:
  - Abre o arquivo contornando completamente o Page Cache do kernel.
  - A controladora lê e escreve diretamente entre o buffer de userspace da aplicação e o storage NVMe via DMA.
  - O banco de dados assume o controle total dos algoritmos de substituição de cache (LRU/Clock) e da ordem de gravação no WAL (*Write-Ahead Log*).

### Dual Coding Visual
| Modo de I/O | Passa pelo Page Cache do SO? | Risco de Duplicação de Memória |
|---|---|---|
| **Buffered I/O** | Sim (Retém em cache na RAM do kernel) | Sim (*Double Buffering* consome o dobro de RAM) |
| **Direct I/O (`O_DIRECT`)** | Não (Transfere direto via DMA) | Zero (Cache controlado 100% pelo banco) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Requisitos de Alinhamento de Hardware do `O_DIRECT`
- Ao usar `O_DIRECT`, o buffer de memória, o deslocamento no arquivo (*offset*) e o tamanho da gravação **devem ser múltiplos exatos do tamanho do setor do disco** (geralmente 4.096 bytes / 4 KB). Qualquer desalinhamento faz a syscall falhar com `EINVAL`.

#### Key Takeaways
- Bancos de dados de classe empresarial utilizam `O_DIRECT` para seus arquivos de dados principais e `fsync()` / `fdatasync()` nos arquivos de log de transações.

</details>
