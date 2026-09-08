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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema CAP: O Trilema Fundamental dos Sistemas Distribuídos</text>
  <g transform="translate(40, 50)">
    <!-- Partition (Given) -->
    <rect x="200" y="0" width="200" height="35" rx="6" fill="#7f1d1d" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="300" y="22" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Partição de Rede (P) é Inevitável</text>

    <!-- CP Choice -->
    <rect x="0" y="55" width="280" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="78" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Sistemas CP (Consistência Estrita)</text>
    <text x="140" y="100" fill="#cbd5e1" font-size="10" text-anchor="middle">Rejeita escritas se o Quorum cair</text>
    <text x="140" y="118" fill="#cbd5e1" font-size="10" text-anchor="middle">Prioriza linearizabilidade e integridade</text>
    <text x="140" y="136" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">Exemplos: Raft, etcd, Zookeeper, Spanner</text>

    <!-- AP Choice -->
    <rect x="320" y="55" width="280" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="78" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Sistemas AP (Alta Disponibilidade)</text>
    <text x="460" y="100" fill="#cbd5e1" font-size="10" text-anchor="middle">Aceita gravações em qualquer nó</text>
    <text x="460" y="118" fill="#cbd5e1" font-size="10" text-anchor="middle">Consistência eventual com reconciliação</text>
    <text x="460" y="136" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">Exemplos: Cassandra, DynamoDB, CouchDB</text>
  </g>
  <text x="340" y="215" fill="#94a3b8" font-size="10" text-anchor="middle">Em redes assíncronas reais, partição não é opcional; a escolha é estritamente entre Consistência (CP) ou Disponibilidade (AP).</text>

</svg>
<p>Visualização: Teorema CAP: em caso de partição de rede (P), o sistema deve optar entre Consistência estrita (CP) ou Disponibilidade (AP).</p>

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
