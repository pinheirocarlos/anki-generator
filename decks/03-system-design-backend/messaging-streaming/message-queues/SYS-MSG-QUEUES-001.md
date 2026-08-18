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
