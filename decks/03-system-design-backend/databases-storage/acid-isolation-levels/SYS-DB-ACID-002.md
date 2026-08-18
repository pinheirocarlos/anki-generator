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
