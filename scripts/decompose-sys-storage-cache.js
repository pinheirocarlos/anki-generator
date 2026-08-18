import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 3: System Design - Databases, Storage & Caching...');

// ==========================================
// 1. storage-engines
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/databases-storage/storage-engines/SYS-DB-ENGINE-000.md', `---
id: SYS-DB-ENGINE-000
title: "Mecanismo Interno de B+Trees em Bancos Relacionais (MySQL InnoDB / PostgreSQL)"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::oracle
  - freq::high
---

## Pergunta
Por que bancos de dados relacionais (OLTP) utilizam B+Trees em vez de B-Trees convencionais ou árvores binárias balanceadas como estrutura de armazenamento primária?

## Resposta
### Quick Answer
**Solução Direta**:
- **B+Tree**: Todos os dados reais (registros ou ponteiros para tuplas) residem exclusivamente nas **folhas** (*Leaf Nodes*). Os nós internos contêm apenas chaves de roteamento.
- **Vantagens Críticas sobre B-Tree e AVL**:
  1. **Fan-out Gigante**: Nós internos cabem milhares de chaves por página de 16 KB, mantendo a altura da árvore extremamente baixa ($h=3$ a $4$ para bilhões de linhas, exigindo apenas 3-4 I/Os).
  2. **Range Queries Eficientes**: As folhas formam uma **lista duplamente ligada**, permitindo varreduras sequenciais sem necessidade de percorrer nós superiores.
  3. **Localidade de Cache**: Nós internos menores cabem facilmente no Buffer Pool da memória RAM.

### Dual Coding Visual
| Estrutura de Índice | Altura Típica ($N=10^9$) | Eficiência em Range Query (\`BETWEEN\`) |
|---|---|---|
| **Árvore AVL / Red-Black** | ~30 níveis ($O(\\log_2 N)$) | Ruim (Travessia in-order com saltos aleatórios) |
| **B-Tree Padrão** | ~4-5 níveis | Média (Dados dispersos em nós intermediários) |
| **B+Tree (InnoDB)** | ~3-4 níveis (Fan-out $\\approx 1.000$) | Excelente (Varredura direta na lista ligada das folhas) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Fan-out Alto Reduz I/O de Disco
- Página típica do InnoDB = 16 KB.
- Se uma chave + ponteiro ocupa 16 bytes, um nó interno acomoda $\\approx 1.000$ ponteiros (*Fan-out* $= 1.000$).
- Altura $h=1$: $1.000$ páginas.
- Altura $h=2$: $1.000.000$ páginas.
- Altura $h=3$: $1.000.000.000$ páginas (1 Bilhão de páginas com apenas 3 acessos a disco).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/storage-engines/SYS-DB-ENGINE-001.md', `---
id: SYS-DB-ENGINE-001
title: "Mecanismo LSM-Tree (Log-Structured Merge-Tree): MemTable, WAL, SSTable e Compaction"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::google
  - freq::high
---

## Pergunta
Como a arquitetura Log-Structured Merge-Tree (LSM-Tree) converte escritas aleatórias em I/O sequencial através de MemTable, WAL e SSTables?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo de Escrita LSM-Tree**:
  1. A escrita é gravada no **Write-Ahead Log (WAL)** no disco em modo *append-only* sequencial (durabilidade contra crash).
  2. O dado é inserido na **MemTable** (estrutura em memória como SkipList ou Red-Black Tree ordenada).
  3. Quando a MemTable atinge seu limite (ex: 64 MB), ela é descarregada (*Flushed*) para o disco como uma **SSTable (Sorted String Table)** imutável.
- **Compaction**: Processo em background que mescla múltiplas SSTables antigas, remove duplicatas/tombstones e gera novas SSTables ordenadas (*Merge Sort* sequencial).
- Maximiza o throughput de escrita ao eliminar *Random Disk Seeks*.

### Dual Coding Visual
| Componente LSM | Localização | Papel Funcional |
|---|---|---|
| **WAL** | Disco (Append-only) | Garante durabilidade imediata com I/O sequencial |
| **MemTable** | Memória RAM | Buffer ordenado para leituras e escritas instantâneas |
| **SSTable** | Disco (Imutável) | Arquivos ordenados mesclados via Compaction |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estratégias de Compaction (RocksDB / Cassandra)
- **Size-Tiered Compaction**: Mescla SSTables de tamanhos similares; ótimo para escritas pesadas, mas exige mais espaço temporário em disco.
- **Leveled Compaction**: Divide SSTables em níveis $L_0, L_1, L_2...$ (cada nível $10x$ maior que o anterior); garante chaves disjuntas em $L_1+$, acelerando leituras.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/storage-engines/SYS-DB-ENGINE-002.md', `---
id: SYS-DB-ENGINE-002
title: "Armazenamento Colunar (Parquet / ClickHouse) vs Orientado a Linhas (Row-Store)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Por que formatos colunares (como Apache Parquet e ClickHouse) superam bancos orientados a linha em consultas analíticas OLAP com agregações?

## Resposta
### Quick Answer
**Solução Direta**:
- **Row-Store (OLTP)**: Grava todos os campos de uma linha contíguos no disco. Excelente para \`SELECT * WHERE id = 1\` ou mutações pontuais, mas péssimo para \`SUM(salary)\` porque precisa carregar colunas não utilizadas para a RAM.
- **Column-Store (OLAP)**: Grava todos os valores da mesma coluna contíguos no disco:
  1. **I/O Mínimo**: Para calcular a média de uma coluna, o disco lê apenas os blocos daquela coluna específica.
  2. **Compressão Brutal**: Como dados da mesma coluna possuem o mesmo tipo e alta entropia repetitiva, aplicam-se algoritmos como *Run-Length Encoding (RLE)* e *Dictionary Encoding* reduzindo o tamanho em até $90\\%$.
  3. **Vetorização SIMD**: Permite processamento paralelo de arrays de dados via instruções de CPU AVX-512.

### Dual Coding Visual
| Dimensão de Comparação | Row-Store (MySQL / Postgres) | Column-Store (Parquet / ClickHouse) |
|---|---|---|
| **Carga de Trabalho Ideal** | OLTP (Transacional, \`INSERT/UPDATE/DELETE\`) | OLAP (Analítico, Agregações \`COUNT/SUM/AVG\`) |
| **I/O em \`SELECT avg(val)\`** | Lê todas as colunas de todas as linhas | Lê estritamente os bytes da coluna \`val\` |
| **Taxa de Compressão** | Baixa (~2x a 3x) | Altíssima (~10x a 20x com RLE/Snappy) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Tabela de 1 Bilhão de Transações
- Query: \`SELECT avg(amount) FROM transactions WHERE country = 'BR'\`
- Em Row-Store: O banco lê ~200 GB de disco (todas as colunas de cada transação).
- Em Column-Store: O banco lê apenas ~2 GB (colunas \`amount\` e \`country\`), executando em frações de segundo.

</details>
`);

