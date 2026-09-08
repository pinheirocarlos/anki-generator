---
id: SYS-MSG-EVENTS-006
title: "Intuição Fundamental de Event Sourcing & CQRS: O Extrato Bancário vs O Saldo Atual"
tags:
  - level::l2-fundamental
  - topic::sys::messaging
  - company::uber
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás de Event Sourcing (guardar fatos imutáveis) e CQRS (separação de modelos de escrita e leitura)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em sistemas tradicionais (CRUD), ao atualizar um dado (`UPDATE users SET saldo = 150`), você **apaga e destrói o estado anterior** para sempre.
- **Event Sourcing**: Em vez de guardar apenas o estado final, você armazena a **linha do tempo completa de todos os eventos que aconteceram** (como o **extrato bancário**: `Depósito +R$100`, `Depósito +R$100`, `Saque -R$50`). O saldo atual ($R\$ 150$) é apenas o resultado de somar os eventos.
- **CQRS (Command Query Responsibility Segregation)**: Separa o caminho de **Gravação** (Commands: grava eventos no Event Store) do caminho de **Leitura** (Queries: lê de tabelas ou caches pré-calculados ultra-rápidos).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Event Sourcing + CQRS: Event Store Imutável e Projeções de Leitura</text>

  <!-- Lado de Gravação (Command) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="150" height="95" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="8" />
    <text x="75" y="22" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">Escrita (Command)</text>
    <text x="75" y="42" fill="#ffffff" font-size="9" text-anchor="middle">1. `DepositarValor`</text>
    <text x="75" y="58" fill="#ffffff" font-size="9" text-anchor="middle">2. `ComprarPassagem`</text>
    <text x="75" y="80" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">Apenas Append de Fatos</text>
  </g>

  <!-- Event Store Central -->
  <g transform="translate(230, 45)">
    <rect x="0" y="0" width="140" height="105" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="70" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Event Store (Log)</text>
    <rect x="15" y="32" width="110" height="18" fill="#0f172a" rx="3" />
    <text x="70" y="45" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">DepósitoCriado (+100)</text>
    <rect x="15" y="54" width="110" height="18" fill="#0f172a" rx="3" />
    <text x="70" y="67" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">DepósitoCriado (+100)</text>
    <rect x="15" y="76" width="110" height="18" fill="#0f172a" rx="3" />
    <text x="70" y="89" fill="#fca5a5" font-size="8" font-family="monospace" text-anchor="middle">SaqueEfetuado (-50)</text>
  </g>

  <!-- Lado de Leitura (Query View) -->
  <g transform="translate(410, 50)">
    <rect x="0" y="0" width="150" height="95" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="8" />
    <text x="75" y="22" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Leitura (Query View)</text>
    <rect x="20" y="36" width="110" height="30" fill="#312e81" rx="4" />
    <text x="75" y="55" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Saldo: R$ 150</text>
    <text x="75" y="82" fill="#a5b4fc" font-size="8" text-anchor="middle">Projeção pré-calculada</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Auditoria 100% perfeita: você pode reconstruir o estado do sistema em qualquer data do passado!</text>
</svg>
<p>Visualização: Arquitetura unificada Event Sourcing e CQRS: gravação em append-only log imutável e projeções assíncronas para consultas otimizadas.</p>

| Arquitetura | Como Armazena o Estado | Analogia do Cotidiano |
|---|---|---|
| **CRUD Convencional** | Sobrescreve o saldo com o valor novo | Apagar o valor com borracha na folha de papel e escrever o novo número por cima. |
| **Event Sourcing** | Guarda a lista cronológica de todos os lançamentos | O livro razão do contador onde nenhuma linha pode ser apagada ou riscada. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Benefícios Poderosos de Event Sourcing
1. **Auditoria Nativa Completa**: Quem fez o que, quando e por quê fica registrado para sempre sem necessidade de criar tabelas extras de log.
2. **Viagem no Tempo (Time Travel Debugging)**: Se um bug foi introduzido na terça-feira, você pode rodar os eventos até segunda-feira e ver exatamente o estado do sistema naquele segundo.
3. **Múltiplas Visões de Leitura**: Você pode usar os mesmos eventos para alimentar um banco Postgres (para o app mobile) e um Elasticsearch (para o time de suporte) simultaneamente.

#### Key Takeaways
- Event Sourcing é o padrão padrão em sistemas financeiros, cartões de crédito, plataformas de carona (Uber) e comércio eletrônico.
- CQRS permite otimizar o banco de escrita para velocidade máxima de append e o banco de leitura para queries ricas sem conflito.

</details>
