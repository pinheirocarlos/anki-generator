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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Índice Clustered (PK) vs Índice Secundário (Non-Clustered)</text>
  <g transform="translate(40, 50)">
    <!-- Clustered Index -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Índice Clustered (B+Tree)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Nós folhas = Linhas de dados completas</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Apenas 1 por tabela (organiza o disco)</text>
    <text x="140" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Busca por PK: 1 travessia na árvore</text>

    <!-- Secondary Index -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Índice Secundário (ex: email)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Nós folhas contêm: (email, PK_id)</text>
    <text x="460" y="65" fill="#f87171" font-size="10" text-anchor="middle">Exige 'Table Lookup' / 'Bookmark Lookup'</text>
    <text x="460" y="90" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">2 travessias: Secundário → Clustered</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">No InnoDB, a chave primária curta (ex: BIGINT) reduz o tamanho de todos os índices secundários da tabela.</text>

</svg>

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
