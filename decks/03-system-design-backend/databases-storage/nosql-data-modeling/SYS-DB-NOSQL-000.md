---
id: SYS-DB-NOSQL-000
title: "Modelagem DynamoDB: Partition Key (PK) vs Sort Key (SK) e Single-Table Design"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::amazon
  - freq::high
---

## Pergunta
Como a combinação de Partition Key (HASH) e Sort Key (RANGE) viabiliza o padrão Single-Table Design no Amazon DynamoDB?

## Resposta
### Quick Answer
**Solução Direta**:
- **Partition Key (PK)**: Determina em qual nó físico/partição os dados serão armazenados através de Consistent Hashing.
- **Sort Key (SK)**: Ordena fisicamente os registros dentro da mesma partição física, permitindo consultas por faixa (`begins_with`, `BETWEEN`, `>`, `<`).
- **Single-Table Design**:
  - Em vez de criar múltiplas tabelas (ex: `Users`, `Orders`), todas as entidades residem em **uma única tabela** com chaves genéricas (ex: `PK = "USER#123"`, `SK = "METADATA"` ou `SK = "ORDER#2026-08-18"`).
  - Permite recuperar um usuário e todos os seus pedidos recentes em **uma única chamada `Query`** ultra-rápida (1 round-trip), sem necessidade de `JOINs`.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DynamoDB Single-Table Design: Partition Key (PK) &amp; Sort Key (SK)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="125" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <!-- Header -->
    <rect x="0" y="0" width="600" height="28" rx="6" fill="#0284c7"/>
    <text x="80" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PK (Hash)</text>
    <text x="220" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">SK (Range / Sort)</text>
    <text x="360" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Data / Attributes</text>
    <text x="510" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">GSI1-PK / GSI1-SK</text>

    <!-- Rows -->
    <text x="80" y="48" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">USER#101</text>
    <text x="220" y="48" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">METADATA</text>
    <text x="360" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Name: "Carlos", email: "..."</text>
    <text x="510" y="48" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">STATUS#ACTIVE</text>

    <text x="80" y="73" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">USER#101</text>
    <text x="220" y="73" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">ORDER#2026-08#991</text>
    <text x="360" y="73" fill="#cbd5e1" font-size="9" text-anchor="middle">Total: $450.00, Status: PAID</text>
    <text x="510" y="73" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">DATE#2026-08-28</text>

    <text x="80" y="98" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">USER#101</text>
    <text x="220" y="98" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">ORDER#2026-08#992</text>
    <text x="360" y="98" fill="#cbd5e1" font-size="9" text-anchor="middle">Total: $89.00, Status: SHIPPED</text>
    <text x="510" y="98" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">DATE#2026-08-28</text>
  </g>
  <text x="340" y="208" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Uma única Query(PK=USER#101, SK begins_with ORDER#) retorna usuário e histórico em 1 RTT O(1).</text>

</svg>
<p>Visualização: Modelagem Single-Table no DynamoDB particionando por HASH (PK) e ordenando ranges por SORT (SK) para consultas ricas em 1 RTT.</p>

| Chave da Tabela | Formato de Exemplo | Finalidade |
|---|---|---|
| **Partition Key (PK)** | `USER#1001` | Localização do nó físico via Hash |
| **Sort Key (SK)** | `ORDER#9876` ou `PROFILE` | Ordenação contígua em disco para busca por range |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Padrão de Acesso Típico
```text
PK: USER#1001 | SK: PROFILE            | Data: { name: "Alice", email: "..." }
PK: USER#1001 | SK: ORDER#2026-01-10   | Data: { total: 150.00 }
PK: USER#1001 | SK: ORDER#2026-02-15   | Data: { total: 89.90 }
```
- Query: `PK = "USER#1001" AND SK begins_with("ORDER#")` retorna todos os pedidos do usuário ordenados cronologicamente.

</details>
