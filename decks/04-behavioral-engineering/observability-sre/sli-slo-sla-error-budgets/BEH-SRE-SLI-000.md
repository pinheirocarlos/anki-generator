---
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
    $$\text{SLI} = \frac{\text{Eventos Válidos com Sucesso}}{\text{Total de Eventos Válidos}} \times 100\%$$
    *Exemplo*: $99.93\%$ das requisições responderam com HTTP $< 500$ em menos de $200\text{ms}$.
  - **SLO (Service Level Objective — Meta interna da engenharia)**: O alvo que engenharia e produto concordam internamente em cumprir ao longo de uma janela rolante (ex: $99.9\%$ nos últimos 30 dias).
  - **SLA (Service Level Agreement — Contrato jurídico com cliente)**: O compromisso contratual com os clientes externos com previsão de multas ou créditos financeiros se violado.
- **Regra de Ouro**: O SLA deve ser **sempre mais permissivo** que o SLO (ex: SLA de $99.5\%$ vs SLO de $99.9\%$), dando margem para o time reagir antes de sofrer penalidade legal.

### Dual Coding Visual
| Nível | Público-Alvo | Consequência da Violação |
|---|---|---|
| **SLI** | Engenheiros e monitoramento | Alerta operacional para o time |
| **SLO** | Time de Engenharia e Produto | Bloqueio de deploys de features (Deploy Freeze) |
| **SLA** | Clientes e Jurídico | Penalidades contratuais e reembolso financeiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Relação Entre as Margens de Segurança
```text
100% ────────────────────────── Perfeição (Anti-padrão inalcançável)
      ▲
      │ ◄─── Error Budget do Time de Engenharia (0.1%)
99.9% ────────────────────────── SLO Interno (Alvo do Time)
      ▲
      │ ◄─── Margem de Segurança antes de Quebra de Contrato (0.4%)
99.5% ────────────────────────── SLA Contratual (Gera Multa Jurídica)
```

#### Key Takeaways
- Manter o SLO mais rigoroso que o SLA garante que o time identifique e corrija degradações muito antes de os clientes terem direito a reivindicações contratuais.

</details>
