---
id: SYS-ARCH-SCHEDULER-001
title: "Execução de DAGs de Tarefas, Heartbeats de Workers e Resiliência a Falhas"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::airbnb
  - freq::high
---

## Pergunta
Como orquestradores de fluxo (Temporal / Apache Airflow) coordenam a execução de tarefas dependentes em DAGs e tratam falhas de workers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Grafo Acíclico Direcionado (DAG)**:
  - Define a ordem topológica de dependências entre tarefas (a Tarefa C só pode iniciar após o término bem-sucedido de A e B).
  - O orquestrador mantém uma máquina de estados com a contagem de dependências pendentes (*In-degree*) de cada nó.
- **Heartbeats e Detecção de Falha de Workers**:
  - Enquanto um worker executa uma tarefa longa, ele envia **Heartbeats periódicos** (ex: a cada 5 segundos) para o servidor de controle.
  - Se o worker morrer (crash, falha de máquina ou perda de rede) e não enviar heartbeat antes do `heartbeat_timeout`, o orquestrador reatribui a tarefa para outro worker saudável a partir do último checkpoint gravado.

### Dual Coding Visual
| Mecanismo de Resiliência | Gatilho de Disparo | Ação do Orquestrador |
|---|---|---|
| **Heartbeat Timeout** | Worker para de enviar sinal de vida | Reatribui a tarefa para outro nó saudável |
| **Ordem Topológica (DAG)** | Tarefas pai concluem com sucesso | Destrava e despacha as tarefas filhas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Event Sourcing na Execução de Workflows (Temporal)
- O Temporal grava cada passo executado como um evento imutável em um log transacional. Se o servidor do orquestrador cair, ele reproduz o histórico de eventos (*Workflow Replay*) e retoma a execução exatamente do ponto onde parou sem reexecutar tarefas já concluídas.

</details>