// ==========================================
// 2. sql-indexing-optimization
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/databases-storage/sql-indexing-optimization/SYS-DB-SQLOPT-000.md', `---
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
- Se você busca por \`WHERE email = 'user@test.com'\`, o índice secundário encontra a PK correspondente (\`id=42\`).
- Em seguida, o motor precisa navegar pela B+Tree do índice clustered para buscar \`first_name\`, gerando um I/O extra (a menos que seja um *Covering Index*).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/sql-indexing-optimization/SYS-DB-SQLOPT-001.md', `---
id: SYS-DB-SQLOPT-001
title: "Índices Compostos e a Regra do Prefixo Mais à Esquerda (Leftmost Prefix Rule)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Como a regra do Prefixo Mais à Esquerda (*Leftmost Prefix Rule*) determina a eficácia de um índice composto \`(A, B, C)\` em consultas SQL?

## Resposta
### Quick Answer
**Solução Direta**:
- Um índice composto \`INDEX(A, B, C)\` ordena os dados primeiramente por $A$; para valores idênticos de $A$, ordena por $B$; para valores idênticos de $B$, ordena por $C$.
- **Consultas que APROVEITAM o Índice**:
  - \`WHERE A = 1\` (Usa $A$)
  - \`WHERE A = 1 AND B = 2\` (Usa $A$ e $B$)
  - \`WHERE A = 1 AND B = 2 AND C = 3\` (Usa $A, B$ e $C$)
  - \`WHERE A = 1 AND B > 2 AND C = 3\` (Usa $A$ e $B$; após a condição de faixa em $B$, $C$ não é usado para index range scan).
- **Consultas que NÃO APROVEITAM o Índice**:
  - \`WHERE B = 2\` ou \`WHERE C = 3\` ou \`WHERE B = 2 AND C = 3\` (Não iniciam pelo prefixo $A$, exigindo *Full Table Scan* ou *Index Full Scan*).

### Dual Coding Visual
| Cláusula WHERE | Uso do Índice \`(A, B, C)\` | Tipo de Execução |
|---|---|---|
| \`WHERE A = 1 AND B = 5\` | Total para $A$ e $B$ | Index Range Scan |
| \`WHERE A = 1 AND C = 9\` | Parcial (Usa $A$, filtra $C$ em memória) | Index Range Scan em $A$ |
| \`WHERE B = 5 AND C = 9\` | Nulo (Sem o prefixo $A$) | Full Table Scan |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dica de Ouro de Cardinalidade
- Coloque no início do índice composto as colunas de **maior seletividade/cardinalidade** que são frequentemente filtradas com igualdade (\`=\`).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/sql-indexing-optimization/SYS-DB-SQLOPT-002.md', `---
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
- Um **Covering Index** ocorre quando **todas as colunas solicitadas** na consulta (nas cláusulas \`SELECT\`, \`WHERE\`, \`JOIN\`, \`ORDER BY\` e \`GROUP BY\`) já estão presentes dentro da estrutura da B+Tree do próprio índice secundário.
- **Benefício de Performance**:
  - O otimizador de consultas satisfaz a query lendo **exclusivamente o índice em memória/disco**, sem precisar fazer *Bookmark Lookup* ou acessar as páginas de dados da tabela (*Using Index* no \`EXPLAIN\`).
  - Reduz drasticamente o I/O aleatório e acelera consultas críticas em até $100x$.

### Dual Coding Visual
| Estrutura de Consulta | Índice Utilizado | Acesso à Tabela Primária? |
|---|---|---|
| \`SELECT id, email, status FROM users WHERE email = ?\` | \`INDEX(email)\` | SIM (Precisa buscar \`status\` na tabela) |
| \`SELECT id, email, status FROM users WHERE email = ?\` | \`INDEX(email, status)\` | **NÃO (Covering Index - 100% no índice)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em PostgreSQL com Cláusula \`INCLUDE\`
\`\`\`sql
-- Inclui 'status' apenas nas folhas do índice sem sobrecarregar nós intermediários:
CREATE INDEX idx_users_email_covering 
ON users(email) INCLUDE (status);
\`\`\`

</details>
`);

