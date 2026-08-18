---
id: SYS-ARCH-FLASHSALE-001
title: "Filas Virtuais de Espera (Virtual Waiting Room) e Liberação de Inventário por Timeout"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::ticketmaster
  - freq::high
---

## Pergunta
Como salas de espera virtuais (Virtual Waiting Room) e expiração automática de reservas protegem sistemas de ingressos sob demanda extrema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Sala de Espera Virtual (Virtual Waiting Room)**:
  - Diante de 5 milhões de pessoas disputando 50.000 ingressos, o tráfego de entrada é retido em uma camada de borda (Cloudflare / Gateway).
  - Cada usuário recebe um **número de fila sequencial criptografado (Token de Fila)**.
  - O backend libera a entrada de novos usuários para a tela de checkout a uma taxa controlada e estável (ex: exatamente 500 usuários por segundo).
- **Liberação Automática de Inventário (Holding Pattern)**:
  - Ao reservar um assento, o usuário tem **10 minutos para concluir o pagamento**.
  - O sistema agenda uma mensagem atrasada (*Delayed Message* no SQS/Kafka). Se a confirmação de pagamento não chegar aos 10 minutos, o worker cancela a reserva e **devolve o estoque ao Redis automaticamente**.

### Dual Coding Visual
| Componente | Papel Arquitetural | Proteção do Sistema |
|---|---|---|
| **Virtual Waiting Room** | Retém usuários na borda via fila justa | Impede sobrecarga de CPU/Rede no backend |
| **Fila de Expiração (10 min)** | Libera reservas não pagas via Delayed Queue | Garante 100% de ocupação do inventário |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prevenção de Bots e Fraudes
- A sala de espera implementa verificação de **Proof of Work (PoW) no navegador** ou reCAPTCHA v3 para garantir que os números da fila sejam emitidos para humanos reais, frustrando scripts automatizados de compra.

</details>
