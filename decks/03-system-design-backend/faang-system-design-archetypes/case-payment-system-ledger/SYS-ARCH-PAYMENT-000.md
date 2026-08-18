---
id: SYS-ARCH-PAYMENT-000
title: "Sistema de Pagamentos (Stripe): Livro-Razão de Partidas Dobradas (Double-Entry Bookkeeping)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::stripe
  - freq::high
---

## Pergunta
Por que sistemas financeiros e gateways de pagamento utilizam o princípio de Contabilidade de Partidas Dobradas (Double-Entry Bookkeeping) em vez de uma coluna simples de saldo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema da Coluna Simples (`balance = balance + amount`)**: Um erro de mutação, race condition ou crash destrói a rastreabilidade e faz dinheiro "surgir ou sumir do nada" sem possibilidade de auditoria.
- **Partidas Dobradas (Double-Entry Bookkeeping)**:
  - Dinheiro nunca é criado ou destruído; ele é **transferido entre contas**.
  - Toda transação financeira consiste em **no mínimo dois lançamentos imutáveis**: um **Débito** em uma conta e um **Crédito** correspondente em outra conta.
  - **Invariante Matemática Absoluta**: A soma de todos os débitos DEVE ser rigorosamente igual à soma de todos os créditos em qualquer transação:
    $$\sum \text{Débitos} - \sum \text{Créditos} = 0$$

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/double-entry-bookkeeping-ledger-debit-credit-loop.webm">
    <p>Visualização: Livro-razão imutável garantindo que toda transação financeira possua Débitos e Créditos equilibrados com soma zero.</p>
  </video>
</div>

| Tipo de Conta | Aumento de Valor | Redução de Valor |
|---|---|---|
| **Ativo / Despesas (Asset / Expense)** | Lançamento a DÉBITO | Lançamento a CRÉDITO |
| **Passivo / Receitas (Liability / Equity)** | Lançamento a CRÉDITO | Lançamento a DÉBITO |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Transferência de $100 da Alice para o Bob
```sql
BEGIN;
-- Transação financeira atômica no livro-razão (Ledger):
INSERT INTO ledger_entries (tx_id, account_id, type, amount) VALUES
('tx_100', 'alice_checking', 'DEBIT',  100.00),
('tx_100', 'bob_checking',   'CREDIT', 100.00);

-- Validação de integridade: soma(débito) == soma(crédito)
COMMIT;
```

</details>