// ==========================================
// 3. acid-isolation-levels
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/databases-storage/acid-isolation-levels/SYS-DB-ACID-000.md', `---
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
- **Non-Repeatable Read (Leitura Não-Repetível)**: A Transação A lê a mesma linha duas vezes e obtém valores diferentes porque a Transação B fez \`UPDATE\` ou \`DELETE\` e commitou no intervalo.
- **Phantom Read (Leitura Fantasma)**: A Transação A executa uma busca por intervalo (\`WHERE age > 30\`), e ao repetir a busca encontra **novas linhas** inseridas e commitadas pela Transação B.

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
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/acid-isolation-levels/SYS-DB-ACID-001.md', `---
id: SYS-DB-ACID-001
title: "Mecanismo MVCC (Multi-Version Concurrency Control) e Snapshot Isolation"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Como o Multi-Version Concurrency Control (MVCC) permite que leituras e escritas ocorram simultaneamente sem bloqueios mútuos (*Readers don't block writers*)?

## Resposta
### Quick Answer
**Solução Direta**:
- No **MVCC**, mutações (\`UPDATE\`, \`DELETE\`) não sobrescrevem os dados existentes no lugar. Em vez disso, o banco cria uma **nova versão** da tupla com metadados de controle de transação:
  - \`xmin\` / \`created_by_tx\`: ID da transação que criou a versão.
  - \`xmax\` / \`deleted_by_tx\`: ID da transação que deletou ou atualizou a versão.
- **Snapshot Isolation**: Quando uma transação inicia, ela recebe uma "foto" (*Snapshot*) das transações commitadas até aquele momento.
- Leituras acessam versões históricas imutáveis sem adquirir locks de leitura, garantindo que **leituras nunca bloqueiem escritas e escritas nunca bloqueiem leituras**.

### Dual Coding Visual
| Ação Concorrente | Com Locks Tradicionais (2PL) | Com MVCC |
|---|---|---|
| **Leitura durante Escrita** | Leitura bloqueada aguardando lock exclusivo | Leitura lê versão anterior no Snapshot (Sem bloqueio) |
| **Escrita durante Leitura** | Escrita bloqueada aguardando liberação de lock | Escrita cria nova versão em paralelo (Sem bloqueio) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Coleta de Lixo de Versões Antigas (*Vacuum / Undo Log*)
- Como o MVCC acumula versões mortas (*Dead Tuples*), o banco precisa limpá-las:
  - **Postgres**: Processo \`VACUUM\` remove tuplas mortas que não são mais visíveis por nenhuma transação ativa.
  - **MySQL InnoDB**: Utiliza o *Undo Log Segments* para reconstruir versões anteriores.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/acid-isolation-levels/SYS-DB-ACID-002.md', `---
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
- **Mitigação**: \`SELECT FOR UPDATE\` explícito ou nível de isolamento **Serializable / SSI (Serializable Snapshot Isolation)** que detecta dependências anti-rw.

### Dual Coding Visual
| Nível de Isolamento | Comportamento no Caso dos Médicos | Resultado Final |
|---|---|---|
| **Snapshot Isolation** | Ambas transações aprovam e commitam | Violação de integridade (Zero médicos) |
| **Serializable / SSI** | Banco detecta conflito anti-rw e aborta uma tx | Invariante preservada (1 médico permanece) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Resolver em Código com \`SELECT FOR UPDATE\`
\`\`\`sql
BEGIN;
-- Bloqueia explicitamente todas as linhas do predicado para serializar a validação
SELECT count(*) FROM doctors_on_call WHERE is_active = true FOR UPDATE;
-- Se count > 1, prossegue com o update:
UPDATE doctors_on_call SET is_active = false WHERE doctor_id = 'doc_A';
COMMIT;
\`\`\`

</details>
`);

// ==========================================
// 4. nosql-data-modeling
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/databases-storage/nosql-data-modeling/SYS-DB-NOSQL-000.md', `---
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
- **Sort Key (SK)**: Ordena fisicamente os registros dentro da mesma partição física, permitindo consultas por faixa (\`begins_with\`, \`BETWEEN\`, \`>\`, \`<\`).
- **Single-Table Design**:
  - Em vez de criar múltiplas tabelas (ex: \`Users\`, \`Orders\`), todas as entidades residem em **uma única tabela** com chaves genéricas (ex: \`PK = "USER#123"\`, \`SK = "METADATA"\` ou \`SK = "ORDER#2026-08-18"\`).
  - Permite recuperar um usuário e todos os seus pedidos recentes em **uma única chamada \`Query\`** ultra-rápida (1 round-trip), sem necessidade de \`JOINs\`.

### Dual Coding Visual
| Chave da Tabela | Formato de Exemplo | Finalidade |
|---|---|---|
| **Partition Key (PK)** | \`USER#1001\` | Localização do nó físico via Hash |
| **Sort Key (SK)** | \`ORDER#9876\` ou \`PROFILE\` | Ordenação contígua em disco para busca por range |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Padrão de Acesso Típico
\`\`\`text
PK: USER#1001 | SK: PROFILE            | Data: { name: "Alice", email: "..." }
PK: USER#1001 | SK: ORDER#2026-01-10   | Data: { total: 150.00 }
PK: USER#1001 | SK: ORDER#2026-02-15   | Data: { total: 89.90 }
\`\`\`
- Query: \`PK = "USER#1001" AND SK begins_with("ORDER#")\` retorna todos os pedidos do usuário ordenados cronologicamente.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/nosql-data-modeling/SYS-DB-NOSQL-001.md', `---
id: SYS-DB-NOSQL-001
title: "Modelagem Wide-Column no Apache Cassandra e Prevenção de Tombstone Storms"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::netflix
  - freq::high
---

## Pergunta
Como a modelagem orientada a consultas (Query-First) funciona no Apache Cassandra e por que deleções excessivas causam degradação por 'Tombstones'?

## Resposta
### Quick Answer
**Solução Direta**:
- **Modelagem Query-First no Cassandra**:
  - Não existe normalização nem \`JOIN\`; cada tabela é modelada exclusivamente para atender a **uma consulta específica da aplicação** (duplicação deliberada de dados em múltiplas tabelas).
- **Problema de Tombstones**:
  - No Cassandra (LSM-Tree), um \`DELETE\` não apaga os dados imediatamente; ele grava um marcador chamado **Tombstone** com timestamp.
  - Se a aplicação deletar milhões de registros, leituras subsequentes por faixa precisam ler e descartar centenas de milhares de Tombstones da memória/disco antes de encontrar registros vivos, causando picos severos de latência ou \`ReadTimeoutException\` (*Tombstone Storm*).

### Dual Coding Visual
| Conceito Cassandra | Comportamento | Impacto de Performance |
|---|---|---|
| **Query-Driven Design** | 1 Tabela por padrão de acesso | Leituras em $O(1)$ partições sem JOIN |
| **Tombstone Marker** | Gravação de deleção em append-only | Leituras degradam até a conclusão do gc_grace |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Boas Práticas contra Tombstones
1. Evite usar Cassandra como fila de mensagens (onde itens são inseridos e deletados rapidamente).
2. Utilize TTLs curtos e configure \`gc_grace_seconds\` adequadamente para permitir que o compaction purgue tombstones com frequência.

</details>
`);

// ==========================================
// 5. vector-databases-search
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/databases-storage/vector-databases-search/SYS-DB-VECTOR-000.md', `---
id: SYS-DB-VECTOR-000
title: "Mecanismo de Busca Invertida do Elasticsearch (Inverted Index) e BM25"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::elastic
  - freq::high
---

## Pergunta
Como a estrutura de Índice Invertido (Inverted Index) no Elasticsearch / Apache Lucene permite buscas textuais de alta velocidade em terabytes de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de mapear \`Documento -> Texto\`, o **Índice Invertido** analisa e tokeniza o texto criando um dicionário que mapeia cada **Termo único -> Lista de Documentos onde o termo ocorre** (*Posting List*).
- **Algoritmo de Relevância BM25 (Best Matching 25)**:
  - **Term Frequency (TF)**: Quantas vezes o termo aparece no documento (com saturação assintótica).
  - **Inverse Document Frequency (IDF)**: Quão raro o termo é no corpus inteiro (palavras raras recebem peso muito maior que palavras comuns).
  - **Document Length Normalization**: Penaliza documentos excessivamente longos.

### Dual Coding Visual
| Termo Tokenizado | Posting List (IDs de Documentos com Frequência) |
|---|---|
| **"distributed"** | \`Doc1 (freq=3)\`, \`Doc4 (freq=1)\`, \`Doc9 (freq=5)\` |
| **"systems"** | \`Doc1 (freq=2)\`, \`Doc2 (freq=1)\`, \`Doc4 (freq=4)\` |
| **"database"** | \`Doc3 (freq=8)\`, \`Doc4 (freq=2)\`, \`Doc7 (freq=1)\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Interseção de Posting Lists
- Uma busca por \`"distributed AND systems"\` executa uma **interseção de listas ordenadas** (via Skip Lists de Lucene) entre \`[1, 4, 9]\` e \`[1, 2, 4]\`, encontrando \`Doc1\` e \`Doc4\` em frações de milissegundo.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/vector-databases-search/SYS-DB-VECTOR-001.md', `---
id: SYS-DB-VECTOR-001
title: "Bancos Vetoriais (HNSW / pgvector) e Busca Aproximada de Vizinhos Mais Próximos (ANN)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::openai
  - freq::high
---

## Pergunta
Como o algoritmo Hierarchical Navigable Small World (HNSW) viabiliza buscas por similaridade semântica (ANN) em espaços vetoriais de alta dimensão para RAG?

## Resposta
### Quick Answer
**Solução Direta**:
- Em embeddings de LLM (ex: 1536 dimensões), calcular a distância euclidiana ou cosseno contra todos os vetores (*k-NN exato / Brute Force*) é inviável em escala ($O(N \\cdot D)$).
- **HNSW (Hierarchical Navigable Small World)**:
  - Constrói um grafo hierárquico multi-camadas inspirado em **Skip Lists**:
  - **Camadas Superiores**: Possuem conexões longas e esparsas para saltos rápidos no espaço vetorial.
  - **Camadas Inferiores**: Conexões densas e locais para refinamento fino.
- Permite encontrar os $K$ vizinhos mais próximos em tempo **logarítmico $O(\\log N)$** com alta precisão (*Recall* $> 95\\%$).

### Dual Coding Visual
| Algoritmo de Busca Vetorial | Complexidade de Tempo | Trade-off Operacional |
|---|---|---|
| **Flat (Brute Force k-NN)** | $O(N \\times D)$ | $100\\%$ Recall, inviável para $>100\\text{k}$ vetores |
| **IVF (Inverted File Index)** | $O(\\sqrt{N} \\times D)$ | Menor consumo de RAM, menor recall sob alta escala |
| **HNSW (Multi-layer Graph)** | $O(\\log N)$ | Altíssima velocidade de consulta, consome mais memória RAM |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em PostgreSQL com \`pgvector\`
\`\`\`sql
-- Cria índice HNSW com métrica de distância cosseno:
CREATE INDEX ON document_embeddings 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Busca semântica dos 5 documentos mais similares:
SELECT id, title, 1 - (embedding <=> $1) AS cosine_similarity
FROM document_embeddings
ORDER BY embedding <=> $1
LIMIT 5;
\`\`\`

</details>
`);

