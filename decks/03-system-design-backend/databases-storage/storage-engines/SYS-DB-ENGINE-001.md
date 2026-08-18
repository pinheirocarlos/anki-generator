---
id: SYS-DB-ENGINE-001
title: "Mecanismo LSM-Tree (Log-Structured Merge-Tree): MemTable, WAL, SSTable e Compaction"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::google
  - freq::high
---

## Pergunta
Como a arquitetura Log-Structured Merge-Tree (LSM-Tree) converte escritas aleatórias em I/O sequencial através de MemTable, WAL e SSTables?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo de Escrita LSM-Tree**:
  1. A escrita é gravada no **Write-Ahead Log (WAL)** no disco em modo *append-only* sequencial (durabilidade contra crash).
  2. O dado é inserido na **MemTable** (estrutura em memória como SkipList ou Red-Black Tree ordenada).
  3. Quando a MemTable atinge seu limite (ex: 64 MB), ela é descarregada (*Flushed*) para o disco como uma **SSTable (Sorted String Table)** imutável.
- **Compaction**: Processo em background que mescla múltiplas SSTables antigas, remove duplicatas/tombstones e gera novas SSTables ordenadas (*Merge Sort* sequencial).
- Maximiza o throughput de escrita ao eliminar *Random Disk Seeks*.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/lsm-tree-memtable-wal-sstable-compaction-loop.webm">
    <p>Visualização: LSM-Tree gravando em WAL e MemTable em memória com flush assíncrono para SSTables imutáveis em disco.</p>
  </video>
</div>

| Componente LSM | Localização | Papel Funcional |
|---|---|---|
| **WAL** | Disco (Append-only) | Garante durabilidade imediata com I/O sequencial |
| **MemTable** | Memória RAM | Buffer ordenado para leituras e escritas instantâneas |
| **SSTable** | Disco (Imutável) | Arquivos ordenados mesclados via Compaction |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estratégias de Compaction (RocksDB / Cassandra)
- **Size-Tiered Compaction**: Mescla SSTables de tamanhos similares; ótimo para escritas pesadas, mas exige mais espaço temporário em disco.
- **Leveled Compaction**: Divide SSTables em níveis $L_0, L_1, L_2...$ (cada nível $10x$ maior que o anterior); garante chaves disjuntas em $L_1+$, acelerando leituras.

</details>
