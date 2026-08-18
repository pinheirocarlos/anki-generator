---
id: SYS-DB-ACID-000
title: "Anomalias de Concorrência ANSI SQL: Dirty Read, Non-Repeatable Read e Phantom Read"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::microsoft
  - freq::high
---

## Pergunta
Quais são as três anomalias clássicas de leitura concorrente (Dirty Read, Non-Repeatable Read e Phantom Read) no padrão ANSI SQL?

## Resposta
### Quick Answer
**Solução Direta**:
- **Dirty Read (Leitura Suja)**: A Transação A lê dados modificados pela Transação B que **ainda não foram commitados** (se B fizer rollback, A operou sobre dado inexistente).
- **Non-Repeatable Read (Leitura Não-Repetível)**: A Transação A lê a mesma linha duas vezes e obtém valores diferentes porque a Transação B fez `UPDATE` ou `DELETE` e commitou no intervalo.
- **Phantom Read (Leitura Fantasma)**: A Transação A executa uma busca por intervalo (`WHERE age > 30`), e ao repetir a busca encontra **novas linhas** inseridas e commitadas pela Transação B.

### Dual Coding Visual
| Nível de Isolamento | Anomalias Prevenidas | Anomalias Permitidas |
|---|---|---|
| **Read Uncommitted** | Nenhuma | Dirty, Non-Repeatable, Phantom |
| **Read Committed** | Dirty Read | Non-Repeatable Read, Phantom |
| **Repeatable Read** | Dirty e Non-Repeatable Read | Phantom Read (ou prevenido via MVCC) |
| **Serializable** | Todas as anomalias | Nenhuma |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Níveis Padrão de Mercado
- **PostgreSQL**: Padrão é *Read Committed*.
- **MySQL InnoDB**: Padrão é *Repeatable Read* (usa MVCC + Next-Key Locks para prevenir Phantom Reads).

</details>
