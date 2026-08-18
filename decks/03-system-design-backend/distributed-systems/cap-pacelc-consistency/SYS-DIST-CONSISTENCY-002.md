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
