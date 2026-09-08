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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura de Métricas: Pull (Prometheus) vs Push (Datadog) &amp; Downsampling</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Modelo Pull (Prometheus)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Servidor busca /metrics nos targets</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Detecção imediata de nós offline</text>
    <text x="140" y="88" fill="#34d399" font-size="9" text-anchor="middle">Ideal para infraestrutura estática/K8s</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Modelo Push (Datadog / StatsD)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Agente envia métricas para o Gateway</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Melhor para jobs efêmeros (AWS Lambda)</text>
    <text x="460" y="88" fill="#34d399" font-size="9" text-anchor="middle">Exige proteção contra tempestades de tráfego</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Downsampling: 10s resolution (7 dias) → 5m resolution (30 dias) → 1h resolution (1 ano).</text>

</svg>
<p>Visualização: Coleta Pull por scraper central vs Push por agentes locais e agregação temporal (downsampling) para histórico de longo prazo.</p>

| Modelo de Coleta | Iniciação da Conexão | Cenário Ideal |
|---|---|---|
| **Pull (Prometheus)** | Servidor busca na aplicação | Microsserviços e contêineres de longa duração |
| **Push (StatsD / OTel)** | Aplicação envia para o coletor | Funções Serverless efêmeras e jobs em lote |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cálculo de Percentis (p99 / p95) com t-Digest
- Ao realizar downsampling, médias simples distorcem a realidade de latência. Utilizam-se estruturas probabilísticas como **t-Digest ou HdrHistogram** para calcular percentis p95/p99 agregados com alta fidelidade matemática.

</details>
