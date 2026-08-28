---
id: SYS-DIST-TX-002
title: "Transactional Outbox Pattern e CDC para Publicação Confiável de Eventos"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::netflix
  - freq::high
---

## Pergunta
Como o Transactional Outbox Pattern resolve o problema de 'Dual-Write' garantindo que alterações no banco de dados e eventos no message broker sejam emitidos atomicamente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema do Dual-Write**: Gravar no banco de dados e publicar no Kafka em operações separadas falha se a aplicação cair entre as duas ações (ou grava no DB sem publicar no Kafka, ou publica no Kafka sem commitar no DB).
- **Solução (Outbox Pattern)**:
  1. A aplicação grava o registro de negócio (ex: `orders`) e o evento a ser publicado em uma tabela `outbox` na **mesma transação ACID local do banco de dados**.
  2. Um processo independente (ou conector **Change Data Capture / CDC** como Debezium lendo o WAL do Postgres) lê as mensagens da tabela `outbox` e as envia confiavelmente ao broker (Kafka).
  3. Garante entrega *At-Least-Once* sem risco de inconsistência.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Transactional Outbox Pattern com Relay via CDC (Debezium)</text>
  <g transform="translate(40, 50)">
    <!-- SQL Local Tx -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Mesma Transação SQL Local Atômica</text>
    <rect x="20" y="35" width="240" height="30" rx="4" fill="#065f46"/>
    <text x="140" y="54" fill="#86efac" font-size="9" text-anchor="middle">1. INSERT INTO orders (status='PAID')</text>
    <rect x="20" y="70" width="240" height="30" rx="4" fill="#065f46"/>
    <text x="140" y="89" fill="#86efac" font-size="9" text-anchor="middle">2. INSERT INTO outbox (event='OrderPaid')</text>

    <!-- Outbox Relay to Kafka -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Assíncrono: Message Relay / CDC</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Debezium lê tabela Outbox via WAL</text>
    <text x="460" y="70" fill="#34d399" font-size="10" text-anchor="middle">Publica no Apache Kafka (At-Least-Once)</text>
    <text x="460" y="92" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Zero risco de inconsistência Dual-Write</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Elimina o problema de gravar no banco e o broker de mensagens falhar no meio do caminho.</text>

</svg>

| Etapa do Processo | Onde Ocorre | Garantia |
|---|---|---|
| **1. Transação Local** | DB da Aplicação (`orders` + `outbox`) | ACID (Tudo ou nada no banco) |
| **2. Leitura do Outbox** | Polling worker ou CDC (WAL) | Garante extração sem perda |
| **3. Publicação no Broker** | Envio ao Kafka / RabbitMQ | At-Least-Once delivery |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Esquema SQL Outbox
```sql
BEGIN;

-- 1. Mutação de negócio
INSERT INTO orders (id, user_id, amount) VALUES ('ord-123', 'usr-456', 99.90);

-- 2. Registro do evento na mesma transação atômica
INSERT INTO outbox_events (id, aggregate_type, payload, created_at)
VALUES (gen_random_uuid(), 'ORDER_CREATED', '{"order_id": "ord-123", "amount": 99.90}', NOW());

COMMIT;
```

</details>
