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
