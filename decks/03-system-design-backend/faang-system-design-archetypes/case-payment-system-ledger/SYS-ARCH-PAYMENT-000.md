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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sistema de Pagamentos (Stripe): Livro-Razão de Partidas Dobradas</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Invariante Fundamental: SUM(Débitos) - SUM(Créditos) == 0</text>

    <!-- Entry Example -->
    <rect x="20" y="38" width="560" height="60" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="1"/>
    <text x="150" y="60" fill="#f87171" font-size="10" font-family="monospace" text-anchor="middle">Conta Origem (Cliente): -$100 (Débito)</text>
    <text x="430" y="60" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">Conta Destino (Merchant): +$97 (Crédito)</text>
    <text x="430" y="80" fill="#fbbf24" font-size="10" font-family="monospace" text-anchor="middle">Taxa Plataforma (Fee): +$3 (Crédito)</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Livro-razão é estritamente append-only e imutável; correções exigem lançamentos de estorno equilibrados.</text>

</svg>

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
