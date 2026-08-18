---
id: SYS-DIST-TX-001
title: "Saga Pattern: Coreografia vs Orquestração e Transações Compensatórias"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::uber
  - freq::high
---

## Pergunta
Como o padrão Saga garante consistência eventual entre múltiplos microsserviços e qual é a diferença entre Coreografia e Orquestração?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Saga** decompõe uma transação distribuída em uma sequência de transações locais individuais em cada serviço.
- Cada etapa concluída dispara um evento/mensagem para a próxima etapa.
- **Rollback via Compensação**: Se uma etapa falhar no meio do caminho, a Saga executa explicitamente **Transações Compensatórias** em ordem reversa para desfazer as alterações já gravadas (ex: estornar pagamento no cartão se o estoque esgotou).
- **Coreografia**: Serviços comunicam-se via eventos assíncronos (Pub/Sub) sem coordenador central.
- **Orquestração**: Um serviço centralizado (Orchestrator/Workflow Engine como Temporal) controla a máquina de estados e dispara os comandos.

### Dual Coding Visual
| Modelo de Saga | Prós | Contras |
|---|---|---|
| **Coreografia (Event-Driven)** | Desacoplamento total, sem gargalo central | Rastreamento complexo de fluxo e dependências cíclicas |
| **Orquestração (Central Coordinator)** | Fluxo explícito, fácil auditoria e gestão de falhas | Ponto central de lógica e acoplamento com orchestrator |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo: Criação de Pedido em E-commerce (Saga Orquestrada)
1. `Orchestrator` chama `OrderService.create()` (Sucesso).
2. `Orchestrator` chama `PaymentService.charge()` (Sucesso).
3. `Orchestrator` chama `InventoryService.reserve()` (FALHA: Sem estoque).
4. `Orchestrator` executa compensação: chama `PaymentService.refund()` (Sucesso).
5. `Orchestrator` executa compensação: chama `OrderService.cancel()` (Sucesso).

</details>
