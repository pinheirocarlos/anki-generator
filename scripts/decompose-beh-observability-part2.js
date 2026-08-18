import { writeAndValidateCard } from './decompose-helper.js';

console.log('--- Decompondo Observability Pilars & SLI/SLO ---');

// ==========================================
// 8. Metrics, Logs & Traces
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/metrics-logs-traces/BEH-SRE-PILARS-000.md', `---
id: BEH-SRE-PILARS-000
title: "Os 3 Pilares da Observabilidade: Perguntas Respondidas por Métricas, Logs e Traces"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
O que são os **3 Pilares da Observabilidade (Metrics, Logs e Distributed Tracing)** e qual a pergunta essencial que cada um responde?

## Resposta
### Quick Answer
**Solução Direta**:
- **Os 3 Pilares**:
  1. **Métricas (Dados Numéricos Agregados)**: Respondem **SE** há um problema no sistema (ex: *taxa de erro 5xx subiu para 7%*, *utilização de CPU em 95%*). Baixíssimo custo de armazenamento.
  2. **Logs (Eventos Textuais Estruturados em JSON)**: Respondem **O QUE** aconteceu em um evento específico com detalhes de contexto (ex: *stack trace de NullPointerException*, *ID de usuário*).
  3. **Distributed Traces (Árvores de Spans com Trace ID)**: Respondem **ONDE** na cadeia de microsserviços ocorreu o gargalo ou a lentidão.

### Dual Coding Visual
| Pilar | Pergunta Respondida | Volume de Dados & Custo |
|---|---|---|
| **Métricas** | *"O sistema está saudável ou degradado?"* | Baixo (dados agregados) |
| **Logs** | *"O que exatamente ocorreu neste evento?"* | Alto (texto contextual em JSON) |
| **Traces** | *"Onde na malha distribuída ocorreu a lentidão?"* | Médio/Alto (controlado por sampling) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Analogia Médica dos 3 Pilares
\`\`\`text
Diagnóstico Clínico de Sistemas:
├── Métricas = Termômetro e Medidor de Pressão (alertam sobre febre em tempo real).
├── Logs = Prontuário Médico Detalhado (registram sintomas específicos e histórico).
└── Tracing = Ressonância Magnética com Contraste (revela o ponto exato da obstrução).
\`\`\`

#### Key Takeaways
- Nenhum pilar substitui os outros: métricas geram alertas rápidos, traces localizam o serviço culpado e logs revelam o motivo raiz do erro no código.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/metrics-logs-traces/BEH-SRE-PILARS-001.md', `---
id: BEH-SRE-PILARS-001
title: "Propagação de Contexto W3C (Traceparent) no OpenTelemetry"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::uber
  - freq::high
---

