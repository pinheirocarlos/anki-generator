---
id: SYS-DB-ACID-001
title: "Mecanismo MVCC (Multi-Version Concurrency Control) e Snapshot Isolation"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Como o Multi-Version Concurrency Control (MVCC) permite que leituras e escritas ocorram simultaneamente sem bloqueios mútuos (*Readers don't block writers*)?

## Resposta
### Quick Answer
**Solução Direta**:
- No **MVCC**, mutações (`UPDATE`, `DELETE`) não sobrescrevem os dados existentes no lugar. Em vez disso, o banco cria uma **nova versão** da tupla com metadados de controle de transação:
  - `xmin` / `created_by_tx`: ID da transação que criou a versão.
  - `xmax` / `deleted_by_tx`: ID da transação que deletou ou atualizou a versão.
- **Snapshot Isolation**: Quando uma transação inicia, ela recebe uma "foto" (*Snapshot*) das transações commitadas até aquele momento.
- Leituras acessam versões históricas imutáveis sem adquirir locks de leitura, garantindo que **leituras nunca bloqueiem escritas e escritas nunca bloqueiem leituras**.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">MVCC (Multi-Version Concurrency Control) &amp; Snapshot Isolation</text>
  <g transform="translate(40, 50)">
    <!-- Tuple Versions in PostgreSQL -->
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estrutura de Tuplas no Disco: xmin (Tx Criadora) e xmax (Tx Deletora)</text>

    <!-- Version 1 -->
    <rect x="20" y="40" width="170" height="65" rx="4" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
    <text x="105" y="58" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">Versão 1 (Saldo: $100)</text>
    <text x="105" y="78" fill="#cbd5e1" font-size="9" text-anchor="middle">xmin: 100 | xmax: 105 (Morto)</text>
    <text x="105" y="94" fill="#f87171" font-size="9" text-anchor="middle">Visível para Tx &lt; 105</text>

    <!-- Version 2 -->
    <rect x="215" y="40" width="170" height="65" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="58" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Versão 2 (Saldo: $150)</text>
    <text x="300" y="78" fill="#cbd5e1" font-size="9" text-anchor="middle">xmin: 105 | xmax: 120 (Morto)</text>
    <text x="300" y="94" fill="#fbbf24" font-size="9" text-anchor="middle">Visível para 105 &lt;= Tx &lt; 120</text>

    <!-- Version 3 (Active) -->
    <rect x="410" y="40" width="170" height="65" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="495" y="58" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Versão 3 (Saldo: $220)</text>
    <text x="495" y="78" fill="#cbd5e1" font-size="9" text-anchor="middle">xmin: 120 | xmax: 0 (Ativo)</text>
    <text x="495" y="94" fill="#86efac" font-size="9" text-anchor="middle">Visível para Tx &gt;= 120</text>
  </g>
  <text x="340" y="205" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Regra de Ouro do MVCC: Leituras nunca bloqueiam Escritas; Escritas nunca bloqueiam Leituras.</text>

</svg>
<p>Visualização: Controle de Concorrência Multiversão (MVCC): leituras enxergam snapshot imutável baseado em xmin/xmax sem travar escritas.</p>

| Ação Concorrente | Com Locks Tradicionais (2PL) | Com MVCC |
|---|---|---|
| **Leitura durante Escrita** | Leitura bloqueada aguardando lock exclusivo | Leitura lê versão anterior no Snapshot (Sem bloqueio) |
| **Escrita durante Leitura** | Escrita bloqueada aguardando liberação de lock | Escrita cria nova versão em paralelo (Sem bloqueio) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Coleta de Lixo de Versões Antigas (*Vacuum / Undo Log*)
- Como o MVCC acumula versões mortas (*Dead Tuples*), o banco precisa limpá-las:
  - **Postgres**: Processo `VACUUM` remove tuplas mortas que não são mais visíveis por nenhuma transação ativa.
  - **MySQL InnoDB**: Utiliza o *Undo Log Segments* para reconstruir versões anteriores.

</details>
