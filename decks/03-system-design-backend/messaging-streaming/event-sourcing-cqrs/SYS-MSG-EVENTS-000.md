---
id: SYS-MSG-EVENTS-000
title: "Event Sourcing: Log Imutável de Eventos vs Estado Mutável Atual"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão Event Sourcing modela o estado de uma entidade como uma sequência imutável de eventos de domínio em vez de sobrescrever o registro atual?

## Resposta
### Quick Answer
**Solução Direta**:
- **Persistência Tradicional (CRUD)**: Armazena apenas o estado atual da entidade (ex: `balance = 500.00`), descartando o histórico de como aquele estado foi alcançado.
- **Event Sourcing**:
  - O estado atual **nunca é gravado diretamente**.
  - O sistema grava uma sequência cronológica estritamente imutável e *append-only* de **Eventos de Domínio** em um **Event Store**:
    - `AccountOpened(balance: 0)`
    - `MoneyDeposited(amount: 1000)`
    - `MoneyWithdrawn(amount: 500)`
  - O estado atual é reconstruído executando uma função de redução (*Fold/Replay*) sobre todos os eventos históricos da entidade.
- Fornece **trilha de auditoria 100% perfeita**, viagem no tempo (*Time Travel Debugging*) e reconstrução histórica.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Event Sourcing: Append-Only Event Store &amp; Reidratação de Estado</text>
  <g transform="translate(40, 50)">
    <!-- Event Log -->
    <rect x="0" y="0" width="360" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="180" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Event Store Imutável (Append-Only Log)</text>
    <rect x="20" y="35" width="320" height="22" rx="3" fill="#0369a1"/>
    <text x="180" y="50" fill="#ffffff" font-size="9" text-anchor="middle">1. AccountCreated {id: 10, balance: 0}</text>
    <rect x="20" y="60" width="320" height="22" rx="3" fill="#0369a1"/>
    <text x="180" y="75" fill="#ffffff" font-size="9" text-anchor="middle">2. MoneyDeposited {amount: +$100}</text>
    <rect x="20" y="85" width="320" height="22" rx="3" fill="#0369a1"/>
    <text x="180" y="100" fill="#ffffff" font-size="9" text-anchor="middle">3. MoneyWithdrawn {amount: -$40}</text>

    <!-- State Rehydration -->
    <rect x="400" y="0" width="200" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="500" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Estado Reidratado</text>
    <circle cx="500" cy="65" r="28" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="500" y="70" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">$60.00</text>
    <text x="500" y="108" fill="#86efac" font-size="9" text-anchor="middle">Auditoria 100% Perfeita</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Snapshots periódicos a cada N eventos evitam ter que reproduzir o histórico inteiro desde o início dos tempos.</text>

</svg>

| Paradigma | O que fica persistido no banco | Rastreabilidade Histórica |
|---|---|---|
| **CRUD Convencional** | Apenas a linha com valor atual | Nula (Sobrescrita destrutiva) |
| **Event Sourcing** | Sequência imutável de eventos passados | **Perfeita (Auditoria matemática)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização via Snapshots
- Se uma conta bancária possuir 100.000 eventos, reconstruir o saldo a cada leitura ficaria lento. O sistema grava periodicamente **Snapshots** (ex: a cada 100 eventos). Para carregar o estado, lê o último Snapshot e aplica apenas os eventos ocorridos após ele.

</details>
