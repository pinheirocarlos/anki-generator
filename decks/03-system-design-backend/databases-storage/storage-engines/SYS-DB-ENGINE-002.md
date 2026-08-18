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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/columnar-storage-parquet-clickhouse-olap-loop.webm">
    <p>Visualização: Armazenamento colunar escaneando apenas as colunas solicitadas na agregação OLAP com alta taxa de compressão de dados.</p>
  </video>
</div>

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
