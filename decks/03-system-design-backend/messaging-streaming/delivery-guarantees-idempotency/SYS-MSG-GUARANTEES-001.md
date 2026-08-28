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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Chave de Idempotência (Idempotency Key) &amp; Deduplicação em Banco</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tabela SQL: idempotency_keys (id UNIQUE, status, response_body)</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">1ª Requisição (key: UUID-101)</text>
      <text x="130" y="40" fill="#ffffff" font-size="9" text-anchor="middle">INSERT OK → Executa cobrança no gateway</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#7f1d1d"/>
      <text x="430" y="22" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Retentativa de Rede (UUID-101)</text>
      <text x="430" y="40" fill="#ffffff" font-size="9" text-anchor="middle">INSERT falha (Unique Constraint) → Retorna cache</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O cliente recebe exatamente a mesma resposta HTTP sem duplicar operações financeiras.</text>

</svg>

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
