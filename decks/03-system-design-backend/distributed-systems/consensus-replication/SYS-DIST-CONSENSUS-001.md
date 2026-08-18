---
id: SYS-DIST-CONSENSUS-001
title: "Replicação de Log no Raft e Mecanismo de Commit por Quorum"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como o líder no algoritmo Raft garante a consistência do log replicado e determina quando uma entrada de log está efetivamente 'commitada'?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo de Escrita**:
  1. O cliente envia um comando para o **Leader**.
  2. O Leader grava o comando em seu próprio log local como *uncommitted*.
  3. O Leader dispara RPCs `AppendEntries` em paralelo para todos os Followers.
  4. Quando a maioria dos nós ($N/2 + 1$) confirma a gravação no disco, a entrada é considerada **Commitada**.
  5. O Leader aplica a entrada à sua Máquina de Estados (FSM) e retorna sucesso ao cliente.
  6. No próximo heartbeat, o Leader notifica os Followers do novo `commitIndex`, que aplicam a entrada às suas respectivas FSMs.

### Dual Coding Visual
| Fase da Replicação | Estado da Entrada de Log | Visibilidade para o Cliente |
|---|---|---|
| **1. Proposta** | Gravada apenas no log do Leader | Invisível (Em processamento) |
| **2. Quorum Atingido** | Gravada em $>50\%$ dos nós | Efetivada (Retorna sucesso ao cliente) |
| **3. Aplicação na FSM** | Executada na Máquina de Estados | Dados consultáveis via leitura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Resolução de Conflitos de Log
- Se um Follower divergir do Leader (devido a falhas anteriores), o Leader força o log do Follower a duplicar o seu:
  - O Leader localiza a última entrada comum retrocedendo o `nextIndex` para esse nó e sobrescreve todas as entradas conflitantes subsequentes.

</details>
