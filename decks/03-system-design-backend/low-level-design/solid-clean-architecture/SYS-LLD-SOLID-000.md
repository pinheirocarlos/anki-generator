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
