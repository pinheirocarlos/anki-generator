---
id: SYS-DIST-CONSISTENCY-002
title: "Modelos de Consistência: Linearizabilidade vs Consistência Eventual vs Read-Your-Writes"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::meta
  - freq::high
---

## Pergunta
Qual é a diferença conceitual entre Linearizabilidade (Strong Consistency), Consistência Eventual e a garantia Read-Your-Writes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Linearizabilidade (Forte)**: O sistema se comporta como se existisse apenas uma única cópia global do dado. Qualquer leitura iniciada após o término de uma escrita DEVE retornar o novo valor.
- **Consistência Eventual**: Não há garantias de quando réplicas convergirão; se nenhuma nova escrita ocorrer, eventualmente todas as réplicas retornarão o mesmo valor.
- **Read-Your-Writes (Causal)**: Garante que um usuário específico sempre enxerga suas próprias alterações imediatamente (mesmo que outros usuários ainda vejam dados antigos).

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Linearizabilidade (Consistência Forte) vs Consistência Eventual</text>
  <g transform="translate(40, 50)">
    <!-- Linearizable Timeline -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Linearizabilidade (Single-Copy Global)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Operações parecem atômicas e instantâneas</text>
    <text x="140" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Se leitura lê $20, nenhuma leitura futura</text>
    <text x="140" y="88" fill="#fca5a5" font-size="10" text-anchor="middle">pode retornar $10 (sem viagem no tempo)</text>

    <!-- Eventual Consistency Timeline -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Consistência Eventual (Async Gossip)</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Réplicas convergem no tempo t + delta</text>
    <text x="460" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Leituras podem ver dados obsoletos</text>
    <text x="460" y="88" fill="#34d399" font-size="10" text-anchor="middle">Permite altíssimo throughput e resiliência</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Modelos intermediários: Causal Consistency, Monotonic Reads e Read-After-Write Consistency.</text>

</svg>
<p>Visualização: Linearizabilidade simulando uma cópia única global atômica vs propagação assíncrona na consistência eventual.</p>

| Modelo de Consistência | Garantia Oferecida | Custo de Implementação |
|---|---|---|
| **Linearizabilidade** | Ordem global estrita em tempo real | Alto (Quorum síncrono / Raft / Paxos) |
| **Read-Your-Writes** | Usuário vê seus próprios updates | Médio (Sticky routing ou read from primary) |
| **Eventual** | Convergência no tempo sem prazo estrito | Mínimo (Gossip protocol / async replication) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Implementar Read-Your-Writes com Replicação Assíncrona
1. **Roteamento Baseado em Janela de Tempo**: Após uma escrita, force as leituras desse usuário específico para o nó primário durante 5 segundos.
2. **Version Vector no Token de Sessão**: O cliente anexa a versão da sua última escrita no cabeçalho HTTP; a réplica só responde se já aplicou essa versão (caso contrário, aguarda ou delega ao primário).

</details>
