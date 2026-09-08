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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Saga: Orquestração vs Coreografia &amp; Transações Compensatórias</text>
  <g transform="translate(40, 50)">
    <!-- Steps -->
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">1. Criar Pedido</text>
    <text x="90" y="48" fill="#86efac" font-size="10" text-anchor="middle">Order Service (OK ✅)</text>
    <text x="90" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">Compensação:</text>
    <text x="90" y="92" fill="#f87171" font-size="9" text-anchor="middle">Cancelar Pedido</text>

    <rect x="210" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Debitar Saldo</text>
    <text x="300" y="48" fill="#86efac" font-size="10" text-anchor="middle">Payment Service (OK ✅)</text>
    <text x="300" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">Compensação:</text>
    <text x="300" y="92" fill="#f87171" font-size="9" text-anchor="middle">Estornar Pagamento</text>

    <rect x="420" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="510" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. Reservar Estoque</text>
    <text x="510" y="48" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Inventory (FALHA ❌)</text>
    <text x="510" y="75" fill="#fbbf24" font-size="9" text-anchor="middle">Dispara Compensação</text>
    <text x="510" y="92" fill="#fde68a" font-size="9" text-anchor="middle">em ordem reversa (2 → 1)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Saga garante consistência eventual sem reter locks distribuídos em bancos de dados distintos.</text>

</svg>
<p>Visualização: Padrão Saga executando transações locais distribuídas com orquestrador central disparando transações compensatórias em falhas.</p>

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
