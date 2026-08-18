---
id: CS-ARCH-IO-001
title: "Design de Append-Only Logs em Motores de Armazenamento (LSM-Trees / WAL)"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
Por que sistemas como **Kafka** e motores **LSM-Trees (RocksDB)** convertem todas as mutações em gravações sequenciais (*Append-Only Log / WAL*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Bancos de dados relacionais tradicionais baseados em **B-Trees** realizam escritas *in-place* aleatórias em páginas de 8/16 KB espalhadas pelo arquivo de dados, causando severa contenção de I/O aleatório e fragmentação.
- **Motores Log-Structured (LSM-Trees / Kafka)**:
  1. Todas as inserções, atualizações e deleções são gravadas exclusivamente no final de um arquivo sequencial (*Write-Ahead Log - WAL*).
  2. Mutações são mantidas em memória em uma estrutura ordenada (*MemTable*).
  3. Ao atingir um limite, a MemTable é descarregada no disco em arquivos imutáveis (*SSTables*) via I/O estritamente sequencial.
- Isso maximiza o throughput de gravação atingindo a vazão máxima teórica do SSD/HDD.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/append-only-log-sequential-io-loop.webm">
    <p>Visualização: Gravações sequenciais no final do arquivo eliminando rotações de disco e random writes no armazenamento.</p>
  </video>
</div>

| Estrutura de Armazenamento | Padrão de Escrita em Disco | Otimizado Para |
|---|---|---|
| **B-Tree Clássica (PostgreSQL / MySQL)** | In-Place Aleatório em páginas fixas | Leituras pontuais rápidas |
| **LSM-Tree / WAL (RocksDB / Kafka)** | Append-Only Estritamente Sequencial | Altíssimo throughput de gravação |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Escrita Sequencial de WAL
```go
package main

import (
  "encoding/binary"
  "os"
)

type WALWriter struct {
  file *os.File
}

func (w *WALWriter) AppendEntry(payload []byte) error {
  length := uint32(len(payload))
  // Grava cabeçalho de tamanho + payload sequencialmente no final do log:
  if err := binary.Write(w.file, binary.BigEndian, length); err != nil {
    return err
  }
  _, err := w.file.Write(payload)
  return err
}
```

#### Key Takeaways
- As deleções em LSM-Trees não removem dados imediatamente do arquivo; gravam um marcador de exclusão chamado **Tombstone**, que é consolidado posteriormente no processo em segundo plano de **Compaction**.

</details>
