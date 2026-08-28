---
id: SYS-ARCH-SCHEDULER-000
title: "Agendador de Tarefas Distribuído (Temporal / Distributed Cron): Delay Queues e Timers de Alta Escala"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::uber
  - freq::high
---

## Pergunta
Como agendadores de tarefas distribuídos escalam a execução de milhões de timers usando Filas Atrasadas (Delay Queues) e Sorted Sets no Redis?

## Resposta
### Quick Answer
**Solução Direta**:
- **Delay Queue com Redis Sorted Set**:
  1. A tarefa agendada é inserida no ZSet com `Score = execution_timestamp_epoch_ms` e `Member = task_id`.
  2. Um pool de workers consulta periodicamente em lote:
     `ZRANGEBYSCORE delay_queue 0 current_timestamp LIMIT 0 100`.
  3. Para garantir que exatamente um worker processe a tarefa, utiliza-se script Lua ou `ZPOPMIN` atômico.
  4. As tarefas prontas são movidas imediatamente para a fila de execução ativa (Kafka / RabbitMQ / SQS) para despacho aos workers.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Agendador Distribuído: Delay Queue com Redis Sorted Set (ZSet)</text>
  <g transform="translate(40, 50)">
    <!-- Task Insertion -->
    <rect x="0" y="20" width="160" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Nova Tarefa</text>
    <text x="80" y="68" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">ZADD tasks_delayed</text>
    <text x="80" y="88" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">score = execution_epoch</text>

    <!-- Redis ZSet -->
    <rect x="200" y="0" width="200" height="120" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="300" y="24" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Redis Sorted Set</text>
    <rect x="215" y="38" width="170" height="22" rx="3" fill="#451a03"/>
    <text x="300" y="53" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">Task A (score: 1700000000)</text>
    <rect x="215" y="64" width="170" height="22" rx="3" fill="#451a03"/>
    <text x="300" y="79" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">Task B (score: 1700000060)</text>
    <rect x="215" y="90" width="170" height="22" rx="3" fill="#451a03"/>
    <text x="300" y="105" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">Task C (score: 1700000300)</text>

    <!-- Workers Polling via Lua -->
    <rect x="440" y="20" width="160" height="85" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="520" y="45" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Workers Polling</text>
    <text x="520" y="68" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">ZRANGEBYSCORE 0 now</text>
    <text x="520" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">ZREM atômico via Lua</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Script Lua atômico (ZRANGEBYSCORE + ZREM) garante que cada tarefa é entregue a exatamente 1 worker.</text>

</svg>

| Componente do Agendador | Estrutura | Responsabilidade |
|---|---|---|
| **Timer Registry** | Redis ZSet / RocksDB ordenado | Mantém tarefas ordenadas por timestamp de disparo |
| **Poller / Dispatcher** | Workers distribuídos com `ZPOPMIN` | Dispara tarefas cujo timestamp $\le$ momento atual |
| **Execution Queue** | RabbitMQ / Kafka | Execução real das tarefas com retries e workers |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Hierárquico Hashed Timing Wheel
- Para bilhões de timers em memória, frameworks como Netty e Kafka utilizam **Hashed Timing Wheels** (estruturas circulares inspiradas em ponteiros de relógio), permitindo agendamento e cancelamento de timers em **$O(1)$ constante**.

</details>
