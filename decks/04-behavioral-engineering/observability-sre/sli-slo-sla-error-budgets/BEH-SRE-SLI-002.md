---
id: BEH-SRE-SLI-002
title: "Governança de Error Budget: Equilíbrio entre Velocidade de Feature e Confiabilidade"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
O que é o **Error Budget ($1 - 	ext{SLO}$)** e como ele governa o equilíbrio entre velocidade de entrega de features e estabilidade do sistema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito**: O Error Budget é a margem permitida de falhas (ex: para um SLO de 99.9%, o Error Budget é 0.1%).
- **Mecanismo de Governança Compartilhada**:
  - **Budget Positivo**: Desenvolvedores têm sinal verde para assumir riscos calculados, lançar novas features e testar hipóteses com velocidade.
  - **Budget Esgotado ($le 0$)**: Entra em vigor o **Deploy Freeze**. Novos lançamentos de produto são temporariamente bloqueados e toda a capacidade de engenharia é redirecionada para testes, infraestrutura e mitigação de bugs.

### Dual Coding Visual
| Saldo de Error Budget | Ação da Engenharia de Produto | Foco da Equipe SRE |
|---|---|---|
| **Saldo Positivo ($> 0$)** | Acelerar entrega de novas features | Monitoramento e experimentação |
| **Saldo Esgotado ($le 0$)** | Bloqueio de deploys de features | Refatorações e resiliência |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Ciclo Virtuoso de Decisão do Error Budget
```text
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
```

#### Key Takeaways
- O Error Budget remove a disputa subjetiva entre desenvolvedores (que querem velocidade) e SREs (que querem estabilidade), unificando os incentivos sob uma métrica matemática compartilhada.

</details>
