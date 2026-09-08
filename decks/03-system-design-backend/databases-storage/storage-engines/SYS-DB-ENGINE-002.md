---
id: SYS-DB-ENGINE-002
title: "Armazenamento Colunar (Parquet / ClickHouse) vs Orientado a Linhas (Row-Store)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Por que formatos colunares (como Apache Parquet e ClickHouse) superam bancos orientados a linha em consultas analíticas OLAP com agregações?

## Resposta
### Quick Answer
**Solução Direta**:
- **Row-Store (OLTP)**: Grava todos os campos de uma linha contíguos no disco. Excelente para `SELECT * WHERE id = 1` ou mutações pontuais, mas péssimo para `SUM(salary)` porque precisa carregar colunas não utilizadas para a RAM.
- **Column-Store (OLAP)**: Grava todos os valores da mesma coluna contíguos no disco:
  1. **I/O Mínimo**: Para calcular a média de uma coluna, o disco lê apenas os blocos daquela coluna específica.
  2. **Compressão Brutal**: Como dados da mesma coluna possuem o mesmo tipo e alta entropia repetitiva, aplicam-se algoritmos como *Run-Length Encoding (RLE)* e *Dictionary Encoding* reduzindo o tamanho em até $90\%$.
  3. **Vetorização SIMD**: Permite processamento paralelo de arrays de dados via instruções de CPU AVX-512.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Armazenamento Colunar (Parquet / ClickHouse) vs Linha (Row-Oriented OLTP)</text>
  <g transform="translate(40, 50)">
    <!-- Row-Oriented -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Row-Oriented (OLTP: MySQL, Postgres)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">Disco: [ID, Name, Age, Salary] [ID, Name...]</text>
    <text x="140" y="68" fill="#fca5a5" font-size="10" text-anchor="middle">Ótimo para INSERT/UPDATE de registros inteiros</text>
    <text x="140" y="90" fill="#f87171" font-size="10" text-anchor="middle">Péssimo para agregação: lê colunas inúteis</text>

    <!-- Columnar -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Columnar (OLAP: ClickHouse, Parquet, Snowflake)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">Disco: [Age, Age, Age...] [Salary, Salary...]</text>
    <text x="460" y="68" fill="#86efac" font-size="10" text-anchor="middle">Lê apenas a coluna do SELECT AVG(salary)</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Alta taxa de compressão (Snappy/ZSTD)</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Compressão homogênea por coluna + SIMD vectorization aceleram agregações analíticas em centenas de vezes.</text>

</svg>
<p>Visualização: Armazenamento colunar escaneando apenas as colunas solicitadas na agregação OLAP com alta taxa de compressão de dados.</p>

| Dimensão de Comparação | Row-Store (MySQL / Postgres) | Column-Store (Parquet / ClickHouse) |
|---|---|---|
| **Carga de Trabalho Ideal** | OLTP (Transacional, `INSERT/UPDATE/DELETE`) | OLAP (Analítico, Agregações `COUNT/SUM/AVG`) |
| **I/O em `SELECT avg(val)`** | Lê todas as colunas de todas as linhas | Lê estritamente os bytes da coluna `val` |
| **Taxa de Compressão** | Baixa (~2x a 3x) | Altíssima (~10x a 20x com RLE/Snappy) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Tabela de 1 Bilhão de Transações
- Query: `SELECT avg(amount) FROM transactions WHERE country = 'BR'`
- Em Row-Store: O banco lê ~200 GB de disco (todas as colunas de cada transação).
- Em Column-Store: O banco lê apenas ~2 GB (colunas `amount` e `country`), executando em frações de segundo.

</details>