// ==========================================
// 6. scaling-replication-cdc
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/databases-storage/scaling-replication-cdc/SYS-DB-SCALING-000.md', `---
id: SYS-DB-SCALING-000
title: "Replicação Leader-Follower (Read Replicas) e a Anomalia de Replicação Lenta (Replication Lag)"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::aws
  - freq::high
---

## Pergunta
Como a topologia de Read Replicas (Leader-Follower assíncrono) escala leituras e por que o Replication Lag causa inconsistência momentânea?

## Resposta
### Quick Answer
**Solução Direta**:
- **Topologia**:
  - Um nó **Leader (Primário)** recebe todas as escritas (\`INSERT\`, \`UPDATE\`, \`DELETE\`).
  - Múltiplas **Read Replicas (Followers)** recebem streams de replicação assíncrona do Leader e servem consultas de leitura (\`SELECT\`).
- **Replication Lag**:
  - Ocorre quando réplicas demoram frações de segundo a segundos para aplicar o log de transações do primário (devido a I/O, rede ou queries longas na réplica).
  - Se um usuário atualiza seu perfil e recarrega a página imediatamente, a leitura roteada para a réplica atrasada exibe os dados antigos.

### Dual Coding Visual
| Papel do Nó | Operações Permitidas | Mecanismo de Sincronização |
|---|---|---|
| **Leader (Primário)** | Leitura e Escrita | Grava WAL e transmite para réplicas |
| **Read Replicas** | Apenas Leitura | Aplica stream de WAL assincronamente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Mitigar Replication Lag na Aplicação
1. **Roteamento de Leitura Crítica**: Roteie leituras sensíveis imediatamente após uma escrita (ex: checkout, tela de perfil do próprio usuário) diretamente para o **Leader**.
2. **Monotonic Read Routing**: Garanta que requisições consecutivas da mesma sessão de usuário sejam enviadas para a mesma réplica física via *Sticky Routing*.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/databases-storage/scaling-replication-cdc/SYS-DB-SCALING-001.md', `---
id: SYS-DB-SCALING-001
title: "Change Data Capture (CDC com Debezium) lendo Logs de Transação (WAL)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::airbnb
  - freq::high
---

## Pergunta
Por que ferramentas de Change Data Capture (CDC) baseadas na leitura de logs de transação (Postgres WAL / MySQL Binlog) são superiores ao polling por coluna \`updated_at\`?

## Resposta
### Quick Answer
**Solução Direta**:
- **Limitações do Polling por \`updated_at\`**:
  1. Sobrecarga de I/O por consultas constantes (\`SELECT * WHERE updated_at > ?\`).
  2. **Não captura \`DELETEs\`** (a linha física desaparece da tabela).
  3. Pode ignorar alterações intermediárias rápidas que ocorrem entre ciclos de polling.
- **CDC via WAL (ex: Debezium)**:
  1. Conecta-se como uma réplica lógica e consome o log binário de transações em tempo real com **zero overhead de query**.
  2. Captura $100\\%$ das mutações (\`INSERT\`, \`UPDATE\`, \`DELETE\`) com valores antes e depois (*Before/After state*).
  3. Alimenta streams no Kafka para sincronização de Elasticsearch, Caches e Data Lakes com latência sub-segundo.

### Dual Coding Visual
| Estratégia de Captura | Impacto no Banco Primário | Captura Deleções? |
|---|---|---|
| **Polling (\`WHERE updated_at\`)** | Alto (Queries recorrentes com table scan) | NÃO (Linhas apagadas são invisíveis) |
| **CDC via Log / WAL** | Quase zero (Stream passivo de transações) | **SIM (100% dos eventos com estado pré/pós)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Payload CDC emitido para o Kafka
\`\`\`json
{
  "before": { "id": 1, "balance": 100.00 },
  "after": { "id": 1, "balance": 80.00 },
  "op": "u",
  "ts_ms": 1771234567890
}
\`\`\`

</details>
`);

