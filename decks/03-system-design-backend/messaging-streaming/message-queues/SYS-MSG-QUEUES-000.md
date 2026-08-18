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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/message-queues-point-to-point-vs-pubsub-loop.webm">
    <p>Visualização: Fila Ponto a Ponto competindo por mensagens vs Fan-out Pub/Sub entregando cópia para múltiplos assinantes.</p>
  </video>
</div>

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