## Pergunta
Como funciona a **Propagação de Contexto W3C (\`traceparent\`)** no OpenTelemetry para rastrear requisições entre microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura do Cabeçalho W3C \`traceparent\`**:
  - Padrão internacional injetado nos headers HTTP/gRPC entre microsserviços:
    \`version-trace_id-parent_span_id-trace_flags\`
  - *Exemplo*: \`00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\`
- **Mecanismo de Injeção e Extração**:
  - O serviço de origem **injeta** o contexto no header da chamada de saída.
  - O serviço de destino **extrai** o contexto do header da requisição de entrada e cria um novo Span filho associado ao mesmo \`Trace ID\`.

### Dual Coding Visual
| Campo do Header | Tamanho | Propósito Técnico |
|---|---|---|
| **Version (\`00\`)** | 2 hex | Versão da especificação W3C |
| **Trace ID** | 32 hex | Identificador global único da requisição |
| **Parent Span ID** | 16 hex | Identificador do span chamador imediato |
| **Trace Flags (\`01\`)** | 2 hex | Flags de amostragem (\`01\` = amostrado/gravado) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Extração e Propagação em Go (OpenTelemetry)
\`\`\`go
func handleRequest(w http.ResponseWriter, r *http.Request) {
  // Extrai o contexto W3C dos headers HTTP
  ctx := otel.GetTextMapPropagator().Extract(r.Context(), propagation.HeaderCarrier(r.Header))
  
  tr := otel.Tracer("order-service")
  ctx, span := tr.Start(ctx, "process_order")
  defer span.End()

  // Executa processamento mantendo o Trace ID original
  processItem(ctx)
}
\`\`\`

#### Key Takeaways
- A padronização W3C permite que serviços heterogêneos escritos em linguagens diferentes (Go, Java, Python) mantenham rastreabilidade distribuída transparente e unificada.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/metrics-logs-traces/BEH-SRE-PILARS-002.md', `---
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
  2. **Isolamento por Distributed Tracing (APM)**: O engenheiro inspeciona o gráfico de spans do \`Trace ID\` e constata que o *Payment Service* consumiu 1.950ms esperando resposta do banco.
  3. **Inspeção de Logs Estruturados**: O engenheiro filtra os logs do *Payment Service* pelo \`Trace ID\` e localiza o erro exato: \`{"level":"error","msg":"db deadlock acquiring row lock on account_id 8821"}\`.

### Dual Coding Visual
| Etapa de Diagnóstico | Ferramenta Utilizada | Informação Obtida |
|---|---|---|
| **1. Alerta** | Prometheus / Alertmanager | Saturação de latência p99 no serviço |
| **2. Localização** | Jaeger / Datadog APM | O Span do banco levou 1.950ms |
| **3. Causa Raiz** | Elasticsearch / Loki (Logs) | Deadlock na query de saldo no banco |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha de Diagnóstico Integrada
\`\`\`text
[Alerta de Métrica] ──► "Latência p99 > 2s no Checkout"
         │
         ▼
[Trace Distribuído] ──► API Gateway (5ms) ➔ Order (15ms) ➔ Payment (1.950ms no Postgres)
         │
         ▼
[Log Estruturado]   ──► {"trace_id":"4bf92f35","error":"deadlock detected on lock row"}
\`\`\`

#### Key Takeaways
- Correlacionar métricas, traces e logs via \`Trace ID\` reduz o tempo de diagnóstico de horas para minutos, eliminando buscas cegas em milhões de linhas de log.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/metrics-logs-traces/BEH-SRE-PILARS-003.md', `---
id: BEH-SRE-PILARS-003
title: "Monitoramento Tradicional (Black-Box) vs Observabilidade (White-Box)"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre **Monitoramento Tradicional (Black-Box)** e **Observabilidade (White-Box)** em arquiteturas distribuídas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Monitoramento Tradicional (Black-Box)**:
  - Responde a perguntas pré-definidas sobre modos de falha conhecidos (*"O servidor responde ping?"*, *"O uso de disco passou de 85%?"*, *"O dashboard está verde?"*).
  - Trata o sistema como uma caixa preta.
- **Observabilidade (White-Box)**:
  - Propriedade do sistema de permitir inferir seu estado interno completo a partir de suas emissões externas (métricas, logs, traces).
  - Permite investigar **falhas inéditas e comportamentos desconhecidos (*unknown unknowns*)** sem necessidade de alterar código ou fazer novo deploy para adicionar prints.

### Dual Coding Visual
| Paradigma | Tipo de Pergunta Respondida | Capacidade Investigativa |
|---|---|---|
| **Monitoramento** | *"O sistema está funcionando conforme previsto?"* | Limitada a falhas já conhecidas (*Known Unknowns*) |
| **Observabilidade** | *"Por que o sistema está se comportando desta forma inédita?"* | Investigação profunda de incógnitas (*Unknown Unknowns*) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comparação de Cenários
\`\`\`text
Cenário de Falha Inédita:
- Monitoramento Tradicional: Mostra HTTP 500 no dashboard, mas não diz a causa.
- Sistema Observável: Permite filtrar: "Por que usuários do app Android v3.1 no Brasil
  tiveram timeout ao tentar aplicar cupom de desconto de 10%?" com consulta aos traces.
\`\`\`

#### Key Takeaways
- Em arquiteturas de microsserviços com centenas de componentes independentes, a observabilidade é indispensável para diagnosticar comportamentos emergentes complexos.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/metrics-logs-traces/BEH-SRE-PILARS-004.md', `---
id: BEH-SRE-PILARS-004
title: "Prevenção de Explosão de Cardinalidade em Bancos de Séries Temporais (Prometheus)"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::uber
  - freq::high
---

## Pergunta
O que é o risco de **Explosão de Cardinalidade (High Cardinality)** em bancos de séries temporais (Prometheus) e como evitá-lo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito de Explosão de Cardinalidade**:
  - Ocorre quando valores de alta variabilidade única (ex: \`user_id\`, \`order_id\`, \`email\`, \`UUID\`) são incluídos como *labels* em métricas do Prometheus.
  - Como cada combinação única de labels gera uma nova série temporal na memória RAM da TSDB ($N \times M \times K$), o Prometheus sofre crash por OOM (Out of Memory).
- **Regra de Ouro da Observabilidade**:
  - **Labels de Métricas**: Devem conter apenas valores de baixa cardinalidade (ex: \`http_status\`, \`method\`, \`environment\`, \`region\`).
  - **Dados de Alta Cardinalidade**: Devem ser enviados exclusivamente para **Logs Estruturados e Distributed Traces**.

### Dual Coding Visual
| Tipo de Dado | Exemplo | Onde Deve Ser Enviado |
|---|---|---|
| **Baixa Cardinalidade** | \`http_code: 200\`, \`region: us-east-1\` | Métricas do Prometheus (Labels) |
| **Alta Cardinalidade** | \`user_id: usr_9912\`, \`order_id: 88123\` | Logs Estruturados & Traces |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Código Inseguro vs Seguro
\`\`\`go
// ❌ CRASH POR OOM (Alta Cardinalidade no Prometheus):
httpRequestsTotal.WithLabelValues(r.Method, r.URL.Path, userId).Inc()

// ✅ SEGURO (Baixa Cardinalidade na Métrica + ID no Trace):
httpRequestsTotal.WithLabelValues(r.Method, "/api/v1/orders", statusCategory).Inc()
span.SetAttributes(attribute.String("user.id", userId)) // ID vai para o Trace!
\`\`\`

#### Key Takeaways
- Proteger o Prometheus contra alta cardinalidade preserva a estabilidade do monitoramento e direciona dados de identificação individual para as ferramentas adequadas.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/metrics-logs-traces/BEH-SRE-PILARS-005.md', `---
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
  - O OpenTelemetry Collector retém 100% dos spans em um buffer em memória e só persiste no storage traces completos que apresentaram erro ($HTTP \ge 500$) ou latência acima do percentil p99.
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
\`\`\`text
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
\`\`\`

#### Key Takeaways
- Tail-based sampling oferece o melhor custo-benefício de observabilidade moderna, garantindo visibilidade total de erros sem explodir custos de storage.

</details>
`);

// ==========================================
// 9. SLI, SLO, SLA & Error Budgets
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/sli-slo-sla-error-budgets/BEH-SRE-SLI-000.md', `---
id: BEH-SRE-SLI-000
title: "Hierarquia Conceitual: Distinção entre SLI, SLO e SLA no Modelo Google SRE"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Qual é a hierarquia conceitual e a diferença entre **SLI (Indicator)**, **SLO (Objective)** e **SLA (Agreement)** no modelo Google SRE?

## Resposta
### Quick Answer
**Solução Direta**:
- **A Hierarquia em 3 Camadas**:
  - **SLI (Service Level Indicator — O que medimos)**: Métrica quantitativa de serviço entregue em tempo real.
    $$\\text{SLI} = \\frac{\\text{Eventos Válidos com Sucesso}}{\\text{Total de Eventos Válidos}} \\times 100\\%$$
    *Exemplo*: $99.93\\%$ das requisições responderam com HTTP $< 500$ em menos de $200\\text{ms}$.
  - **SLO (Service Level Objective — Meta interna da engenharia)**: O alvo que engenharia e produto concordam internamente em cumprir ao longo de uma janela rolante (ex: $99.9\\%$ nos últimos 30 dias).
  - **SLA (Service Level Agreement — Contrato jurídico com cliente)**: O compromisso contratual com os clientes externos com previsão de multas ou créditos financeiros se violado.
- **Regra de Ouro**: O SLA deve ser **sempre mais permissivo** que o SLO (ex: SLA de $99.5\\%$ vs SLO de $99.9\\%$), dando margem para o time reagir antes de sofrer penalidade legal.

### Dual Coding Visual
| Nível | Público-Alvo | Consequência da Violação |
|---|---|---|
| **SLI** | Engenheiros e monitoramento | Alerta operacional para o time |
| **SLO** | Time de Engenharia e Produto | Bloqueio de deploys de features (Deploy Freeze) |
| **SLA** | Clientes e Jurídico | Penalidades contratuais e reembolso financeiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Relação Entre as Margens de Segurança
\`\`\`text
100% ────────────────────────── Perfeição (Anti-padrão inalcançável)
      ▲
      │ ◄─── Error Budget do Time de Engenharia (0.1%)
99.9% ────────────────────────── SLO Interno (Alvo do Time)
      ▲
      │ ◄─── Margem de Segurança antes de Quebra de Contrato (0.4%)
99.5% ────────────────────────── SLA Contratual (Gera Multa Jurídica)
\`\`\`

#### Key Takeaways
- Manter o SLO mais rigoroso que o SLA garante que o time identifique e corrija degradações muito antes de os clientes terem direito a reivindicações contratuais.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/sli-slo-sla-error-budgets/BEH-SRE-SLI-001.md', `---
id: BEH-SRE-SLI-001
title: "Cálculo e Interpretação da Métrica de Burn Rate do Error Budget"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como calcular e interpretar a métrica de **Burn Rate** do Error Budget para categorizar a gravidade de incidentes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Definição de Burn Rate**: Indica a velocidade com que o Error Budget está sendo consumido em relação ao período do SLO (ex: janela de 30 dias).
- **Escala de Interpretação**:
  - $\text{Burn Rate} = 1$: Consome exatamente 100% do budget nos 30 dias.
  - $\text{Burn Rate} = 14.4$: Consome 5% do budget em apenas 1 hora (ou 100% em ~2 dias). **Gera alerta de Pager urgente 24/7**.
  - $\text{Burn Rate} = 6.0$: Consome 5% do budget em 6 horas. **Gera notificação prioritária em horário comercial**.
  - $\text{Burn Rate} = 1.0$: Consome 10% do budget em 3 dias. **Gera ticket no backlog**.

### Dual Coding Visual
| Burn Rate | Tempo para Esgotar 100% do Budget | Nível de Resposta SRE |
|---|---|---|
| **$14.4\times$** | ~2 dias (5% em 1 hora) | Pager / Plantão Imediato 24/7 |
| **$6.0\times$** | ~5 dias (5% em 6 horas) | Alerta no Slack / Horário comercial |
| **$1.0\times$** | 30 dias (Taxa normal) | Issue prioritária no Jira |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fórmula de Cálculo do Burn Rate
$$\\text{Burn Rate} = \\frac{\\text{Taxa Atual de Erros Observada}}{1 - \\text{SLO}}$$

\`\`\`text
Exemplo:
- SLO: 99.9% -> Error Budget = 0.001 (0.1%)
- Taxa de Erro Observada na última hora: 1.44% (0.0144)
- Burn Rate = 0.0144 / 0.001 = 14.4x -> Dispara Pager Imediato!
\`\`\`

#### Key Takeaways
- O Burn Rate traduz taxas de erro brutas em risco real de violação de SLO, permitindo acionar os plantonistas apenas quando o orçamento de confiabilidade estiver sob ameaça severa.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/sli-slo-sla-error-budgets/BEH-SRE-SLI-002.md', `---
id: BEH-SRE-SLI-002
title: "Governança de Error Budget: Equilíbrio entre Velocidade de Feature e Confiabilidade"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
O que é o **Error Budget ($1 - \text{SLO}$)** e como ele governa o equilíbrio entre velocidade de entrega de features e estabilidade do sistema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito**: O Error Budget é a margem permitida de falhas (ex: para um SLO de 99.9%, o Error Budget é 0.1%).
- **Mecanismo de Governança Compartilhada**:
  - **Budget Positivo**: Desenvolvedores têm sinal verde para assumir riscos calculados, lançar novas features e testar hipóteses com velocidade.
  - **Budget Esgotado ($\le 0$)**: Entra em vigor o **Deploy Freeze**. Novos lançamentos de produto são temporariamente bloqueados e toda a capacidade de engenharia é redirecionada para testes, infraestrutura e mitigação de bugs.

### Dual Coding Visual
| Saldo de Error Budget | Ação da Engenharia de Produto | Foco da Equipe SRE |
|---|---|---|
| **Saldo Positivo ($> 0$)** | Acelerar entrega de novas features | Monitoramento e experimentação |
| **Saldo Esgotado ($\le 0$)** | Bloqueio de deploys de features | Refatorações e resiliência |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Ciclo Virtuoso de Decisão do Error Budget
\`\`\`text
┌─────────────────────────────────┐
│ Saldo de Error Budget Positivo? │
└───────────────┬─────────────────┘
                │
  SIM ──────────┴────────── NÃO
   │                          │
   ▼                          ▼
[Acelerar Novas Features]   [Feature Freeze Automático]
[Testes A/B & Inovação]     [Foco 100% em Confiabilidade]
[Riscos Calculados]         [Automações & Post-Mortem]
\`\`\`

#### Key Takeaways
- O Error Budget remove a disputa subjetiva entre desenvolvedores (que querem velocidade) e SREs (que querem estabilidade), unificando os incentivos sob uma métrica matemática compartilhada.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/sli-slo-sla-error-budgets/BEH-SRE-SLI-003.md', `---
id: BEH-SRE-SLI-003
title: "A Tabela dos Nove de Disponibilidade e Limites de Downtime por Janela"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Qual é a relação matemática entre a **Tabela dos Nove (99% a 99.999%)** e o tempo de indisponibilidade permitido (Downtime) por mês e ano?

## Resposta
### Quick Answer
**Solução Direta**:
- **A Tabela dos Nove**:
  - **99% (Dois 9s)**: Permite até **7h 12min** de queda por mês (3 dias e 15h por ano). Adequado para ferramentas internas.
  - **99.9% (Três 9s)**: Permite até **43min 12s** de queda por mês (8h 45min por ano). Padrão para maioria dos serviços backend SaaS.
  - **99.99% (Quatro 9s)**: Permite apenas **4min 19s** de queda por mês (52min por ano). Exige multi-AZ ativo e failover automático.
  - **99.999% (Cinco 9s — Alta Disponibilidade)**: Permite apenas **25.9s** de queda por mês (5min por ano). Exige infraestrutura ativa-ativa multi-região.

### Dual Coding Visual
| Nível de Disponibilidade | Downtime Máximo / 30 Dias | Downtime Máximo / 1 Ano |
|---|---|---|
| **99.0%** | 7 horas e 12 minutos | 3 dias e 15 horas |
| **99.9%** | 43 minutos e 12 segundos | 8 horas e 45 minutos |
| **99.99%** | 4 minutos e 19 segundos | 52 minutos e 35 segundos |
| **99.999%** | 25.9 segundos | 5 minutos e 15 segundos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Custo Exponencial de Cada "Nove" Adicional
\`\`\`text
Custo de Infraestrutura:
99.0%   ──► [Custo Baixo $] (Servidor único em 1 AZ)
99.9%   ──► [Custo Moderado] (Cluster com réplica e Load Balancer)
99.99%  ──► [Custo Elevado] (Multi-AZ redundante com failover automático em segundos)
99.999% ──► [Custo Crítico] (Multi-Region ativo-ativo com replicação síncrona/consenso)
\`\`\`

#### Key Takeaways
- Cada "nove" adicional de disponibilidade eleva os custos de infraestrutura e complexidade de engenharia exponencialmente; definir o SLO correto evita desperdício de capital.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/sli-slo-sla-error-budgets/BEH-SRE-SLI-004.md', `---
id: BEH-SRE-SLI-004
title: "Alertas Multi-Window Multi-Burn-Rate para Eliminação de Fadiga de Alertas no Prometheus"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Por que o padrão **Multi-Window Multi-Burn-Rate** do Google SRE elimina a fadiga de alertas (*alert fatigue*) em monitoramento com Prometheus?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Problema dos Alertas Simples por Limiar**:
  - Janelas curtas (ex: 5 min) disparam centenas de falsos alertas em picos efêmeros.
  - Janelas longas (ex: 6 horas) demoram horas para notificar o time em outages catastróficos.
- **A Solução Multi-Window Multi-Burn-Rate**:
  - Exige confirmação simultânea da taxa de queima em uma **janela longa** (ex: 1 hora) E em uma **janela curta** (ex: 5 minutos).
  - Garante alerta instantâneo em crises reais graves e imunidade total a ruídos e oscilações transitórias.

### Dual Coding Visual
| Tipo de Alerta | Comportamento sob Pico Efêmero | Comportamento sob Outage Real |
|---|---|---|
| **Alerta Simples de 5m** | Dispara falso alarme (acorda o time à toa) | Rápido |
| **Alerta Simples de 1h** | Ignora o pico efêmero | Muito lento para reagir (demora 1h) |
| **Multi-Window (1h + 5m)** | **Ignora pico efêmero (Silencioso)** | **Dispara em 2 minutos com precisão** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Regra de Alerta no Prometheus (Alertmanager YAML)
\`\`\`yaml
groups:
  - name: slo_alerts
    rules:
      - alert: ErrorBudgetFastBurn
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[1h]))
            /
            sum(rate(http_requests_total[1h]))
          ) > (1 - 0.999) * 14.4
          and
          (
            sum(rate(http_requests_total{status=~"5.."}[5m]))
            /
            sum(rate(http_requests_total[5m]))
          ) > (1 - 0.999) * 14.4
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Error Budget esgotando rapidamente (Burn Rate 14.4x nas janelas de 1h e 5m)"
\`\`\`

#### Key Takeaways
- O método Multi-Window Multi-Burn-Rate é o estado da arte na engenharia de confiabilidade para equilibrar tempo de detecção rápido (baixo MTTD) e zero falso-positivos.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/sli-slo-sla-error-budgets/BEH-SRE-SLI-005.md', `---
id: BEH-SRE-SLI-005
title: "Implementação de Deploy Freeze Automatizado na Esteira CI/CD via Error Budget"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como implementar a governança de **Deploy Freeze automatizado** na esteira de CI/CD baseado no saldo restante de Error Budget?

## Resposta
### Quick Answer
**Solução Direta**:
- **Mecanismo de Bloqueio Automatizado no CI/CD**:
  1. **Etapa de Quality Gate no Pipeline**: Antes do job de deploy de produção, a esteira (GitHub Actions / GitLab CI) executa uma chamada à API do Prometheus/Datadog.
  2. **Consulta do Saldo de 30 Dias**: Calcula a disponibilidade observada nos últimos 30 dias rolantes contra o SLO acordado.
  3. **Decisão Automática**:
     - Se $\text{Disponibilidade} \ge \text{SLO}$: O deploy prossegue normalmente.
     - Se $\text{Disponibilidade} < \text{SLO}$: O pipeline cancela o deploy com erro explicativo, permitindo apenas deploys marcados com a flag especial de \`hotfix-p0\`.

### Dual Coding Visual
| Condição no Pipeline | Ação no CI/CD | Notificação Gerada |
|---|---|---|
| **Error Budget $> 0$** | Deploy aprovado automaticamente | Notificação verde no canal de releases |
| **Error Budget $\le 0$** | **Deploy bloqueado com código 1** | Alerta vermelho instruindo foco em confiabilidade |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Verificação em Step de GitHub Actions
\`\`\`yaml
- name: Verify Error Budget Gate
  run: |
    AVAILABILITY=$(curl -s "http://prometheus:9090/api/v1/query?query=1-(sum(increase(http_requests_total%7Bstatus=~%225..%22%7D%5B30d%5D))/sum(increase(http_requests_total%5B30d%5D)))" | jq -r '.data.result[0].value[1]')
    SLO_TARGET=0.999
    if (( $(echo "$AVAILABILITY < $SLO_TARGET" | bc -l) )); then
      echo "❌ [DEPLOY FREEZE] Error Budget esgotado (Disponibilidade: $AVAILABILITY < SLO: $SLO_TARGET)."
      exit 1
    fi
    echo "✅ [APPROVED] Error Budget saudável: $AVAILABILITY"
\`\`\`

#### Key Takeaways
- Automatizar o Deploy Freeze na esteira transforma as diretrizes de SRE em garantias executáveis que protegem a estabilidade do sistema sem depender de intervenções manuais.

</details>
`);

console.log('✅ Observability Pilars & SLI/SLO concluído com sucesso!');