// ==========================================
// 7. caching-patterns
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/caching-patterns/SYS-CACHE-PATTERNS-000.md', `---
id: SYS-CACHE-PATTERNS-000
title: "Padrões de Cache: Cache-Aside (Lazy Loading) vs Read-Through / Write-Through"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::twitter
  - freq::high
---

## Pergunta
Qual é a diferença operacional entre o padrão Cache-Aside (Lazy Loading) e o padrão Write-Through no ciclo de vida de atualização de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache-Aside (Lazy Loading)**:
  - A aplicação é responsável por coordenar o cache e o banco:
  - Na leitura: consulta o cache; em caso de *Cache Miss*, lê do banco, grava no cache e retorna.
  - Na escrita: grava no banco de dados e **invalida (deleta)** a chave no cache.
- **Write-Through**:
  - A aplicação grava exclusivamente no cache; o componente de cache grava **sincronamente** no banco de dados na mesma operação antes de retornar sucesso.
  - Garante consistência imediata entre cache e storage, com custo de maior latência de escrita.

### Dual Coding Visual
| Padrão de Cache | Responsável pela Integração | Comportamento na Escrita |
|---|---|---|
| **Cache-Aside** | Código da Aplicação | Grava no DB e deleta chave no cache |
| **Write-Through** | Mecanismo do Próprio Cache | Grava no Cache e no DB sincronicamente |
| **Write-Back (Behind)** | Mecanismo do Próprio Cache | Grava no Cache; DB atualizado assincronamente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Deletar é Melhor do que Atualizar a Chave no Cache-Aside
- Se duas requisições concorrentes gravarem no banco, atualizar o cache diretamente pode causar uma condição de corrida onde o cache fica com um valor antigo sobrescrevendo um novo. Deletar a chave força a próxima leitura a buscar o dado mais recente no banco.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/caching-patterns/SYS-CACHE-PATTERNS-001.md', `---
id: SYS-CACHE-PATTERNS-001
title: "Políticas de Evicção de Cache: LRU, LFU, ARC e TinyLFU"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::netflix
  - freq::high
