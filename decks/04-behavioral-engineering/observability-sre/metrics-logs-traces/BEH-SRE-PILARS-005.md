---
id: BEH-SRE-PILARS-005
title: "Head-based Sampling vs Tail-based Sampling em Distributed Tracing"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::uber
  - freq::high
---

## Pergunta
Qual é a diferença operacional e de custo entre **Head-based Sampling** e **Tail-based Sampling** em Distributed Tracing?

## Resposta
### Quick Answer
**Solução Direta**:
- **Head-based Sampling (Amostragem no Início)**:
  - A decisão de gravar ou descartar o trace é tomada no primeiro serviço da chamada (ex: amostrar 5% aleatório).
  - *Vantagem*: Baixíssimo consumo de CPU, rede e storage.
  - *Desvantagem*: Pode descartar traces de requisições raras que falharam no final da cadeia.
- **Tail-based Sampling (Amostragem no Final)**:
  - O OpenTelemetry Collector retém 100% dos spans em um buffer em memória e só persiste no storage traces completos que apresentaram erro ($HTTP ge 500$) ou latência acima do percentil p99.
  - *Vantagem*: Captura 100% dos erros e anomalias relevantes.
  - *Desvantagem*: Exige mais memória e poder computacional no Collector.

### Dual Coding Visual
| Estratégia de Sampling | Ponto de Decisão & Custo | Captura de Erros |
|---|---|---|
| **Head-based** | Entrada do serviço (Custo Mínimo) | Incompleta (amostragem cega) |
| **Tail-based** | OTel Collector (Custo Moderado) | Completa (100% de erros) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura de Tail-Based Sampling
```text
[Microsserviços] ──(100% dos Spans)──► [OTel Collector Buffer]
                                                │
                                                ▼
                              ┌───────────────────────────────────┐
                              │ Regra: Erro HTTP >= 500 OU > 1s?  │
                              └─────────────────┬─────────────────┘
                                                │
                                 SIM ───────────┴─────────── NÃO
                                  │                           │
                                  ▼                           ▼
                         [Persiste no Jaeger]            [Descarta Span]
```

#### Key Takeaways
- Tail-based sampling oferece o melhor custo-benefício de observabilidade moderna, garantindo visibilidade total de erros sem explodir custos de storage.

</details>
