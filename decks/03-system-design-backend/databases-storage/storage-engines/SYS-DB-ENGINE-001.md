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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LSM-Tree (Log-Structured Merge-Tree): RocksDB, Cassandra, Kafka</text>
  <g transform="translate(40, 50)">
    <!-- Write Path (RAM) -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Memória RAM (Escrita Rápida)</text>
    <rect x="20" y="35" width="240" height="35" rx="4" fill="#0284c7"/>
    <text x="140" y="57" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">MemTable (SkipList / Red-Black Tree)</text>
    <rect x="20" y="80" width="240" height="35" rx="4" fill="#78350f"/>
    <text x="140" y="102" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">WAL (Append-Only Disk Log)</text>

    <!-- Flush & Disk SSTables -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Disco Imutável (SSTables)</text>
    <rect x="340" y="35" width="240" height="26" rx="4" fill="#065f46"/>
    <text x="460" y="52" fill="#86efac" font-size="9" text-anchor="middle">L0: SSTables não compactadas</text>
    <rect x="340" y="68" width="240" height="26" rx="4" fill="#047857"/>
    <text x="460" y="85" fill="#a7f3d0" font-size="9" text-anchor="middle">L1: SSTables ordenadas e sem overlap</text>
    <rect x="340" y="100" width="240" height="26" rx="4" fill="#065f46"/>
    <text x="460" y="117" fill="#a7f3d0" font-size="9" text-anchor="middle">Compaction em Background (Purge)</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Gravações sequenciais no WAL/MemTable conferem à LSM-Tree taxa de escrita ordens de grandeza superior à B+Tree.</text>

</svg>
<p>Visualização: LSM-Tree gravando em WAL e MemTable em memória com flush assíncrono para SSTables imutáveis em disco.</p>

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
