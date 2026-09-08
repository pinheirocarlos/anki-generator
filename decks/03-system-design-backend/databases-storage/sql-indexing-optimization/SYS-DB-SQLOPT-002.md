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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Covering Index: Zero Acesso à Tabela Física (Index-Only Scan)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Sem Covering Index</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">SELECT name, email WHERE age &gt; 25</text>
    <text x="140" y="65" fill="#fca5a5" font-size="9" text-anchor="middle">Index Scan em age → Busca PK</text>
    <text x="140" y="85" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Random I/O para ler páginas de disco</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Com Covering Index (INCLUDE)</text>
    <text x="460" y="45" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">CREATE INDEX idx ON (age) INCLUDE (name, email)</text>
    <text x="460" y="65" fill="#a7f3d0" font-size="9" text-anchor="middle">Folha do índice já contém name e email</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">⚡ Zero Random I/O (10x mais rápido)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Index-Only Scan atende 100% da consulta direto da memória RAM do buffer pool.</text>

</svg>
<p>Visualização: Covering Index satisfazendo todas as colunas do SELECT e WHERE diretamente nos nós folhas sem acessar a tabela física.</p>

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
