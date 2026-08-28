---
id: SYS-MSG-QUEUES-000
title: "Filas de Mensagens (RabbitMQ / SQS): Point-to-Point vs Publish-Subscribe"
tags:
  - level::l3-junior
  - topic::sys::messaging
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual entre o modelo Ponto a Ponto (Point-to-Point) e o modelo Publicação/Assinatura (Pub/Sub) em message brokers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Ponto a Ponto (Queue / Worker Pool)**:
  - Cada mensagem enviada para a fila é processada por **exatamente um consumidor** entre os múltiplos workers disponíveis (*Competing Consumers*).
  - Ideal para distribuição balanceada de tarefas pesadas em background.
- **Publicação/Assinatura (Topic / Exchange)**:
  - O produtor publica a mensagem em um **Tópico/Fanout Exchange**.
  - A mensagem é copiada e entregue a **todos os assinantes inscritos** (cada serviço consumidor recebe sua própria cópia independente da mensagem).

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Filas Ponto a Ponto (Point-to-Point) vs Fan-Out Pub/Sub</text>
  <g transform="translate(40, 50)">
    <!-- Point to Point -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Point-to-Point (Queue: SQS / RabbitMQ)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">1 Mensagem é consumida por</text>
    <text x="140" y="68" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">EXATAMENTE 1 Consumidor (Competição)</text>
    <text x="140" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para processamento de tarefas em background</text>

    <!-- Pub Sub -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Publish/Subscribe (Topic: SNS / Kafka)</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">1 Mensagem é copiada e entregue para</text>
    <text x="460" y="68" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">TODOS os Assinantes (Fan-Out)</text>
    <text x="460" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para notificações e pipelines de eventos</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Padrão SNS + SQS Fan-Out: SNS publica para múltiplos tópicos SQS isolando cada serviço downstream.</text>

</svg>

| Modelo de Mensageria | Quantidade de Consumidores por Mensagem | Caso de Uso Primário |
|---|---|---|
| **Point-to-Point (Queue)** | Exatamente 1 consumidor | Processamento de tarefas assíncronas |
| **Publish-Subscribe (Topic)** | Múltiplos consumidores (Broadcast) | Disseminação de eventos de domínio |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Evento `OrderPlaced`
- No modelo Pub/Sub, o evento `OrderPlaced` é entregue simultaneamente para:
  1. `PaymentWorkerQueue` (cobrar o cartão).
  2. `InventoryWorkerQueue` (reservar itens).
  3. `NotificationWorkerQueue` (enviar e-mail de confirmação).

</details>
