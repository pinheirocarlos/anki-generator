---
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
```yaml
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
```

#### Key Takeaways
- O método Multi-Window Multi-Burn-Rate é o estado da arte na engenharia de confiabilidade para equilibrar tempo de detecção rápido (baixo MTTD) e zero falso-positivos.

</details>
