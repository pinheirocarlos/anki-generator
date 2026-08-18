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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/dynamodb-single-table-design-pk-sk-loop.webm">
    <p>Visualização: Modelagem Single-Table no DynamoDB particionando por HASH (PK) e ordenando ranges por SORT (SK) para consultas ricas em 1 RTT.</p>
  </video>
</div>

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
