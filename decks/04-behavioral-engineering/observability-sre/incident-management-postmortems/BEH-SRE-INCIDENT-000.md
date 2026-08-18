---
id: BEH-SRE-INCIDENT-000
title: "Classificação de Níveis de Severidade de Incidentes (Sev-1 a Sev-4)"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Como classificar os **Níveis de Severidade de Incidentes (Sev-1 a Sev-4)** em sistemas backend de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Níveis Padronizados de Severidade**:
  - **Sev-1 (Crítico / Outage Total)**: Interrupção catastrófica com impacto financeiro direto ou bloqueio total de clientes essenciais (ex: *checkout de pagamentos fora do ar*). War Room 24/7 imediata.
  - **Sev-2 (Grave / Degradação Severa)**: Funcionalidade crítica com impacto substancial e sem contorno simples (ex: *busca de produtos falhando para 30% dos usuários*).
  - **Sev-3 (Moderado)**: Problema não bloqueante ou com impacto restrito a poucos usuários internos (ex: *dashboard de relatórios internos com atraso*).
  - **Sev-4 (Baixo)**: Bug cosmético, inconsistência menor de UI ou dúvida operacional sem impacto em faturamento.

### Dual Coding Visual
| Nível de Severidade | Impacto no Negócio | Mobilização de Resposta |
|---|---|---|
| **Sev-1** | Outage total e perda direta de receita | War Room 24/7 imediata com liderança |
| **Sev-2** | Degradação severa de funcionalidade core | Resposta imediata em horário de plantão |
| **Sev-3 / Sev-4** | Impacto baixo ou puramente cosmético | Tratamento em horário comercial normal |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Matriz de Decisão de Severidade
```text
O problema bloqueia compras ou autenticação de clientes?
├── SIM ──► Sev-1 (Mobilização Imediata 24/7)
└── NÃO
    ├── Afeta grande volume de clientes com funcionalidade secundária?
    │   ├── SIM ──► Sev-2
    │   └── NÃO ──► Sev-3 / Sev-4 (Fila normal de bugs)
```

#### Key Takeaways
- Uma taxonomia clara de severidade alinha expectativas de resposta, evitando falso alarme em problemas menores e garantindo mobilização instantânea em crises reais.

</details>
