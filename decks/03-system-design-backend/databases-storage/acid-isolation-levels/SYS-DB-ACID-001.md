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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/mvcc-snapshot-isolation-xmin-xmax-loop.webm">
    <p>Visualização: Controle de Concorrência Multiversão (MVCC): leituras enxergam snapshot imutável baseado em xmin/xmax sem travar escritas.</p>
  </video>
</div>

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
