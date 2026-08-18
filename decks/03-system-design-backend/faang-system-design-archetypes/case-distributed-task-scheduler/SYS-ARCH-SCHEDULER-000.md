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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/distributed-task-scheduler-delay-queue-redis-zset-loop.webm">
    <p>Visualização: Agendador distribuído usando Redis Sorted Sets com score de timestamp para puxar tarefas prontas com baixa latência.</p>
  </video>
</div>

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
