---
id: SYS-MSG-QUEUES-001
title: "Dead Letter Queues (DLQ) e Visibility Timeout no Amazon SQS"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::aws
  - freq::high
---

## Pergunta
Como o mecanismo de Visibility Timeout e Dead Letter Queue (DLQ) previne perda de mensagens e travamentos por 'Mensagens Venenosas' (*Poison Pills*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Visibility Timeout**:
  - Quando um consumidor busca uma mensagem no SQS, a mensagem **não é deletada**; ela fica temporariamente **invisível** para outros consumidores durante o timeout (ex: 30 segundos).
  - Se o consumidor processar e deletar a mensagem com sucesso, ela é removida definitivamente.
  - Se o consumidor sofrer crash ou timeout, a mensagem volta a ficar visível para outro worker processá-la.
- **Dead Letter Queue (DLQ)**:
  - Se uma mensagem falhar consecutivamente mais de $N$ vezes (`maxReceiveCount`, ex: 5 tentativas devido a bugs ou formato inválido - *Poison Pill*), o broker a move automaticamente para uma **DLQ isolada** para auditoria manual sem bloquear a fila principal.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Amazon SQS: Visibility Timeout &amp; Dead Letter Queue (DLQ)</text>
  <g transform="translate(40, 50)">
    <!-- SQS Queue -->
    <rect x="0" y="0" width="260" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="130" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fila Principal SQS</text>
    <text x="130" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Worker pega msg → Invisível por 30s</text>
    <text x="130" y="68" fill="#f87171" font-size="10" text-anchor="middle">Se Worker falhar sem dar DeleteMsg:</text>
    <text x="130" y="90" fill="#fbbf24" font-size="10" text-anchor="middle">Msg reaparece na fila (ReceiveCount++)</text>

    <!-- Dead Letter Queue -->
    <rect x="340" y="0" width="260" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
    <text x="470" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Dead Letter Queue (DLQ)</text>
    <text x="470" y="48" fill="#fca5a5" font-size="10" text-anchor="middle">Após maxReceiveCount = 3 falhas:</text>
    <text x="470" y="70" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Msg 'Poison Pill' movida para DLQ</text>
    <text x="470" y="92" fill="#86efac" font-size="9" text-anchor="middle">Impede bloqueio e alerta equipe de SRE</text>

    <!-- Flow Arrow -->
    <line x1="260" y1="60" x2="340" y2="60" stroke="#f43f5e" stroke-width="2"/>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A DLQ isola mensagens defeituosas que quebram o código do consumidor, garantindo fluidez para o resto da fila.</text>

</svg>
<p>Visualização: Visibility Timeout escondendo mensagem em processamento e roteamento automático para DLQ após estourar limite de retentativas.</p>

| Parâmetro SQS | Finalidade | Comportamento sob Falha |
|---|---|---|
| **Visibility Timeout** | Prevenir processamento duplicado temporário | Mensagem reaparece se o worker falhar |
| **maxReceiveCount** | Limite de tentativas de reprocessamento | Aciona desvio para a DLQ |
| **DLQ (Dead Letter)** | Quarentena de mensagens com erro persistente | Isola falhas sem travar a fila ativa |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Boas Práticas de Visibility Timeout
- O `VisibilityTimeout` deve ser configurado como **$3x$ a $5x$ o tempo médio** de processamento do worker. Se uma tarefa for mais longa, o consumidor deve chamar periodicamente `ChangeMessageVisibility` para estender o prazo.

</details>
