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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/pacelc-latency-vs-consistency-matrix-loop.webm">
    <p>Visualização: Teorema PACELC: Se houver partição (P) avalia-se A vs C; senão (E), avalia-se Latência (L) vs Consistência (C).</p>
  </video>
</div>

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
