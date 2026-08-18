---
id: BEH-SRE-PILARS-001
title: "Propagação de Contexto W3C (Traceparent) no OpenTelemetry"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::uber
  - freq::high
---

## Pergunta
Como funciona a **Propagação de Contexto W3C (`traceparent`)** no OpenTelemetry para rastrear requisições entre microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura do Cabeçalho W3C `traceparent`**:
  - Padrão internacional injetado nos headers HTTP/gRPC entre microsserviços:
    `version-trace_id-parent_span_id-trace_flags`
  - *Exemplo*: `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`
- **Mecanismo de Injeção e Extração**:
  - O serviço de origem **injeta** o contexto no header da chamada de saída.
  - O serviço de destino **extrai** o contexto do header da requisição de entrada e cria um novo Span filho associado ao mesmo `Trace ID`.

### Dual Coding Visual
| Campo do Header | Tamanho | Propósito Técnico |
|---|---|---|
| **Version (`00`)** | 2 hex | Versão da especificação W3C |
| **Trace ID** | 32 hex | Identificador global único da requisição |
| **Parent Span ID** | 16 hex | Identificador do span chamador imediato |
| **Trace Flags (`01`)** | 2 hex | Flags de amostragem (`01` = amostrado/gravado) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Extração e Propagação em Go (OpenTelemetry)
```go
func handleRequest(w http.ResponseWriter, r *http.Request) {
  // Extrai o contexto W3C dos headers HTTP
  ctx := otel.GetTextMapPropagator().Extract(r.Context(), propagation.HeaderCarrier(r.Header))
  
  tr := otel.Tracer("order-service")
  ctx, span := tr.Start(ctx, "process_order")
  defer span.End()

  // Executa processamento mantendo o Trace ID original
  processItem(ctx)
}
```

#### Key Takeaways
- A padronização W3C permite que serviços heterogêneos escritos em linguagens diferentes (Go, Java, Python) mantenham rastreabilidade distribuída transparente e unificada.

</details>
