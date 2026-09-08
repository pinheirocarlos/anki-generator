---
id: SYS-DB-ACID-002
title: "Anomalia de Write Skew e Prevenção via Serializable Snapshot Isolation (SSI)"
tags:
  - level::l5-senior
  - topic::sys::databases
  - company::google
  - freq::high
---

## Pergunta
O que é a anomalia de Write Skew que ocorre sob Snapshot Isolation / Repeatable Read e como o nível Serializable a impede?

## Resposta
### Quick Answer
**Solução Direta**:
- **Write Skew**: Ocorre quando duas transações concorrentes leem o mesmo conjunto de dados sobreposto, validam uma regra de negócio que depende da leitura, e em seguida atualizam **linhas diferentes e disjuntas**, violando a invariante global.
- **Exemplo Clássico (Médicos de Plantão)**:
  - Regra: Deve haver sempre pelo menos 1 médico de plantão. Há 2 médicos ativos ($A$ e $B$).
  - Transação 1: Lê que há 2 médicos. Desativa $A$.
  - Transação 2: Lê que há 2 médicos. Desativa $B$.
  - Ambas commitem com sucesso sob Snapshot Isolation porque modificaram linhas distintas ($A$ e $B$). Resultado: Zero médicos de plantão (**Invariante violada**).
- **Mitigação**: `SELECT FOR UPDATE` explícito ou nível de isolamento **Serializable / SSI (Serializable Snapshot Isolation)** que detecta dependências anti-rw.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Write Skew: Anomalia sob Snapshot Isolation &amp; SSI (Serializable Snapshot)</text>
  <g transform="translate(40, 50)">
    <!-- Scenario -->
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="300" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Regra de Integridade: Ao menos 1 médico deve estar de plantão (on_call = true)</text>

    <!-- Tx 1 -->
    <rect x="20" y="40" width="260" height="65" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
    <text x="150" y="58" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Transação A (Dr. Alice)</text>
    <text x="150" y="76" fill="#cbd5e1" font-size="9" text-anchor="middle">Lê: 2 médicos de plantão (Alice, Bob)</text>
    <text x="150" y="92" fill="#f87171" font-size="9" text-anchor="middle">Alice sai de plantão (on_call = false)</text>

    <!-- Tx 2 -->
    <rect x="320" y="40" width="260" height="65" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
    <text x="450" y="58" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Transação B Concorrente (Dr. Bob)</text>
    <text x="450" y="76" fill="#cbd5e1" font-size="9" text-anchor="middle">Lê: 2 médicos de plantão no Snapshot</text>
    <text x="450" y="92" fill="#f87171" font-size="9" text-anchor="middle">Bob sai de plantão (on_call = false)</text>
  </g>
  <text x="340" y="200" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Resultado: 0 médicos de plantão! Solução: SELECT FOR UPDATE ou SSI com detecção de conflito siREAD.</text>

</svg>
<p>Visualização: Anomalia de Write Skew violando restrições de integridade cruzadas sob Snapshot Isolation e detecção de dependências no SSI.</p>

| Nível de Isolamento | Comportamento no Caso dos Médicos | Resultado Final |
|---|---|---|
| **Snapshot Isolation** | Ambas transações aprovam e commitam | Violação de integridade (Zero médicos) |
| **Serializable / SSI** | Banco detecta conflito anti-rw e aborta uma tx | Invariante preservada (1 médico permanece) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Resolver em Código com `SELECT FOR UPDATE`
```sql
BEGIN;
-- Bloqueia explicitamente todas as linhas do predicado para serializar a validação
SELECT count(*) FROM doctors_on_call WHERE is_active = true FOR UPDATE;
-- Se count > 1, prossegue com o update:
UPDATE doctors_on_call SET is_active = false WHERE doctor_id = 'doc_A';
COMMIT;
```

</details>
