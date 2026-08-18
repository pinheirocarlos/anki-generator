---
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
  - Ocorre quando valores de alta variabilidade única (ex: `user_id`, `order_id`, `email`, `UUID`) são incluídos como *labels* em métricas do Prometheus.
  - Como cada combinação única de labels gera uma nova série temporal na memória RAM da TSDB ($N 	imes M 	imes K$), o Prometheus sofre crash por OOM (Out of Memory).
- **Regra de Ouro da Observabilidade**:
  - **Labels de Métricas**: Devem conter apenas valores de baixa cardinalidade (ex: `http_status`, `method`, `environment`, `region`).
  - **Dados de Alta Cardinalidade**: Devem ser enviados exclusivamente para **Logs Estruturados e Distributed Traces**.

### Dual Coding Visual
| Tipo de Dado | Exemplo | Onde Deve Ser Enviado |
|---|---|---|
| **Baixa Cardinalidade** | `http_code: 200`, `region: us-east-1` | Métricas do Prometheus (Labels) |
| **Alta Cardinalidade** | `user_id: usr_9912`, `order_id: 88123` | Logs Estruturados & Traces |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Código Inseguro vs Seguro
```go
// ❌ CRASH POR OOM (Alta Cardinalidade no Prometheus):
httpRequestsTotal.WithLabelValues(r.Method, r.URL.Path, userId).Inc()

// ✅ SEGURO (Baixa Cardinalidade na Métrica + ID no Trace):
httpRequestsTotal.WithLabelValues(r.Method, "/api/v1/orders", statusCategory).Inc()
span.SetAttributes(attribute.String("user.id", userId)) // ID vai para o Trace!
```

#### Key Takeaways
- Proteger o Prometheus contra alta cardinalidade preserva a estabilidade do monitoramento e direciona dados de identificação individual para as ferramentas adequadas.

</details>
