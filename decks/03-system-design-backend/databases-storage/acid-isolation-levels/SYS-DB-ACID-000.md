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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Níveis de Isolamento ANSI SQL vs Anomalias de Concorrência</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="140" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <!-- Table Header -->
    <rect x="0" y="0" width="600" height="30" rx="6" fill="#0284c7"/>
    <text x="100" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Nível de Isolamento</text>
    <text x="260" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Dirty Read</text>
    <text x="400" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Non-Repeatable Read</text>
    <text x="530" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Phantom Read</text>

    <!-- Rows -->
    <text x="100" y="55" fill="#f87171" font-size="10" text-anchor="middle">Read Uncommitted</text>
    <text x="260" y="55" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>
    <text x="400" y="55" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>
    <text x="530" y="55" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>

    <text x="100" y="82" fill="#fbbf24" font-size="10" text-anchor="middle">Read Committed</text>
    <text x="260" y="82" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="400" y="82" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>
    <text x="530" y="82" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>

    <text x="100" y="108" fill="#38bdf8" font-size="10" text-anchor="middle">Repeatable Read</text>
    <text x="260" y="108" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="400" y="108" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="530" y="108" fill="#fbbf24" font-size="10" text-anchor="middle">Possível ⚠️</text>

    <text x="100" y="132" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Serializable</text>
    <text x="260" y="132" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="400" y="132" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="530" y="132" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
  </g>
  <text x="340" y="218" fill="#94a3b8" font-size="10" text-anchor="middle">PostgreSQL e MySQL InnoDB utilizam MVCC para prevenir Phantom Reads em Repeatable Read sem locks em tabela.</text>

</svg>

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
