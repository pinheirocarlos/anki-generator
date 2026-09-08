---
id: SYS-DIST-TX-000
title: "Two-Phase Commit (2PC): Fases Prepare e Commit e Vulnerabilidade de Bloqueio"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::oracle
  - freq::high
---

## Pergunta
Como funciona o protocolo Two-Phase Commit (2PC) e por que ele é classificado como um protocolo de commit síncrono bloqueante?

## Resposta
### Quick Answer
**Solução Direta**:
- O 2PC coordena uma transação atômica entre múltiplos bancos através de um **Coordenador**:
  - **Fase 1 (Prepare)**: O coordenador envia `PREPARE` para todos os nós participantes. Cada nó aloca locks locais, valida restrições, grava em WAL e responde `VOTE_COMMIT` ou `VOTE_ABORT`.
  - **Fase 2 (Commit/Abort)**: Se TODOS votaram sim, o coordenador grava `COMMIT` no log e envia `DO_COMMIT` a todos. Se qualquer nó votou não ou deu timeout, envia `DO_ABORT`.
- **Natureza Bloqueante**: Se o coordenador cair após a Fase 1 enquanto nós mantêm locks abertos, os participantes ficam bloqueados indefinidamente sem saber se devem commitar ou abortar (*Coordinator Failure Problem*).

### Dual Coding Visual
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Two-Phase Commit (2PC): Protocolo Síncrono de Consenso Atômico</text>
  <g transform="translate(40, 50)">
    <!-- Phase 1: Prepare -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fase 1: Prepare (Votação)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Coordenador envia PREPARE</text>
    <text x="140" y="65" fill="#cbd5e1" font-size="10" text-anchor="middle">Participantes adquirem locks</text>
    <text x="140" y="85" fill="#cbd5e1" font-size="10" text-anchor="middle">e respondem VOTE_COMMIT</text>
    <text x="140" y="112" fill="#fbbf24" font-size="9" text-anchor="middle">Locks segurados bloqueiam recursos</text>

    <!-- Phase 2: Commit -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fase 2: Commit (Efetivação)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Se 100% dos votos foram SIM:</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Coordenador grava COMMIT no log</text>
    <text x="460" y="85" fill="#cbd5e1" font-size="10" text-anchor="middle">Participantes aplicam e liberam locks</text>
    <text x="460" y="112" fill="#f87171" font-size="9" text-anchor="middle">Ponto único de falha: Coordenador trava</text>
  </g>
  <text x="340" y="215" fill="#94a3b8" font-size="10" text-anchor="middle">2PC é bloqueante (Blocking Protocol): se o coordenador morrer na fase 2, participantes ficam travados indefinidamente.</text>

</svg>
<p>Visualização: Protocolo Two-Phase Commit (2PC): fase Prepare obtendo votos de prontidão e fase Commit aplicando alterações atomicamente.</p>

| Fase do 2PC | Ação do Coordenador | Ação dos Participantes |
|---|---|---|
| **Fase 1: Prepare** | Envia requisição de voto | Adquire locks e responde Sim/Não |
| **Fase 2: Commit/Abort** | Decide pelo consenso unânime | Aplica alteração e libera locks |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desvantagens em Escala Web / Microsserviços
- **Latência elevada**: O tempo total da transação é limitado pelo participante mais lento.
- **Deadlocks distribuídos**: Segurar locks por longos períodos sob alto throughput causa saturação de conexões.
- Por isso, microsserviços modernos substituem o 2PC por **Sagas** e consistência eventual.

</details>
