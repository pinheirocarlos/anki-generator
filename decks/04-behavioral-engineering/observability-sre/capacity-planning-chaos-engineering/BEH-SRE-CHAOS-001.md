---
id: BEH-SRE-CHAOS-001
title: "Princípios Fundamentais e Método Empírico do Chaos Engineering"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
O que são os **Princípios Fundamentais do Chaos Engineering** e o método empírico em 4 fases para validação de resiliência sistêmica?

## Resposta
### Quick Answer
**Solução Direta**:
- **Definição**: A disciplina de experimentar intencionalmente em sistemas distribuídos de produção para revelar vulnerabilidades e pontos únicos de falha antes que causem outages graves.
- **O Método Científico em 4 Fases**:
  1. **Definir Steady State**: Mensurar o comportamento normal do sistema através de métricas de negócio (ex: taxa de pedidos/segundo e latência p99).
  2. **Formular a Hipótese**: Prever que o Steady State se manterá estável mesmo após a injeção da falha.
  3. **Injetar Falha Controlada**: Simular eventos do mundo real (morte de pods, partições de rede, aumento de latência de I/O).
  4. **Refutar ou Confirmar a Hipótese**: Se o Steady State sofrer degradação não prevista, o experimento revelou uma vulnerabilidade arquitetural a ser corrigida.

### Dual Coding Visual
| Fase do Experimento | Ação Executada | Critério de Sucesso |
|---|---|---|
| **1. Steady State** | Medição de baseline | Métricas de negócio dentro do SLO |
| **2. Hipótese** | Previsão de auto-healing | Tolerância comprovada sem intervenção humana |
| **3. Injeção de Falha** | Chaos Monkey / Toxiproxy | Falha contida no blast radius previsto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Ciclo de Experimentação do Chaos Engineering
```text
┌─────────────────────────────────┐
│ 1. Medir Steady State Baseline  │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 2. Formular Hipótese Científica │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 3. Injetar Falha Controlada     │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 4. Analisar Métricas & Corrigir │
└─────────────────────────────────┘
```

#### Key Takeaways
- O objetivo do Chaos Engineering não é quebrar o sistema, mas demonstrar de forma empírica que ele possui mecanismos automáticos de recuperação diante de falhas inevitáveis.

</details>
