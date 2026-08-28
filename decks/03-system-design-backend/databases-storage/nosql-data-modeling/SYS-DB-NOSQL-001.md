---
id: SYS-DB-NOSQL-001
title: "Modelagem Wide-Column no Apache Cassandra e Prevenção de Tombstone Storms"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::netflix
  - freq::high
---

## Pergunta
Como a modelagem orientada a consultas (Query-First) funciona no Apache Cassandra e por que deleções excessivas causam degradação por 'Tombstones'?

## Resposta
### Quick Answer
**Solução Direta**:
- **Modelagem Query-First no Cassandra**:
  - Não existe normalização nem `JOIN`; cada tabela é modelada exclusivamente para atender a **uma consulta específica da aplicação** (duplicação deliberada de dados em múltiplas tabelas).
- **Problema de Tombstones**:
  - No Cassandra (LSM-Tree), um `DELETE` não apaga os dados imediatamente; ele grava um marcador chamado **Tombstone** com timestamp.
  - Se a aplicação deletar milhões de registros, leituras subsequentes por faixa precisam ler e descartar centenas de milhares de Tombstones da memória/disco antes de encontrar registros vivos, causando picos severos de latência ou `ReadTimeoutException` (*Tombstone Storm*).

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cassandra Wide-Column &amp; Tombstone Storms em Leituras</text>
  <g transform="translate(40, 50)">
    <!-- MemTable / SSTables with Tombstones -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Deleção no Cassandra = Tombstone</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Deleções gravam marcador imutável</text>
    <text x="140" y="65" fill="#fca5a5" font-size="10" text-anchor="middle">com timestamp de expiração (gc_grace)</text>
    <text x="140" y="90" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Milhares de tombstones acumulam</text>

    <!-- Reading overhead -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Degradação em Consultas Range</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Scan lê até 100.000 células mortas</text>
    <text x="460" y="65" fill="#fde68a" font-size="10" text-anchor="middle">Gera GC Pauses e Read Timeouts</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Solução: Compaction Leveled &amp; TTL</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Major Compaction mescla SSTables e purga tombstones após expiração do gc_grace_seconds (padrão 10 dias).</text>

</svg>

| Conceito Cassandra | Comportamento | Impacto de Performance |
|---|---|---|
| **Query-Driven Design** | 1 Tabela por padrão de acesso | Leituras em $O(1)$ partições sem JOIN |
| **Tombstone Marker** | Gravação de deleção em append-only | Leituras degradam até a conclusão do gc_grace |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Boas Práticas contra Tombstones
1. Evite usar Cassandra como fila de mensagens (onde itens são inseridos e deletados rapidamente).
2. Utilize TTLs curtos e configure `gc_grace_seconds` adequadamente para permitir que o compaction purgue tombstones com frequência.

</details>
