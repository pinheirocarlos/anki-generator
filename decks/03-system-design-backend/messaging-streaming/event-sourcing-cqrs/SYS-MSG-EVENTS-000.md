---
id: SYS-MSG-EVENTS-000
title: "Event Sourcing: Log Imutável de Eventos vs Estado Mutável Atual"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão Event Sourcing modela o estado de uma entidade como uma sequência imutável de eventos de domínio em vez de sobrescrever o registro atual?

## Resposta
### Quick Answer
**Solução Direta**:
- **Persistência Tradicional (CRUD)**: Armazena apenas o estado atual da entidade (ex: `balance = 500.00`), descartando o histórico de como aquele estado foi alcançado.
- **Event Sourcing**:
  - O estado atual **nunca é gravado diretamente**.
  - O sistema grava uma sequência cronológica estritamente imutável e *append-only* de **Eventos de Domínio** em um **Event Store**:
    - `AccountOpened(balance: 0)`
    - `MoneyDeposited(amount: 1000)`
    - `MoneyWithdrawn(amount: 500)`
  - O estado atual é reconstruído executando uma função de redução (*Fold/Replay*) sobre todos os eventos históricos da entidade.
- Fornece **trilha de auditoria 100% perfeita**, viagem no tempo (*Time Travel Debugging*) e reconstrução histórica.

### Dual Coding Visual
| Paradigma | O que fica persistido no banco | Rastreabilidade Histórica |
|---|---|---|
| **CRUD Convencional** | Apenas a linha com valor atual | Nula (Sobrescrita destrutiva) |
| **Event Sourcing** | Sequência imutável de eventos passados | **Perfeita (Auditoria matemática)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização via Snapshots
- Se uma conta bancária possuir 100.000 eventos, reconstruir o saldo a cada leitura ficaria lento. O sistema grava periodicamente **Snapshots** (ex: a cada 100 eventos). Para carregar o estado, lê o último Snapshot e aplica apenas os eventos ocorridos após ele.

</details>
