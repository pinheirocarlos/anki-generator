---
id: SYS-DB-SQLOPT-002
title: "Covering Index (Índice de Cobertura) para Eliminar Lookup de Tabela"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::uber
  - freq::high
---

## Pergunta
O que é um Covering Index (Índice de Cobertura) em SQL e como ele elimina completamente o custo de acesso à tabela primária?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Covering Index** ocorre quando **todas as colunas solicitadas** na consulta (nas cláusulas `SELECT`, `WHERE`, `JOIN`, `ORDER BY` e `GROUP BY`) já estão presentes dentro da estrutura da B+Tree do próprio índice secundário.
- **Benefício de Performance**:
  - O otimizador de consultas satisfaz a query lendo **exclusivamente o índice em memória/disco**, sem precisar fazer *Bookmark Lookup* ou acessar as páginas de dados da tabela (*Using Index* no `EXPLAIN`).
  - Reduz drasticamente o I/O aleatório e acelera consultas críticas em até $100x$.

### Dual Coding Visual
| Estrutura de Consulta | Índice Utilizado | Acesso à Tabela Primária? |
|---|---|---|
| `SELECT id, email, status FROM users WHERE email = ?` | `INDEX(email)` | SIM (Precisa buscar `status` na tabela) |
| `SELECT id, email, status FROM users WHERE email = ?` | `INDEX(email, status)` | **NÃO (Covering Index - 100% no índice)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em PostgreSQL com Cláusula `INCLUDE`
```sql
-- Inclui 'status' apenas nas folhas do índice sem sobrecarregar nós intermediários:
CREATE INDEX idx_users_email_covering 
ON users(email) INCLUDE (status);
```

</details>
