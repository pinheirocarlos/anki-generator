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
