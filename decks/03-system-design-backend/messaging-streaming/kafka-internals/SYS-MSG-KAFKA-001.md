---
id: SYS-MSG-KAFKA-001
title: "Log Compaction no Kafka e Gerenciamento de Estado (KTable / CDC)"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::uber
  - freq::high
---

## Pergunta
Como funciona a política de Log Compaction no Apache Kafka para manter apenas a versão mais recente de cada chave em tópicos de estado?

## Resposta
### Quick Answer
**Solução Direta**:
- **Log Retention Tradicional**: Descarta segmentos de log baseando-se em tempo (ex: 7 dias) ou tamanho total (ex: 100 GB).
- **Log Compaction**:
  - Em vez de deletar por tempo, o processo de compactação em background varre os segmentos de log e **retém exclusivamente o último valor gravado para cada chave (`Message Key`)**.
  - Se um valor for enviado como `null` (*Tombstone*), a chave é eventualmente purgada.
  - Permite utilizar tópicos Kafka como **tabelas de estado reconstruíveis (KTable)** para restauração instantânea de caches e bancos após crash.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/kafka-log-compaction-cleaner-head-tail-loop.webm">
    <p>Visualização: Thread de Cleaner do Kafka mantendo apenas o último valor de cada chave no log compactado.</p>
  </video>
</div>

| Estratégia de Retenção | Critério de Limpeza | Caso de Uso |
|---|---|---|
| **Time-based Retention** | Idade do registro ($> N$ dias) | Eventos temporais efêmeros (Logs, métricas) |
| **Log Compaction** | Preserva o último update de cada chave | Snapshots de estado, CDC e KTables |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Compactação
- Mensagens brutas no log: `[K1: v1] -> [K2: v1] -> [K1: v2] -> [K3: v1] -> [K1: v3]`
- Após Log Compaction: `[K2: v1] -> [K3: v1] -> [K1: v3]` (versões intermediárias `v1` e `v2` de `K1` são removidas).

</details>
