---
id: SYS-DB-SCALING-001
title: "Change Data Capture (CDC com Debezium) lendo Logs de Transação (WAL)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::airbnb
  - freq::high
---

## Pergunta
Por que ferramentas de Change Data Capture (CDC) baseadas na leitura de logs de transação (Postgres WAL / MySQL Binlog) são superiores ao polling por coluna `updated_at`?

## Resposta
### Quick Answer
**Solução Direta**:
- **Limitações do Polling por `updated_at`**:
  1. Sobrecarga de I/O por consultas constantes (`SELECT * WHERE updated_at > ?`).
  2. **Não captura `DELETEs`** (a linha física desaparece da tabela).
  3. Pode ignorar alterações intermediárias rápidas que ocorrem entre ciclos de polling.
- **CDC via WAL (ex: Debezium)**:
  1. Conecta-se como uma réplica lógica e consome o log binário de transações em tempo real com **zero overhead de query**.
  2. Captura $100\%$ das mutações (`INSERT`, `UPDATE`, `DELETE`) com valores antes e depois (*Before/After state*).
  3. Alimenta streams no Kafka para sincronização de Elasticsearch, Caches e Data Lakes com latência sub-segundo.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/cdc-debezium-wal-binlog-streaming-loop.webm">
    <p>Visualização: Change Data Capture (CDC) lendo o Write-Ahead Log (WAL) do banco de dados e transmitindo streams de mutações em tempo real.</p>
  </video>
</div>

| Estratégia de Captura | Impacto no Banco Primário | Captura Deleções? |
|---|---|---|
| **Polling (`WHERE updated_at`)** | Alto (Queries recorrentes com table scan) | NÃO (Linhas apagadas são invisíveis) |
| **CDC via Log / WAL** | Quase zero (Stream passivo de transações) | **SIM (100% dos eventos com estado pré/pós)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Payload CDC emitido para o Kafka
```json
{
  "before": { "id": 1, "balance": 100.00 },
  "after": { "id": 1, "balance": 80.00 },
  "op": "u",
  "ts_ms": 1771234567890
}
```

</details>
