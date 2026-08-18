---
id: BEH-SRE-PILARS-002
title: "Fluxo Integrado de Diagnóstico de Incidentes: Métricas, Tracing Distribuído e Logs"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Qual é o modelo mental de **fluxo integrado de diagnóstico em produção** combinando métricas, traces distribuídos e logs?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo Sequencial em 3 Etapas**:
  1. **Alerta de Métrica Dispara**: O Prometheus detecta anomalia estatística (ex: *latência p99 do Checkout ultrapassou 2.000ms*).
  2. **Isolamento por Distributed Tracing (APM)**: O engenheiro inspeciona o gráfico de spans do `Trace ID` e constata que o *Payment Service* consumiu 1.950ms esperando resposta do banco.
  3. **Inspeção de Logs Estruturados**: O engenheiro filtra os logs do *Payment Service* pelo `Trace ID` e localiza o erro exato: `{"level":"error","msg":"db deadlock acquiring row lock on account_id 8821"}`.

### Dual Coding Visual
| Etapa de Diagnóstico | Ferramenta Utilizada | Informação Obtida |
|---|---|---|
| **1. Alerta** | Prometheus / Alertmanager | Saturação de latência p99 no serviço |
| **2. Localização** | Jaeger / Datadog APM | O Span do banco levou 1.950ms |
| **3. Causa Raiz** | Elasticsearch / Loki (Logs) | Deadlock na query de saldo no banco |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha de Diagnóstico Integrada
```text
[Alerta de Métrica] ──► "Latência p99 > 2s no Checkout"
         │
         ▼
[Trace Distribuído] ──► API Gateway (5ms) ➔ Order (15ms) ➔ Payment (1.950ms no Postgres)
         │
         ▼
[Log Estruturado]   ──► {"trace_id":"4bf92f35","error":"deadlock detected on lock row"}
```

#### Key Takeaways
- Correlacionar métricas, traces e logs via `Trace ID` reduz o tempo de diagnóstico de horas para minutos, eliminando buscas cegas em milhões de linhas de log.

</details>