---

## Pergunta
Como a política de evicção LRU (Least Recently Used) se compara à LFU (Least Frequently Used) e por que sistemas modernos adotam W-TinyLFU?

## Resposta
### Quick Answer
**Solução Direta**:
- **LRU (Least Recently Used)**: Descarta o item acessado há mais tempo (implementado com HashMap + Doubly Linked List em $O(1)$). Vulnerável a poluição por varreduras pontuais (*Scan Pollution*).
- **LFU (Least Frequently Used)**: Descarta o item com menor frequência de acessos. Vulnerável a itens antigos com contadores históricos inflados que nunca são removidos (*Frequency Pollution*).
- **W-TinyLFU (Caffeine Cache / Redis)**:
  - Combina uma pequena janela de admissão LRU para itens novos com um filtro probabilístico **Count-Min Sketch** com mecanismo de decaimento temporal.
  - Garante taxas de acerto (*Hit Rate*) superiores a qualquer algoritmo clássico isolado.

### Dual Coding Visual
| Política de Evicção | Critério de Descarte | Vulnerabilidade Típica |
|---|---|---|
| **LRU** | Menor recência (acessado há mais tempo) | Varreduras completas limpam o cache útil |
| **LFU** | Menor frequência de acessos | Itens históricos obsoletos travam o espaço |
| **W-TinyLFU** | Equilíbrio entre recência e frequência com decaimento | Complexidade de estrutura (otimizado em bibliotecas) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação de LRU em Go ($O(1)$)
\`\`\`go
package main

import "container/list"

type LRUCache struct {
  capacity int
  items    map[string]*list.Element
  order    *list.List
}
type entry struct { key, value string }
// Get move elemento para frente do list; Put insere na frente e remove do fundo se lotado
\`\`\`

</details>
`);

// ==========================================
// 8. cache-invalidation-anomalies
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/cache-invalidation-anomalies/SYS-CACHE-ANOMALIES-000.md', `---
id: SYS-CACHE-ANOMALIES-000
title: "Cache Stampede (Thundering Herd) e Mitigação via Mutex Lock / Probabilistic Early Expiration"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::meta
  - freq::high
---

