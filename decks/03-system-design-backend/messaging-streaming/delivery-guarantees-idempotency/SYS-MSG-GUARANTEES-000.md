---
id: SYS-MSG-GUARANTEES-000
title: "Garantias de Entrega: At-Least-Once vs At-Most-Once vs Exactly-Once (EOS)"
tags:
  - level::l3-junior
  - topic::sys::messaging
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença entre as garantias de entrega At-Most-Once, At-Least-Once e Exactly-Once em sistemas distribuídos de mensageria?

## Resposta
### Quick Answer
**Solução Direta**:
- **At-Most-Once (No máximo uma vez)**: Mensagens podem ser perdidas, mas nunca duplicadas. O consumidor commita o offset antes de processar a mensagem.
- **At-Least-Once (Pelo menos uma vez)**: Mensagens nunca são perdidas, mas **podem ser entregues duplicadas** devido a retries de rede. O consumidor commita o offset apenas após o término do processamento.
- **Exactly-Once Semantics (EOS)**: O efeito final no sistema de destino equivale a processar cada mensagem exatamente uma vez, combinando transações no produtor/broker com **consumidores idempotentes**.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Garantias de Entrega de Mensagens: At-Least-Once vs Exactly-Once</text>
  <g transform="translate(40, 50)">
    <!-- At-Least-Once -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">At-Least-Once (Padrão de Mercado)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Retentativas automáticas em timeout</text>
    <text x="140" y="65" fill="#fca5a5" font-size="10" text-anchor="middle">Mensagens podem ser duplicadas</text>
    <text x="140" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Exige Consumidor Idempotente</text>

    <!-- Exactly-Once -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Exactly-Once Semantics (EOS)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Kafka Transactions (read-process-write)</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Producer ID + Sequence Number monotônico</text>
    <text x="460" y="90" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Custo extra de coordenação/latência</text>
  </g>
  <text x="340" y="198" fill="#94a3b8" font-size="10" text-anchor="middle">A regra de ouro de sistemas distribuídos: Transporte At-Least-Once + Processamento Idempotente = Robustez Total.</text>

</svg>
<p>Visualização: At-Least-Once com retentativas e confirmações (ACKs) vs Exactly-Once usando streams transacionais e chaves de idempotência.</p>

| Garantia de Entrega | Características de Risco | Padrão da Indústria |
|---|---|---|
| **At-Most-Once** | Risco de perda, zero duplicatas | Telemetria não-crítica |
| **At-Least-Once** | Zero perda, risco de duplicação (Exige Idempotência) | **Padrão ouro em Microsserviços** |
| **Exactly-Once** | Zero perda e zero duplicação | Kafka Streams / Transações 2PC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Falácia do Exactly-Once na Rede
- No mundo real, pacotes de rede sempre podem ser reenviados após timeout. A única forma prática de alcançar *Exactly-Once* de ponta a ponta na camada de aplicação é adotar transporte *At-Least-Once* aliado a **idempotência estrita no consumidor**.

</details>
