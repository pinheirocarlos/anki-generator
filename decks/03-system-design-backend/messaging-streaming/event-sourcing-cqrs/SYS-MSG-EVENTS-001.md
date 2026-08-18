---
id: SYS-MSG-EVENTS-001
title: "CQRS (Command Query Responsibility Segregation) e Projeções de Leitura Assíncronas"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::microsoft
  - freq::high
---

## Pergunta
Como o padrão CQRS segrega os modelos de escrita (Commands) e leitura (Queries) e como as Projeções de Leitura são atualizadas?

## Resposta
### Quick Answer
**Solução Direta**:
- O **CQRS** divide a aplicação em dois modelos arquiteturais completamente isolados:
  1. **Lado de Comando (Write / Command)**: Otimizado estritamente para validação de regras de negócio complexas e gravação transacional atômica (ex: Event Store ou Postgres relacional).
  2. **Lado de Consulta (Read / Query)**: Otimizado estritamente para consultas rápidas com modelos desnormalizados prontos para exibição (ex: Elasticsearch para busca textual, Redis para ranking, MongoDB para leitura de telas).
- **Projeções de Leitura**: Consomem eventos emitidos pelo lado de comando e atualizam assincronamente as visões de leitura (*Read Models*), operando com **consistência eventual**.

### Dual Coding Visual
| Dimensão CQRS | Lado de Comando (Command) | Lado de Consulta (Query) |
|---|---|---|
| **Operações** | Mutação (`CreateOrder`, `CancelOrder`) | Leitura (`GetOrderDetails`, `SearchOrders`) |
| **Banco Otimizado** | Relacional ACID / Event Store | Elasticsearch, Redis, Read-Only Views |
| **Consistência** | Forte / Imediata | Eventual (Atualizado via Event Projections) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desacoplamento de Escala
- Se sua aplicação recebe 100 leituras para cada 1 escrita, o lado de leitura pode ser escalado horizontalmente com 20 nós de Elasticsearch e Read Replicas sem impactar o nó primário de gravação de comandos.

</details>
