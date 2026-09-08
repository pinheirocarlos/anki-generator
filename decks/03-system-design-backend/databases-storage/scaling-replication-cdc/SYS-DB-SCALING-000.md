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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Replicação de Banco de Dados: Replication Lag em Leader-Follower</text>
  <g transform="translate(40, 50)">
    <!-- Leader -->
    <rect x="0" y="20" width="160" height="90" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="80" y="45" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Leader (Primary)</text>
    <text x="80" y="68" fill="#e0f2fe" font-size="10" text-anchor="middle">Write t=0: balance=$200</text>
    <text x="80" y="88" fill="#86efac" font-size="9" text-anchor="middle">WAL gravado imediatamente</text>

    <!-- Async Replication Stream -->
    <path d="M 160 65 L 340 65" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <text x="250" y="55" fill="#fbbf24" font-size="9" font-weight="bold" text-anchor="middle">Binlog / WAL Stream (Async)</text>
    <text x="250" y="80" fill="#f87171" font-size="9" text-anchor="middle">Lag: ~250 ms</text>

    <!-- Follower Replica -->
    <rect x="340" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="420" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Follower Replica</text>
    <text x="420" y="68" fill="#fca5a5" font-size="10" text-anchor="middle">Read t=50ms: balance=$100</text>
    <text x="420" y="88" fill="#f87171" font-size="9" text-anchor="middle">⚠️ Inconsistência de Leitura</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Solução Read-Your-Own-Writes: Roteia leituras do próprio usuário que alterou para o Leader por 5 segundos.</text>

</svg>
<p>Visualização: Assincronia na replicação Leader-Follower gerando Replication Lag e leituras inconsistentes em réplicas secundárias.</p>

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
