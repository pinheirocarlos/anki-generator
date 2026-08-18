---
id: SYS-FND-ESTIMATION-002
title: "Cálculo de Disponibilidade e Tabela de 'Nines' (SLA/SLO)"
tags:
  - level::l3-junior
  - topic::sys::foundations
  - company::amazon
  - freq::high
---

## Pergunta
O que representa a métrica de disponibilidade em 'noves' (99.9% vs 99.999%) e qual é o tempo máximo de downtime permitido por ano em cada nível?

## Resposta
### Quick Answer
**Solução Direta**:
- **Três Noves (99.9%)**: Permite até **8.76 horas** de downtime por ano (~43 minutos por mês).
- **Quatro Noves (99.99%)**: Permite até **52.6 minutos** de downtime por ano (~4.3 minutos por mês).
- **Cinco Noves (99.999%)**: Permite no máximo **5.26 minutos** de downtime por ano (~26 segundos por mês).
- Cada 'nove' adicional exige automação total de failover, replicação multi-região e arquiteturas ativas-ativas sem pontos únicos de falha (SPOF).

### Dual Coding Visual
| Disponibilidade (Nines) | Downtime / Mês | Downtime / Ano |
|---|---|---|
| **99.9% (3 noves)** | 43.8 minutos | 8.76 horas |
| **99.99% (4 noves)** | 4.38 minutos | 52.6 minutos |
| **99.999% (5 noves)** | 26.3 segundos | 5.26 minutos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto na Arquitetura de Software
- **99.9%**: Aceitável para serviços corporativos internos; failover manual ou semi-automático.
- **99.99%**: Padrão ouro para plataformas web/e-commerce FAANG; failover automatizado com health checks.
- **99.999%**: Telecomunicações e pagamentos críticos (Stripe, VISA); exige infraestrutura multi-região ativa-ativa, consensus Raft/Paxos e isolamento estrito de fault domains.

</details>
