---
id: SYS-DB-SCALING-000
title: "Replicação Leader-Follower (Read Replicas) e a Anomalia de Replicação Lenta (Replication Lag)"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::aws
  - freq::high
---

## Pergunta
Como a topologia de Read Replicas (Leader-Follower assíncrono) escala leituras e por que o Replication Lag causa inconsistência momentânea?

## Resposta
### Quick Answer
**Solução Direta**:
- **Topologia**:
  - Um nó **Leader (Primário)** recebe todas as escritas (`INSERT`, `UPDATE`, `DELETE`).
  - Múltiplas **Read Replicas (Followers)** recebem streams de replicação assíncrona do Leader e servem consultas de leitura (`SELECT`).
- **Replication Lag**:
  - Ocorre quando réplicas demoram frações de segundo a segundos para aplicar o log de transações do primário (devido a I/O, rede ou queries longas na réplica).
  - Se um usuário atualiza seu perfil e recarrega a página imediatamente, a leitura roteada para a réplica atrasada exibe os dados antigos.

### Dual Coding Visual
| Papel do Nó | Operações Permitidas | Mecanismo de Sincronização |
|---|---|---|
| **Leader (Primário)** | Leitura e Escrita | Grava WAL e transmite para réplicas |
| **Read Replicas** | Apenas Leitura | Aplica stream de WAL assincronamente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Mitigar Replication Lag na Aplicação
1. **Roteamento de Leitura Crítica**: Roteie leituras sensíveis imediatamente após uma escrita (ex: checkout, tela de perfil do próprio usuário) diretamente para o **Leader**.
2. **Monotonic Read Routing**: Garanta que requisições consecutivas da mesma sessão de usuário sejam enviadas para a mesma réplica física via *Sticky Routing*.

</details>
