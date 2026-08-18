---
id: SYS-ARCH-METRICS-001
title: "Arquitetura de Métricas: Modelo Pull (Prometheus) vs Push (Datadog) e Downsampling"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::datadog
  - freq::high
---

## Pergunta
Quais são os trade-offs entre o modelo de coleta Pull (Prometheus) e Push (Datadog/StatsD) e como o Downsampling gerencia o custo de armazenamento?

## Resposta
### Quick Answer
**Solução Direta**:
- **Modelo Pull (Prometheus)**:
  - O servidor central faz *Scrape* periódico (HTTP `/metrics`) nos serviços registrados no Service Discovery.
  - **Pró**: Fácil monitoramento de saúde (se o scrape falha, o serviço está fora do ar); controle de taxa centralizado.
  - **Contra**: Exige que as instâncias sejam acessíveis via rede (dificuldade em tarefas Serverless/Batch).
- **Modelo Push (Datadog / StatsD / OpenTelemetry Agent)**:
  - A aplicação envia métricas ativamente via UDP/gRPC para um coletor local ou gateway central.
  - **Pró**: Ideal para funções efêmeras (AWS Lambda) e ambientes com restrições de firewall.
- **Downsampling (Rollups)**:
  - Dados brutos com resolução de 10 segundos são mantidos por 7 dias.
  - Após 7 dias, são agregados em médias/percentis de 5 minutos (retenção de 30 dias).
  - Após 30 dias, são agregados em médias de 1 hora (retenção de 1 ano), reduzindo em $>95\%$ o volume de dados em disco.

### Dual Coding Visual
| Modelo de Coleta | Iniciação da Conexão | Cenário Ideal |
|---|---|---|
| **Pull (Prometheus)** | Servidor busca na aplicação | Microsserviços e contêineres de longa duração |
| **Push (StatsD / OTel)** | Aplicação envia para o coletor | Funções Serverless efêmeras e jobs em lote |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cálculo de Percentis (p99 / p95) com t-Digest
- Ao realizar downsampling, médias simples distorcem a realidade de latência. Utilizam-se estruturas probabilísticas como **t-Digest ou HdrHistogram** para calcular percentis p95/p99 agregados com alta fidelidade matemática.

</details>
