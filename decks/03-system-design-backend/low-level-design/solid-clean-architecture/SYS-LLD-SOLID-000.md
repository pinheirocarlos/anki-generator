---
id: SYS-LLD-SOLID-000
title: "Princípios SOLID: Single Responsibility (SRP) e Dependency Inversion (DIP)"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::microsoft
  - freq::high
---

## Pergunta
Como o Single Responsibility Principle (SRP) e o Dependency Inversion Principle (DIP) desacoplam a lógica de domínio de detalhes de infraestrutura?

## Resposta
### Quick Answer
**Solução Direta**:
- **Single Responsibility Principle (SRP)**: Um módulo ou classe deve ter **um único motivo para mudar** (responsabilidade coesa focada em um único ator de negócio).
- **Dependency Inversion Principle (DIP)**:
  1. Módulos de alto nível (Regras de Negócio / Domínio) **não devem depender** de módulos de baixo nível (Bancos de dados, frameworks, HTTP clients). Ambos devem depender de **Abstrações (Interfaces)**.
  2. Abstrações não devem depender de detalhes; detalhes devem depender de abstrações.
- Permite trocar o banco de dados (ex: Postgres por DynamoDB) sem alterar uma única linha de regra de negócio do core.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Princípios SOLID em Engenharia de Software Moderna (FAANG Standards)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="110" height="110" rx="4" fill="#0284c7"/>
    <text x="55" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">S</text>
    <text x="55" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Single</text>
    <text x="55" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Responsibility</text>
    <text x="55" y="95" fill="#e0f2fe" font-size="8" text-anchor="middle">1 motivo p/ mudar</text>

    <rect x="120" y="0" width="110" height="110" rx="4" fill="#0369a1"/>
    <text x="175" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">O</text>
    <text x="175" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Open /</text>
    <text x="175" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Closed</text>
    <text x="175" y="95" fill="#e0f2fe" font-size="8" text-anchor="middle">Extensão vs Edição</text>

    <rect x="240" y="0" width="110" height="110" rx="4" fill="#075985"/>
    <text x="295" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">L</text>
    <text x="295" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Liskov</text>
    <text x="295" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Substitution</text>
    <text x="295" y="95" fill="#e0f2fe" font-size="8" text-anchor="middle">Subtipos compatíveis</text>

    <rect x="360" y="0" width="110" height="110" rx="4" fill="#065f46"/>
    <text x="415" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">I</text>
    <text x="415" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Interface</text>
    <text x="415" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Segregation</text>
    <text x="415" y="95" fill="#a7f3d0" font-size="8" text-anchor="middle">Interfaces enxutas</text>

    <rect x="480" y="0" width="110" height="110" rx="4" fill="#047857"/>
    <text x="535" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">D</text>
    <text x="535" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Dependency</text>
    <text x="535" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Inversion</text>
    <text x="535" y="95" fill="#a7f3d0" font-size="8" text-anchor="middle">Depender de abstrações</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">DIP é o alicerce da Arquitetura Hexagonal: o domínio central nunca importa pacotes de infraestrutura.</text>

</svg>

| Princípio SOLID | Violação Comum | Design Correto |
|---|---|---|
| **SRP** | Classe de Negócio calcula imposto e grava no SQL | Lógica de cálculo isolada de repositórios |
| **DIP** | Domínio instancia diretamente `new PostgresClient()` | Domínio recebe interface `UserRepository` injetada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go (DIP na Prática)
```go
package domain

// Alto Nível (Domínio Puro - Sem import de SQL):
type PaymentRepository interface {
  SavePayment(amount float64) error
}

type PaymentUseCase struct {
  repo PaymentRepository // Injeção de dependência via interface
}

func (uc *PaymentUseCase) Process(amount float64) error {
  return uc.repo.SavePayment(amount)
}
```

</details>
