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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Orquestrador DAG &amp; Recuperação de Falhas por Heartbeat</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Topologia DAG: A → B e A → C antes de D</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker Ativo (Heartbeat OK)</text>
      <text x="130" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Heartbeat a cada 5s no Redis</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#7f1d1d"/>
      <text x="430" y="22" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Worker Falha (Sem Heartbeat por 30s)</text>
      <text x="430" y="40" fill="#fca5a5" font-size="9" text-anchor="middle">Tarefa reatribuída automaticamente a novo worker</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Tarefas idempotentes garantem que retentativas em workers secundários não corrompem o resultado final do pipeline.</text>

</svg>

| Mecanismo de Resiliência | Gatilho de Disparo | Ação do Orquestrador |
|---|---|---|
| **Heartbeat Timeout** | Worker para de enviar sinal de vida | Reatribui a tarefa para outro nó saudável |
| **Ordem Topológica (DAG)** | Tarefas pai concluem com sucesso | Destrava e despacha as tarefas filhas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Event Sourcing na Execução de Workflows (Temporal)
- O Temporal grava cada passo executado como um evento imutável em um log transacional. Se o servidor do orquestrador cair, ele reproduz o histórico de eventos (*Workflow Replay*) e retoma a execução exatamente do ponto onde parou sem reexecutar tarefas já concluídas.

</details>
