---
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
  - $	ext{Burn Rate} = 1$: Consome exatamente 100% do budget nos 30 dias.
  - $	ext{Burn Rate} = 14.4$: Consome 5% do budget em apenas 1 hora (ou 100% em ~2 dias). **Gera alerta de Pager urgente 24/7**.
  - $	ext{Burn Rate} = 6.0$: Consome 5% do budget em 6 horas. **Gera notificação prioritária em horário comercial**.
  - $	ext{Burn Rate} = 1.0$: Consome 10% do budget em 3 dias. **Gera ticket no backlog**.

### Dual Coding Visual
| Burn Rate | Tempo para Esgotar 100% do Budget | Nível de Resposta SRE |
|---|---|---|
| **$14.4	imes$** | ~2 dias (5% em 1 hora) | Pager / Plantão Imediato 24/7 |
| **$6.0	imes$** | ~5 dias (5% em 6 horas) | Alerta no Slack / Horário comercial |
| **$1.0	imes$** | 30 dias (Taxa normal) | Issue prioritária no Jira |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fórmula de Cálculo do Burn Rate
$$\text{Burn Rate} = \frac{\text{Taxa Atual de Erros Observada}}{1 - \text{SLO}}$$

```text
Exemplo:
- SLO: 99.9% -> Error Budget = 0.001 (0.1%)
- Taxa de Erro Observada na última hora: 1.44% (0.0144)
- Burn Rate = 0.0144 / 0.001 = 14.4x -> Dispara Pager Imediato!
```

#### Key Takeaways
- O Burn Rate traduz taxas de erro brutas em risco real de violação de SLO, permitindo acionar os plantonistas apenas quando o orçamento de confiabilidade estiver sob ameaça severa.

</details>
