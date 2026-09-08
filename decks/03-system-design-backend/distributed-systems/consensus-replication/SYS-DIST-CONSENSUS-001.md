---
id: SYS-DIST-CONSENSUS-001
title: "Replicação de Log no Raft e Mecanismo de Commit por Quorum"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como o líder no algoritmo Raft garante a consistência do log replicado e determina quando uma entrada de log está efetivamente 'commitada'?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo de Escrita**:
  1. O cliente envia um comando para o **Leader**.
  2. O Leader grava o comando em seu próprio log local como *uncommitted*.
  3. O Leader dispara RPCs `AppendEntries` em paralelo para todos os Followers.
  4. Quando a maioria dos nós ($N/2 + 1$) confirma a gravação no disco, a entrada é considerada **Commitada**.
  5. O Leader aplica a entrada à sua Máquina de Estados (FSM) e retorna sucesso ao cliente.
  6. No próximo heartbeat, o Leader notifica os Followers do novo `commitIndex`, que aplicam a entrada às suas respectivas FSMs.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Raft Log Replication: AppendEntries &amp; Quorum de Commit</text>
  <g transform="translate(40, 50)">
    <!-- Leader Node -->
    <rect x="0" y="0" width="600" height="40" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="60" y="25" fill="#86efac" font-size="10" font-weight="bold">Leader</text>
    <text x="200" y="25" fill="#ffffff" font-size="10" font-family="monospace">[x=1, T1]</text>
    <text x="320" y="25" fill="#ffffff" font-size="10" font-family="monospace">[y=9, T1]</text>
    <text x="440" y="25" fill="#34d399" font-size="10" font-family="monospace" font-weight="bold">[z=5, T2] (COMMITTED)</text>

    <!-- Follower 1 -->
    <rect x="0" y="45" width="600" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="60" y="67" fill="#38bdf8" font-size="10" font-weight="bold">Follower 1</text>
    <text x="200" y="67" fill="#cbd5e1" font-size="10" font-family="monospace">[x=1, T1]</text>
    <text x="320" y="67" fill="#cbd5e1" font-size="10" font-family="monospace">[y=9, T1]</text>
    <text x="440" y="67" fill="#86efac" font-size="10" font-family="monospace">[z=5, T2] (ACK ✅)</text>

    <!-- Follower 2 -->
    <rect x="0" y="85" width="600" height="35" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1"/>
    <text x="60" y="107" fill="#f87171" font-size="10" font-weight="bold">Follower 2</text>
    <text x="200" y="107" fill="#cbd5e1" font-size="10" font-family="monospace">[x=1, T1]</text>
    <text x="320" y="107" fill="#f87171" font-size="10" font-family="monospace">[Unreachable / Lagging]</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Quorum de Maioria (2 de 3 nós confirmaram) → Entrada considerada Comitted e aplicada na State Machine.</text>

</svg>
<p>Visualização: Replicação de entradas de log do líder para os seguidores e confirmação de commit ao atingir o quorum da maioria.</p>

| Fase da Replicação | Estado da Entrada de Log | Visibilidade para o Cliente |
|---|---|---|
| **1. Proposta** | Gravada apenas no log do Leader | Invisível (Em processamento) |
| **2. Quorum Atingido** | Gravada em $>50\%$ dos nós | Efetivada (Retorna sucesso ao cliente) |
| **3. Aplicação na FSM** | Executada na Máquina de Estados | Dados consultáveis via leitura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Resolução de Conflitos de Log
- Se um Follower divergir do Leader (devido a falhas anteriores), o Leader força o log do Follower a duplicar o seu:
  - O Leader localiza a última entrada comum retrocedendo o `nextIndex` para esse nó e sobrescreve todas as entradas conflitantes subsequentes.

</details>
