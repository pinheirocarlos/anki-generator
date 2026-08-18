---
id: SYS-LLD-SOLID-001
title: "Arquitetura Hexagonal (Ports & Adapters) e Clean Architecture"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::uber
  - freq::high
---

## Pergunta
Como a Arquitetura Hexagonal (Ports & Adapters) organiza os limites do software através de Portas de Entrada/Saída e Adaptadores?

## Resposta
### Quick Answer
**Solução Direta**:
- **Núcleo Hexagonal (Core / Domínio)**:
  - Contém as entidades e casos de uso de negócio, isolados e sem dependências de tecnologias externas.
- **Ports (Portas - Abstrações/Interfaces)**:
  - **Inbound Ports (Driving)**: Interfaces que expõem o que a aplicação faz (ex: `CreateUserUseCase`).
  - **Outbound Ports (Driven)**: Interfaces que o domínio exige para funcionar (ex: `UserStoragePort`, `EmailNotificationPort`).
- **Adapters (Adaptadores - Implementações Concretas)**:
  - **Driving Adapters**: Traduzem chamadas externas para as Inbound Ports (ex: REST Controller, gRPC Handler, CLI).
  - **Driven Adapters**: Implementam as Outbound Ports conectando ao mundo externo (ex: `PostgresUserRepository`, `SendgridEmailAdapter`).

### Dual Coding Visual
| Componente Hexagonal | Natureza | Exemplo Concreto |
|---|---|---|
| **Core Domain** | Regras de Negócio Puras | Entidades `Order`, `PaymentRule` |
| **Ports** | Interfaces (Contratos) | `PaymentGatewayPort`, `OrderRepositoryPort` |
| **Adapters** | Código de Infraestrutura | `StripeAdapter`, `PostgresOrderAdapter`, `HTTPController` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Regra de Dependência Fundamental
- Todas as dependências de código apontam **para dentro**, em direção ao Core. O banco de dados e a web são meros detalhes periféricos conectáveis via adaptadores intercambiáveis.

</details>
