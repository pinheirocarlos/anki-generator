---
id: SYS-DIST-CONSISTENCY-000
title: "Teorema CAP e a Inevitabilidade de Partições de Rede"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Por que em sistemas distribuídos sob o Teorema CAP a escolha real é sempre entre Consistência (CP) e Disponibilidade (AP) durante uma Partição de Rede?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Teorema CAP** dita que um sistema distribuído pode garantir no máximo 2 de 3 propriedades: **C**onsistência (Linearizabilidade), **A**vailability (Toda requisição não com falha recebe resposta) e **P**artition Tolerance (Tolerância a perda de mensagens na rede).
- Como redes físicas sofrem inevitavelmente cortes de cabos, congestionamentos e atrasos (**P é obrigatório** no mundo real), sob partição a escolha forçada é:
  - **Sistema CP**: Recusa escritas/leituras para evitar servir dados obsoletos ou divergentes (prioriza exatidão).
  - **Sistema AP**: Permite leituras e escritas em nós isolados, gerando divergência temporária (prioriza disponibilidade).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/cap-theorem-network-partition-tradeoff-loop.webm">
    <p>Visualização: Teorema CAP: em caso de partição de rede (P), o sistema deve optar entre Consistência estrita (CP) ou Disponibilidade (AP).</p>
  </video>
</div>

| Propriedade CAP | Definição Rigorosa | Exemplo de Sistema |
|---|---|---|
| **Consistência (C)** | Toda leitura retorna a escrita mais recente ou erro | Spanner, etcd, ZooKeeper (CP) |
| **Disponibilidade (A)** | Todo nó não-falho responde com sucesso (sem garantia do dado mais novo) | Cassandra, DynamoDB AP (AP) |
| **Tolerância a Partição (P)** | O sistema opera mesmo com perda de pacotes na rede | Premissa obrigatória de redes distribuídas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Cenário de Partição
- Se o Nó A e o Nó B não conseguem se comunicar devido a uma partição de rede:
  - Se um cliente grava no Nó A:
    - No modo **CP**, o Nó A trava a escrita até conseguir sincronizar com B ou retorna erro ao cliente.
    - No modo **AP**, o Nó A aceita a escrita localmente, mas leituras vindas do Nó B verão dados desatualizados.

</details>
