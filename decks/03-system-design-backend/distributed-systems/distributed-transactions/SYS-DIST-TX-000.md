---
id: SYS-DIST-TX-000
title: "Two-Phase Commit (2PC): Fases Prepare e Commit e Vulnerabilidade de Bloqueio"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::oracle
  - freq::high
---

## Pergunta
Como funciona o protocolo Two-Phase Commit (2PC) e por que ele é classificado como um protocolo de commit síncrono bloqueante?

## Resposta
### Quick Answer
**Solução Direta**:
- O 2PC coordena uma transação atômica entre múltiplos bancos através de um **Coordenador**:
  - **Fase 1 (Prepare)**: O coordenador envia `PREPARE` para todos os nós participantes. Cada nó aloca locks locais, valida restrições, grava em WAL e responde `VOTE_COMMIT` ou `VOTE_ABORT`.
  - **Fase 2 (Commit/Abort)**: Se TODOS votaram sim, o coordenador grava `COMMIT` no log e envia `DO_COMMIT` a todos. Se qualquer nó votou não ou deu timeout, envia `DO_ABORT`.
- **Natureza Bloqueante**: Se o coordenador cair após a Fase 1 enquanto nós mantêm locks abertos, os participantes ficam bloqueados indefinidamente sem saber se devem commitar ou abortar (*Coordinator Failure Problem*).

### Dual Coding Visual
| Fase do 2PC | Ação do Coordenador | Ação dos Participantes |
|---|---|---|
| **Fase 1: Prepare** | Envia requisição de voto | Adquire locks e responde Sim/Não |
| **Fase 2: Commit/Abort** | Decide pelo consenso unânime | Aplica alteração e libera locks |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desvantagens em Escala Web / Microsserviços
- **Latência elevada**: O tempo total da transação é limitado pelo participante mais lento.
- **Deadlocks distribuídos**: Segurar locks por longos períodos sob alto throughput causa saturação de conexões.
- Por isso, microsserviços modernos substituem o 2PC por **Sagas** e consistência eventual.

</details>