## Pergunta
O que é o fenômeno Cache Stampede (Thundering Herd) que ocorre após a expiração de uma chave quente e como mitigá-lo com Singleflight / XFetch?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache Stampede**: Quando uma chave de cache altamente requisitada (Hot Key, ex: 50.000 QPS) expira, milhares de requisições simultâneas sofrem *Cache Miss* no mesmo instante e disparam a mesma query pesada contra o banco de dados, derrubando o banco primário.
- **Mitigações Comprovadas**:
  1. **Mutex Lock / Singleflight (Go \`singleflight\`)**: Apenas uma única goroutine/thread adquire permissão para consultar o banco e recalcular o cache; todas as demais requisições aguardam e compartilham o mesmo resultado.
  2. **Expiração Antecipada Probabilística (XFetch Algorithm)**: O cliente recalcula o valor antes da expiração com probabilidade crescente à medida que o TTL se aproxima do fim:
     $$\\Delta - \\beta \\cdot \\ln(\\text{rand}()) > \\text{TTL}$$

### Dual Coding Visual
| Estratégia contra Stampede | Mecânica | Impacto no Banco de Dados |
|---|---|---|
| **Sem Proteção (Ingênuo)** | 50.000 requisições batem no DB ao expirar | Queda imediata do banco de dados |
| **Mutex / Singleflight** | 1 requisição bate no DB; 49.999 aguardam na RAM | Carga estável de exatamente 1 query |
| **XFetch (Probabilístico)** | Recálculo em background antes de expirar | Zero downtime e zero Cache Miss |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go com \`singleflight.Group\`
\`\`\`go
package main

import "golang.org/x/sync/singleflight"

var g singleflight.Group

func GetData(key string) (string, error) {
  // Se 10.000 goroutines chamarem GetData(key) simultaneamente, a função anônima roda 1 vez
  v, err, _ := g.Do(key, func() (interface{}, error) {
    return fetchFromDatabase(key)
  })
  return v.(string), err
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/cache-invalidation-anomalies/SYS-CACHE-ANOMALIES-001.md', `---
id: SYS-CACHE-ANOMALIES-001
title: "Cache Penetration vs Cache Breakdown vs Cache Avalanche"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual entre as anomalias de Cache Penetration, Cache Breakdown e Cache Avalanche?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache Penetration**: Requisições consultam chaves que **não existem nem no cache nem no banco de dados** (ex: ataque malicioso com IDs aleatórios \`id=-999\`). Toda requisição perfura o cache e atinge o banco.
  - *Mitigação*: **Bloom Filter** na frente do cache ou armazenar valores nulos temporários com TTL curto (\`SET key NULL EX 60\`).
- **Cache Breakdown**: **Uma única chave quente** (Hot Key) expira sob alto tráfego.
  - *Mitigação*: Mutex lock / Singleflight ou chaves sem expiração com refresh assíncrono.
- **Cache Avalanche**: **Múltiplas chaves diferentes expiram no mesmo milissegundo** porque foram criadas com o mesmo TTL fixo.
  - *Mitigação*: Adicionar **Jitter aleatório** ao TTL (\`TTL = 3600 + rand(0, 300)\`).

### Dual Coding Visual
| Anomalia | Causa Raiz | Mitigação Principal |
|---|---|---|
| **Penetration** | Chave inexistente no sistema todo | Bloom Filter / Cache Null |
| **Breakdown** | 1 Hot Key específica expira | Mutex / Singleflight |
| **Avalanche** | Milhares de chaves expiram juntas | TTL com Jitter Aleatório |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Funciona o Bloom Filter contra Penetration
- O Bloom Filter é uma estrutura de dados probabilística em memória ultra-compacta:
  - Se o Bloom Filter diz que a chave **NÃO existe**, é uma certeza absoluta ($100\\%$ de acerto): a requisição é rejeitada imediatamente sem tocar no cache ou no banco.
  - Se diz que **TALVEZ exista**, a busca prossegue normalmente.

</details>
`);

// ==========================================
// 9. redis-internals
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/redis-internals/SYS-CACHE-REDIS-000.md', `---
id: SYS-CACHE-REDIS-000
title: "Event Loop Single-Threaded do Redis e I/O Multiplexing (epoll / kqueue)"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::redis
  - freq::high
---

## Pergunta
Por que o Redis consegue processar mais de 100.000 operações por segundo utilizando uma arquitetura de execução Single-Threaded?

## Resposta
### Quick Answer
**Solução Direta**:
- **Três Pilares de Performance do Redis**:
  1. **Operação 100% em Memória RAM**: Todos os dados residem na memória principal, eliminando latências de busca em disco.
  2. **I/O Multiplexing não-bloqueante (\`epoll\` no Linux / \`kqueue\` no BSD)**: Uma única thread monitora milhares de sockets abertos simultaneamente, processando requisições prontas em lote.
  3. **Zero Contenção de Locks**: Por ser single-threaded na execução dos comandos, o Redis **não possui locks, mutexes ou context switches de CPU**, garantindo execução atômica determinística de cada comando.

### Dual Coding Visual
| Paradigma de Execução | Overhead de Sincronização | Desempenho em Memória |
|---|---|---|
| **Multi-Threaded com Locks** | Alto (Contenção de mutexes e context switch de CPU) | Sujeito a gargalos sob alta concorrência |
| **Redis Single-Threaded (epoll)** | **Zero (Sem locks nem race conditions)** | **Excepcional (>100k ops/segundo por core)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Comandos $O(N)$ são Perigosos no Redis
- Como o loop de execução é single-threaded, comandos demorados como \`KEYS *\` ou \`FLUSHALL\` travam o servidor inteiro, fazendo com que todas as outras conexões entrem em timeout. Use \`SCAN\` iterativo em produção.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/redis-internals/SYS-CACHE-REDIS-001.md', `---
id: SYS-CACHE-REDIS-001
title: "Estruturas de Dados Internas do Redis: SDS, ZipList e SkipList (ZSet)"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::redis
  - freq::high
---

## Pergunta
Como o Redis implementa Sorted Sets (ZSet) combinando internamente uma SkipList e uma Hash Table para obter operações de busca e ranking em $O(\\log N)$ e $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A estrutura **Sorted Set (ZSet)** do Redis atende a dois casos de uso distintos com máxima eficiência combinando:
  1. **Hash Table**: Mapeia \`Member -> Score\` para consultas de pontuação em tempo constante **$O(1)$** (ex: \`ZSCORE\`).
  2. **SkipList (Lista com Saltos)**: Mantém os elementos ordenados por pontuação (\`Score\`), permitindo inserções, remoções e consultas por ranking/faixa em tempo logarítmico **$O(\\log N)$** (ex: \`ZRANGEBYSCORE\`, \`ZRANK\`).
- Para conjuntos pequenos com poucos elementos, o Redis utiliza codificações compactas em memória (**ZipList / ListPack**) economizando até $80\\%$ de RAM.

### Dual Coding Visual
| Operação no ZSet | Estrutura Interna Utilizada | Complexidade de Tempo |
|---|---|---|
| \`ZSCORE member\` | Hash Table | $O(1)$ |
| \`ZRANGEBYSCORE min max\` | SkipList | $O(\\log N + M)$ |
| \`ZRANK member\` | SkipList com contadores de largura (*Span*) | $O(\\log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como a SkipList Calcula o Ranking ($O(\\log N)$)
- Cada ponteiro entre nós na SkipList do Redis armazena um atributo \`span\` (quantos nós aquele salto pula). O ranking é calculado somando os \`spans\` percorridos do topo até o elemento alvo, sem precisar contar nós um a um.

</details>
`);

// ==========================================
// 10. cdn-edge-caching
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/cdn-edge-caching/SYS-CACHE-CDN-000.md', `---
id: SYS-CACHE-CDN-000
title: "CDNs, Anycast BGP Routing e Redução de RTT via Pontos de Presença (PoPs)"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::cloudflare
  - freq::high
---

## Pergunta
Como Redes de Entrega de Conteúdo (CDNs) utilizam Anycast BGP e Pontos de Presença (PoPs) distribuídos para reduzir a latência de Round-Trip Time (RTT)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Anycast BGP**: Múltiplos servidores CDN espalhados globalmente anunciam o **mesmo endereço IP público** via protocolo BGP na internet. Os roteadores dos provedores de internet (ISPs) encaminham o pacote do usuário para o servidor geograficamente ou topologicamente mais próximo.
- **Pontos de Presença (PoPs)**:
  - Terminam o aperto de mão TCP e TLS 1.3 na **borda da rede** (Edge), a poucos milissegundos do usuário final.
  - Se o asset estiver em cache no PoP (Edge Cache Hit), a resposta é entregue em $\\sim 5-15 \\text{ ms}$, blindando os servidores de origem (*Origin Shields*).

### Dual Coding Visual
| Tipo de Requisição | Roteamento e Término | Latência de RTT Típica |
|---|---|---|
| **Sem CDN (Direto na Origem)** | Roteamento Unicast transcontinental | 150 - 300 ms |
| **Com CDN (Edge Cache Hit)** | Roteamento Anycast para PoP local | 5 - 15 ms |
| **Com CDN (Cache Miss na Edge)** | PoP busca na Origem via conexão persistente | ~150 ms (Próximas requisições ficam em cache) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Conexão com a Origem
- Entre o PoP da CDN e o servidor de origem, a CDN mantém **pools de conexões TCP/TLS aquecidas** (*Persistent Keep-Alive Connections*), eliminando a latência de novos handshakes mesmo em caso de Cache Miss.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/caching-cdn/cdn-edge-caching/SYS-CACHE-CDN-001.md', `---
id: SYS-CACHE-CDN-001
title: "Diretivas HTTP Cache-Control: max-age, s-maxage, stale-while-revalidate e ETag"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::akamai
  - freq::high
---

## Pergunta
Qual é a diferença entre as diretivas \`max-age\`, \`s-maxage\` e \`stale-while-revalidate\` do cabeçalho HTTP \`Cache-Control\` na interação entre Browsers e CDNs?

## Resposta
### Quick Answer
**Solução Direta**:
- \`max-age=N\`: Tempo máximo (em segundos) que a resposta pode ficar em cache no **Browser (Cliente privado)**.
- \`s-maxage=N\`: Tempo máximo específico para **Caches Compartilhados / CDNs** (sobrescreve o \`max-age\` para CDNs e proxies intermediários).
- \`stale-while-revalidate=N\`: Permite que a CDN sirva imediatamente um dado expirado (*stale*) ao usuário em frações de milissegundo, enquanto dispara **assincronamente em background** uma requisição à origem para revalidar e atualizar o cache.
- \`ETag / If-None-Match\`: Validador de conteúdo que retorna status \`304 Not Modified\` sem reenviar o payload se o conteúdo não mudou.

### Dual Coding Visual
| Diretiva HTTP | Onde se Aplica | Efeito Prático |
|---|---|---|
| **\`max-age=300\`** | Navegador do Usuário | Cache privado local de 5 minutos |
| **\`s-maxage=86400\`** | Servidor Edge da CDN | Cache público compartilhado de 24 horas |
| **\`stale-while-revalidate=60\`** | CDN e Navegadores modernos | Resposta instantânea com refresh assíncrono |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Cabeçalho de Alta Performance
\`\`\`text
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=300
ETag: "w/33a64df551425fcc3e"
\`\`\`

</details>
`);

console.log('✅ Databases, Storage & Caching cards successfully generated and validated!');
