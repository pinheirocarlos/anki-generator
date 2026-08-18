---
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
```text
Custo de Infraestrutura:
99.0%   ──► [Custo Baixo $] (Servidor único em 1 AZ)
99.9%   ──► [Custo Moderado] (Cluster com réplica e Load Balancer)
99.99%  ──► [Custo Elevado] (Multi-AZ redundante com failover automático em segundos)
99.999% ──► [Custo Crítico] (Multi-Region ativo-ativo com replicação síncrona/consenso)
```

#### Key Takeaways
- Cada "nove" adicional de disponibilidade eleva os custos de infraestrutura e complexidade de engenharia exponencialmente; definir o SLO correto evita desperdício de capital.

</details>
