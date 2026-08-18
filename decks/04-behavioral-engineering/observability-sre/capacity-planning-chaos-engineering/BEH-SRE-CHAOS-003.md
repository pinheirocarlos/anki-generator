---
id: BEH-SRE-CHAOS-003
title: "Métricas de Disaster Recovery: RPO (Perda de Dados) vs RTO (Tempo de Recuperação)"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Como definir e contrastar as métricas de Disaster Recovery **RPO (Recovery Point Objective)** e **RTO (Recovery Time Objective)** em sistemas de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **RPO (Recovery Point Objective — Tolerância a Perda de Dados)**:
  - A janela máxima de dados transacionais que a empresa aceita perder em caso de catástrofe total.
  - *Exemplo*: RPO de 5 minutos significa que replicação e backups devem garantir que no máximo 5 minutos de dados sejam perdidos.
- **RTO (Recovery Time Objective — Tolerância a Tempo de Inatividade)**:
  - O tempo máximo aceitável para restaurar o sistema e retomar a operação normal após o incidente.
  - *Exemplo*: RTO de 30 minutos significa que o failover e inicialização devem durar no máximo meia hora.

### Dual Coding Visual
| Métrica | Pergunta Central Respondida | Mecanismo Arquitetural Envolvido |
|---|---|---|
| **RPO** | *"Quantos dados podemos perder?"* | Frequência de snapshots e replicação de logs |
| **RTO** | *"Quanto tempo podemos ficar fora do ar?"* | Automação de failover e orquestração de containers |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha do Tempo Visual de RTO e RPO
```text
             Último Snapshot Válido           Incidente Ocorre             Serviço Normalizado
                       │                              │                             │
                       ├─────────── RPO ──────────────┼──────────── RTO ────────────┤
                       │       (Dados Perdidos)       │       (Downtime Total)      │
```

#### Key Takeaways
- RPO próximo de zero exige replicação síncrona com custo de latência de escrita; RTO próximo de zero exige infraestrutura ativa-ativa multi-região automatizada.

</details>
