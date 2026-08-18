---
id: SYS-DB-SQLOPT-000
title: "Índice Clustered (Primary Key) vs Índice Secundário (Secondary Index)"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre um Índice Clustered e um Índice Secundário (Non-Clustered) no armazenamento físico de tabelas SQL?

## Resposta
### Quick Answer
**Solução Direta**:
- **Índice Clustered (Geralmente a Primary Key)**:
  - Define a **ordem física** em que as linhas da tabela são armazenadas no disco.
  - As folhas da B+Tree do índice clustered contêm a **linha completa com todas as colunas**.
  - Só pode existir **1 índice clustered por tabela**.
- **Índice Secundário**:
  - As folhas da B+Tree do índice secundário contêm apenas as **colunas indexadas + o valor da Primary Key**.
  - Para acessar colunas não presentes no índice secundário, o banco realiza uma segunda busca na árvore primária (**Bookmark Lookup / Index Lookup**).

### Dual Coding Visual
| Tipo de Índice | O que contém nas Folhas da B+Tree | Quantidade por Tabela |
|---|---|---|
| **Clustered Index** | A linha de dados completa da tabela | Exatamente 1 |
| **Secondary Index** | Coluna indexada + Ponteiro/PK primária | Múltiplos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Custo do Bookmark Lookup
- Se você busca por `WHERE email = 'user@test.com'`, o índice secundário encontra a PK correspondente (`id=42`).
- Em seguida, o motor precisa navegar pela B+Tree do índice clustered para buscar `first_name`, gerando um I/O extra (a menos que seja um *Covering Index*).

</details>
