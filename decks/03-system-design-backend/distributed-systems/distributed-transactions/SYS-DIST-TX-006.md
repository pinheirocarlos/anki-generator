---
id: SYS-DIST-TX-006
title: "Intuição Fundamental de Transações Distribuídas: A Viagem de Férias e a Saga de Reservas"
tags:
  - level::l2-fundamental
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás do padrão Saga para transações em múltiplos microsserviços e como as ações compensatórias tratam falhas parciais?

## Resposta
### Quick Answer
**Solução Direta**:
- Em microsserviços, cada serviço tem seu próprio banco de dados isolado; não existe mais um comando `BEGIN TRANSACTION ... COMMIT` que trava o mundo inteiro de uma vez (como no 2PC tradicional, que é lento e frágil).
- O **Padrão Saga** divide uma operação grande em uma **série de transações locais encadeadas**:
  1. O serviço de Pedidos cria o pedido pendente.
  2. O serviço de Pagamento debita o cartão.
  3. O serviço de Entrega agenda o frete.
- Se o passo 3 falhar (ex: sem entregadores), a Saga executa **Ações Compensatórias de trás para frente** (estorna o cartão no passo 2 e cancela o pedido no passo 1).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Fluxo Saga: Transações Locais + Ações Compensatórias</text>

  <!-- Passo 1 -->
  <g transform="translate(50, 45)">
    <rect x="0" y="0" width="130" height="60" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="6" />
    <text x="65" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">1. Pedido Criado</text>
    <text x="65" y="44" fill="#ffffff" font-size="10" text-anchor="middle">T1: DB Pedidos ✓</text>
  </g>

  <!-- Seta para frente -->
  <text x="195" y="78" fill="#10b981" font-size="14" font-weight="bold">→</text>

  <!-- Passo 2 -->
  <g transform="translate(225, 45)">
    <rect x="0" y="0" width="130" height="60" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="6" />
    <text x="65" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">2. Pagamento Pago</text>
    <text x="65" y="44" fill="#ffffff" font-size="10" text-anchor="middle">T2: DB Pagamentos ✓</text>
  </g>

  <!-- Seta para frente -->
  <text x="370" y="78" fill="#ef4444" font-size="14" font-weight="bold">→</text>

  <!-- Passo 3 (Falhou!) -->
  <g transform="translate(400, 45)">
    <rect x="0" y="0" width="150" height="60" fill="#7f1d1d" stroke="#ef4444" stroke-width="2" rx="6" />
    <text x="75" y="24" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">3. Estoque Falhou</text>
    <text x="75" y="44" fill="#ffffff" font-size="10" text-anchor="middle">Sem produto em estoque! ✗</text>
  </g>

  <!-- Compensação (Volta) -->
  <path d="M 475 110 Q 290 160 115 110" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" />
  <polygon points="115,110 125,113 122,105" fill="#f59e0b" />
  <text x="300" y="150" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">⤺ Compensação: C2 (Estorna Cartão) + C1 (Cancela Pedido)</text>

  <text x="300" y="185" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Consistência Eventual: Cada microsserviço cuida do seu próprio estado!</text>
</svg>

| Abordagem | Como Lida com Múltiplos Bancos | Analogia do Cotidiano |
|---|---|---|
| **2PC (Two-Phase Commit)** | Bloqueia todos os bancos até o fim | Ficar segurando a linha em conferência com 3 pessoas ao mesmo tempo. |
| **Saga (Compensações)** | Faz cada passo e desfaz se der errado | Comprar passagem aérea e hotel separadamente; se o hotel lotar, pedir reembolso da passagem. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema Real
Em uma arquitetura monolítica, o banco relacional garante que se um passo falhar, tudo dá rollback automaticamente. Em microsserviços, o dinheiro já saiu do cartão da pessoa no serviço da Stripe antes do serviço de estoque perceber que a última camiseta acabou.

#### Os Dois Tipos de Saga
1. **Coreografada (Baseada em Eventos)**: Cada serviço ouve eventos do Kafka/RabbitMQ e sabe o próximo passo sozinho. Ideal para fluxos simples (2 a 4 passos).
2. **Orquestrada (Coordenador Central)**: Um serviço orquestrador (ex: Temporal, AWS Step Functions) manda ordens explícitas e gerencia o estado da máquina de transações. Ideal para fluxos complexos com muitas ramificações.

#### Key Takeaways
- Transações distribuídas em sistemas de alta escala utilizam **Consistência Eventual** e Sagas, evitando bloqueios globais que derrubam a vazão do sistema.
- Toda ação em uma Saga deve ter uma ação compensatória correspondente (ex: debitar $\rightarrow$ estornar; reservar $\rightarrow$ liberar).

</details>
