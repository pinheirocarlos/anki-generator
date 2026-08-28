---
id: SYS-ARCH-PAYMENT-001
title: "Idempotência Financeira, Gateway de Pagamentos e Processo de Reconciliação Noturna"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::stripe
  - freq::high
---

## Pergunta
Como gateways de pagamento garantem que nenhuma cobrança seja duplicada sob falhas de rede e como a Reconciliação Noturna detecta divergências financeiras?

## Resposta
### Quick Answer
**Solução Direta**:
- **Idempotência Financeira de Ponta a Ponta**:
  - O cliente gera uma `Idempotency-Key` exclusiva para cada checkout.
  - O gateway repassa essa mesma chave para os adquirentes bancários (Visa, Mastercard, Adyen).
  - Se a rede cair durante a confirmação, o cliente pode reenviar a requisição com segurança: o adquirente reconhece a chave e retorna o comprovante existente sem debitar novamente o cartão.
- **Processo de Reconciliação Noturna (Reconciliation Batch)**:
  - Diariamente, os bancos e adquirentes disponibilizam arquivos de liquidação financeira (**Settlement Files / Extratos de Liquidação**).
  - Um pipeline batch (Spark/EMR) executa um *Outer Join* entre os registros do Ledger interno e o arquivo do adquirente para verificar se $100\%$ das transações batem em centavos, sinalizando divergências para auditoria humana.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Idempotência Financeira &amp; Reconciliação Noturna de Adquirentes</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Idempotency Key no Gateway</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Header: Idempotency-Key: UUID</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Impede cobrança duplicada no cartão</text>
    <text x="140" y="88" fill="#34d399" font-size="9" text-anchor="middle">Salva estado da transação em Lock</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Reconciliação Noturna</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Baixa arquivos de extrato de bancos</text>
    <text x="460" y="65" fill="#fde68a" font-size="10" text-anchor="middle">Compara 1 a 1 com o livro-razão interno</text>
    <text x="460" y="88" fill="#f87171" font-size="9" text-anchor="middle">Gera alertas em caso de divergência de centavos</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Reconciliação é o teste definitivo da integridade dos registros contábeis da instituição financeira.</text>

</svg>

| Mecanismo de Segurança | Momento de Atuação | Objetivo |
|---|---|---|
| **Idempotency Keys** | Tempo Real (No ato do pagamento) | Impede cobrança dupla por retries de rede |
| **Reconciliação Noturna** | Batch Assíncrono (D+1) | Garante paridade entre o banco interno e adquirentes externos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Tratamento de Estados Indeterminados
- Se uma chamada à adquirente der timeout, o pagamento entra no estado `PENDING_VERIFICATION`. Um worker de polling consulta a API da adquirente via query idempotente antes de tentar qualquer nova cobrança ou cancelamento.

</details>
