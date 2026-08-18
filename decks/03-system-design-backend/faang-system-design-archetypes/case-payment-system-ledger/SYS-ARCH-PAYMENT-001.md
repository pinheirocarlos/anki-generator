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
| Mecanismo de Segurança | Momento de Atuação | Objetivo |
|---|---|---|
| **Idempotency Keys** | Tempo Real (No ato do pagamento) | Impede cobrança dupla por retries de rede |
| **Reconciliação Noturna** | Batch Assíncrono (D+1) | Garante paridade entre o banco interno e adquirentes externos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Tratamento de Estados Indeterminados
- Se uma chamada à adquirente der timeout, o pagamento entra no estado `PENDING_VERIFICATION`. Um worker de polling consulta a API da adquirente via query idempotente antes de tentar qualquer nova cobrança ou cancelamento.

</details>
