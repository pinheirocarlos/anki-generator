---
id: SYS-MSG-GUARANTEES-001
title: "Idempotency Keys e Deduplicação no Consumidor com Armazenamento Atômico"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::stripe
  - freq::high
---

## Pergunta
Como implementar processamento idempotente de pagamentos utilizando Chaves de Idempotência (Idempotency Keys) e tabelas de deduplicação no banco de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Chave de Idempotência**: Um identificador exclusivo (UUIDv4) gerado pelo cliente/produtor para cada intenção de mutação.
- **Padrão de Deduplicação Atômica**:
  1. A requisição chega com o cabeçalho `Idempotency-Key: id_123`.
  2. O consumidor inicia uma transação no banco e tenta inserir na tabela `processed_keys (idempotency_key, status, response_payload)` com chave primária única.
  3. Se a inserção **falhar por violação de unicidade (`UNIQUE constraint`)**: o worker busca o `response_payload` previamente gravado e retorna a resposta anterior imediatamente sem reprocessar.
  4. Se a inserção for **bem-sucedida**: o worker processa o pagamento, grava o resultado e commita a transação.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/idempotency-key-consumer-deduplication-sql-loop.webm">
    <p>Visualização: Inserção de chave de idempotência com chave única no banco de dados bloqueando processamento duplicado.</p>
  </video>
</div>

| Tentativa de Execução | Ação na Tabela de Idempotência | Efeito no Negócio |
|---|---|---|
| **1ª Tentativa (Original)** | `INSERT INTO processed_keys` (Sucesso) | Executa débito no cartão |
| **2ª Tentativa (Retry de Rede)** | `INSERT` falha com `Duplicate Key` | **Retorna resposta salva sem debitar** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em SQL
```sql
BEGIN;

-- 1. Registro condicional atômico
INSERT INTO idempotency_records (key, status, created_at)
VALUES ('idem-uuid-999', 'PROCESSING', NOW())
ON CONFLICT (key) DO NOTHING;

-- Se nenhuma linha foi inserida, aborta e busca o registro existente:
-- Caso contrário, executa a operação financeira:
UPDATE accounts SET balance = balance - 100.00 WHERE user_id = 'usr-1';

UPDATE idempotency_records 
SET status = 'COMPLETED', response = '{"status":"SUCCESS"}'
WHERE key = 'idem-uuid-999';

COMMIT;
```

</details>
