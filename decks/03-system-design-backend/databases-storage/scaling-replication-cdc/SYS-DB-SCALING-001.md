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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Change Data Capture (CDC) com Debezium &amp; Kafka</text>
  <g transform="translate(30, 50)">
    <!-- PostgreSQL / MySQL -->
    <rect x="0" y="10" width="140" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="70" y="36" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Postgres / MySQL</text>
    <rect x="20" y="52" width="100" height="32" rx="4" fill="#0369a1"/>
    <text x="70" y="72" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">WAL / Binlog</text>

    <!-- Debezium CDC Connector -->
    <rect x="180" y="20" width="120" height="70" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="240" y="48" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">Debezium</text>
    <text x="240" y="68" fill="#cbd5e1" font-size="9" text-anchor="middle">Tailer do WAL</text>

    <!-- Apache Kafka -->
    <rect x="340" y="10" width="120" height="90" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="400" y="42" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">Kafka Topic</text>
    <text x="400" y="65" fill="#a7f3d0" font-size="9" text-anchor="middle">orders.events</text>
    <text x="400" y="82" fill="#cbd5e1" font-size="9" text-anchor="middle">Imutável O(1)</text>

    <!-- Downstream Consumers -->
    <rect x="495" y="0" width="135" height="48" rx="4" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/>
    <text x="562" y="28" fill="#c084fc" font-size="9" font-weight="bold" text-anchor="middle">Elasticsearch (Busca)</text>

    <rect x="495" y="60" width="135" height="48" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1"/>
    <text x="562" y="88" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Redis (Cache Inval)</text>

    <!-- Arrows -->
    <line x1="140" y1="55" x2="180" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <line x1="300" y1="55" x2="340" y2="55" stroke="#f59e0b" stroke-width="2"/>
    <line x1="460" y1="40" x2="495" y2="25" stroke="#10b981" stroke-width="1.5"/>
    <line x1="460" y1="70" x2="495" y2="85" stroke="#10b981" stroke-width="1.5"/>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">CDC desacopla a gravação de banco primário da sincronização de caches e mecanismos de busca em tempo real.</text>

</svg>
<p>Visualização: Change Data Capture (CDC) lendo o Write-Ahead Log (WAL) do banco de dados e transmitindo streams de mutações em tempo real.</p>

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
