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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura Hexagonal (Ports &amp; Adapters / Clean Architecture)</text>
  <g transform="translate(40, 50)">
    <!-- Adapters In -->
    <rect x="0" y="20" width="140" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="70" y="45" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Primary Adapters</text>
    <text x="70" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">HTTP Controller</text>
    <text x="70" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">gRPC / CLI Handler</text>

    <!-- Domain Core -->
    <rect x="180" y="0" width="240" height="120" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="32" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Domain Core (Puro)</text>
    <text x="300" y="55" fill="#ffffff" font-size="10" text-anchor="middle">Entities &amp; Use Cases</text>
    <text x="300" y="75" fill="#86efac" font-size="9" text-anchor="middle">&lt;&lt;interface&gt;&gt; Input / Output Ports</text>
    <text x="300" y="98" fill="#a7f3d0" font-size="9" text-anchor="middle">Zero dependência externa</text>

    <!-- Adapters Out -->
    <rect x="460" y="20" width="140" height="80" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="530" y="45" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Secondary Adapters</text>
    <text x="530" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">PostgresRepository</text>
    <text x="530" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">KafkaEventPublisher</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A inversão de controle permite trocar o banco de dados Postgres por MongoDB sem encostar em 1 linha de Use Case.</text>

</svg>

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
