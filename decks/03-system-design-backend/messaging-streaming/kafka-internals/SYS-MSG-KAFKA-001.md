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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Log Compaction no Kafka: Retenção do Último Valor por Chave</text>
  <g transform="translate(40, 50)">
    <!-- Before Compaction -->
    <rect x="0" y="0" width="600" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
    <text x="50" y="24" fill="#fbbf24" font-size="9" font-weight="bold">Log Bruto</text>
    <text x="140" y="24" fill="#ffffff" font-size="9" font-family="monospace">(K1, V1)</text>
    <text x="220" y="24" fill="#ffffff" font-size="9" font-family="monospace">(K2, V1)</text>
    <text x="300" y="24" fill="#f87171" font-size="9" font-family="monospace">(K1, V2)</text>
    <text x="380" y="24" fill="#ffffff" font-size="9" font-family="monospace">(K3, V1)</text>
    <text x="470" y="24" fill="#34d399" font-size="9" font-family="monospace" font-weight="bold">(K1, V3)</text>

    <!-- After Compaction -->
    <rect x="0" y="55" width="600" height="40" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="50" y="79" fill="#86efac" font-size="9" font-weight="bold">Compactado</text>
    <text x="220" y="79" fill="#ffffff" font-size="9" font-family="monospace">(K2, V1)</text>
    <text x="380" y="79" fill="#ffffff" font-size="9" font-family="monospace">(K3, V1)</text>
    <text x="470" y="79" fill="#34d399" font-size="9" font-family="monospace" font-weight="bold">(K1, V3)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A thread Cleaner purga registros antigos mantendo o estado final snapshot de cada chave (ex: saldo, status de usuário).</text>

</svg>

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
