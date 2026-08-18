---
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
  - Não existe normalização nem `JOIN`; cada tabela é modelada exclusivamente para atender a **uma consulta específica da aplicação** (duplicação deliberada de dados em múltiplas tabelas).
- **Problema de Tombstones**:
  - No Cassandra (LSM-Tree), um `DELETE` não apaga os dados imediatamente; ele grava um marcador chamado **Tombstone** com timestamp.
  - Se a aplicação deletar milhões de registros, leituras subsequentes por faixa precisam ler e descartar centenas de milhares de Tombstones da memória/disco antes de encontrar registros vivos, causando picos severos de latência ou `ReadTimeoutException` (*Tombstone Storm*).

### Dual Coding Visual
| Conceito Cassandra | Comportamento | Impacto de Performance |
|---|---|---|
| **Query-Driven Design** | 1 Tabela por padrão de acesso | Leituras em $O(1)$ partições sem JOIN |
| **Tombstone Marker** | Gravação de deleção em append-only | Leituras degradam até a conclusão do gc_grace |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Boas Práticas contra Tombstones
1. Evite usar Cassandra como fila de mensagens (onde itens são inseridos e deletados rapidamente).
2. Utilize TTLs curtos e configure `gc_grace_seconds` adequadamente para permitir que o compaction purgue tombstones com frequência.

</details>
