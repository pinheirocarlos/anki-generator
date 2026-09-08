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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tabela de Noves de Disponibilidade (SLA / SLO Downtime)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <rect x="0" y="0" width="600" height="26" rx="6" fill="#0284c7"/>
    <text x="100" y="17" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Disponibilidade</text>
    <text x="300" y="17" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Downtime por Ano</text>
    <text x="500" y="17" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Downtime por Mês</text>

    <text x="100" y="44" fill="#f87171" font-size="9" text-anchor="middle">99% (Dois Noves)</text>
    <text x="300" y="44" fill="#f87171" font-size="9" text-anchor="middle">3.65 dias</text>
    <text x="500" y="44" fill="#f87171" font-size="9" text-anchor="middle">7.20 horas</text>

    <text x="100" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">99.9% (Três Noves)</text>
    <text x="300" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">8.76 horas</text>
    <text x="500" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">43.2 minutos</text>

    <text x="100" y="88" fill="#34d399" font-size="9" text-anchor="middle">99.99% (Quatro Noves)</text>
    <text x="300" y="88" fill="#34d399" font-size="9" text-anchor="middle">52.6 minutos</text>
    <text x="500" y="88" fill="#34d399" font-size="9" text-anchor="middle">4.32 minutos</text>

    <text x="100" y="104" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">99.999% (Cinco Noves)</text>
    <text x="300" y="104" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">5.26 minutos</text>
    <text x="500" y="104" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">25.9 segundos</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Atingir 99.999% exige failover automático multi-região ativo-ativo sem intervenção humana manual.</text>

</svg>
<p>Visualização: Tabela de noves de disponibilidade: de 99.9% (8.7 horas de downtime/ano) a 99.999% (5 minutos de downtime/ano).</p>

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
