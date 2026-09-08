---
id: SYS-DIST-CONSISTENCY-001
title: "Teorema PACELC: Trade-offs na Ausência de Partições (Latência vs Consistência)"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Como o Teorema PACELC expande o CAP ao definir trade-offs de Latência versus Consistência mesmo quando o sistema está operando normalmente sem partições?

## Resposta
### Quick Answer
**Solução Direta**:
- O **PACELC** estende o CAP formalizando o comportamento em estado normal:
  - **IF Partition (P)**: Escolha entre **A**vailability ou **C**onsistency.
  - **ELSE (E)** (operação normal): Escolha entre **L**atency ou **C**onsistency.
- Para garantir consistência forte em operação normal (PC/EC), nós precisam coordenar via rede (round-trips de replicação síncrona), aumentando a **latência**.
- Para minimizar latência (PA/EL), responde-se ao cliente antes de replicar a todos os nós (replicação assíncrona), arriscando inconsistências temporárias.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema PACELC: Trade-off de Latência vs Consistência em Normalidade</text>
  <g transform="translate(40, 50)">
    <!-- PAC -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="24" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Se houver Partição (P)</text>
    <text x="140" y="55" fill="#cbd5e1" font-size="11" text-anchor="middle">Escolha entre:</text>
    <text x="140" y="80" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">A (Disponibilidade) vs C (Consistência)</text>
    <text x="140" y="105" fill="#94a3b8" font-size="9" text-anchor="middle">Igual ao Teorema CAP tradicional</text>

    <!-- ELC -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Else (E) Em Estado Normal</text>
    <text x="460" y="55" fill="#cbd5e1" font-size="11" text-anchor="middle">Escolha entre:</text>
    <text x="460" y="80" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">L (Baixa Latência) vs C (Consistência)</text>
    <text x="460" y="105" fill="#94a3b8" font-size="9" text-anchor="middle">Replicação síncrona adiciona RTT na rede</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Cassandra é PA/EL (prioriza latência); MongoDB/Postgres são PC/EC (priorizam consistência).</text>

</svg>
<p>Visualização: Teorema PACELC: Se houver partição (P) avalia-se A vs C; senão (E), avalia-se Latência (L) vs Consistência (C).</p>

| Classificação PACELC | Trade-off Operacional | Exemplo de Banco |
|---|---|---|
| **PC / EC** | Consistência forte e replicação síncrona | Google Spanner, CockroachDB |
| **PA / EL** | Disponibilidade e replicação assíncrona | Apache Cassandra, Amazon DynamoDB |
| **PA / EC** | Consistência em normalidade, disponível sob partição | MongoDB configurado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implicações Práticas
- Mesmo que seu data center nunca sofra partições de rede, você ainda precisa decidir: prefere que um `INSERT` retorne em 2 ms (assíncrono, risco de perder dados em crash) ou em 25 ms (aguardando confirmação de quorum multi-região)?

</details>
