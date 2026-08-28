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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Append-Only Log (WAL) em Motores de Banco de Dados</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="70" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Write-Ahead Log (WAL) no Disco: Apenas Escrita Sequencial no Fim</text>
    
    <!-- Log entries -->
    <rect x="20" y="32" width="90" height="26" rx="3" fill="#065f46"/>
    <text x="65" y="49" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Tx 101 (OK)</text>

    <rect x="120" y="32" width="90" height="26" rx="3" fill="#065f46"/>
    <text x="165" y="49" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Tx 102 (OK)</text>

    <rect x="220" y="32" width="90" height="26" rx="3" fill="#065f46"/>
    <text x="265" y="49" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Tx 103 (OK)</text>

    <rect x="320" y="32" width="100" height="26" rx="3" fill="#047857" stroke="#34d399"/>
    <text x="370" y="49" fill="#ffffff" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">Tx 104 [APPEND]</text>

    <path d="M 430 45 L 470 45 M 460 38 L 470 45 L 460 52" stroke="#34d399" stroke-width="2" fill="none"/>
  </g>
  <rect x="60" y="135" width="560" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Vantagem: Transforma mutações aleatórias em I/O sequencial de alta velocidade.</text>
  <text x="340" y="172" fill="#94a3b8" font-size="10" text-anchor="middle">Garante durabilidade ACID (fsync no commit) sem pagar o custo de reorganizar árvores B-Tree no disco.</text>

</svg>

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
