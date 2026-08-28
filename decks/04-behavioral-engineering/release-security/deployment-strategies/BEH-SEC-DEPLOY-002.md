---
id: BEH-SEC-DEPLOY-002
title: "Estratégia de Canary Release com Promoção e Rollback Automatizados por Métricas"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::meta
  - freq::high
---

## Pergunta
Como funciona uma estratégia de **Canary Release** com promoção e rollback automatizados baseados em métricas de observabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- **Funcionamento do Canary Release**:
  1. Roteia uma fração ínfima do tráfego real de produção (ex: 2\% a 5\%) para a nova versão da aplicação (*Canary*).
  2. A ferramenta de CD (ex: Argo Rollouts / Flagger) coleta métricas do Prometheus durante janelas de observação (ex: 10 minutos).
  3. **Critérios de Validação**:
     - Taxa de erros HTTP 5xx $< 0.1\%$.
     - Latência percentil p99 $< 250\text{ms}$.
  4. Se as métricas estiverem saudáveis, a ferramenta aumenta o tráfego progressivamente ($25\% \to 50\% \to 100\%$).
  5. Se qualquer métrica violar o limiar, o tráfego volta para 0\% **automaticamente em segundos**.

### Dual Coding Visual
| Etapa do Canary | % de Tráfego Real | Condição para Próxima Etapa |
|---|---|---|
| **Etapa 1** | 5\% por 10 minutos | Erro 5xx $< 0.1\%$ e p99 $< 200\text{ms}$ |
| **Etapa 2** | 25\% por 15 minutos | Métricas estáveis no Prometheus |
| **Promoção Final** | 100\% (Versão Estável) | Conclusão do rollout com sucesso |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Rollout Automatizado com Argo Rollouts
```text
┌─────────────────────────────────┐
│ Início: Envia 5% para Canary    │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Consulta Métricas no Prometheus │ ──► Se Erro > 0.1%: Rollback Instantâneo!
└───────────────┬─────────────────┘
                ▼ (Métricas Verdes)
┌─────────────────────────────────┐
│ Promove para 25% ➔ 50% ➔ 100%   │
└─────────────────────────────────┘
```

#### Key Takeaways
- Canary Release expõe uma porcentagem mínima de usuários a possíveis falhas de novos códigos, contendo o impacto de incidentes antes da propagação global.

</details>
