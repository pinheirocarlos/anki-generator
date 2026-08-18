---
id: BEH-SEC-OWASP-004
title: "Controle de Acesso RBAC (Role-Based) vs ABAC (Attribute-Based)"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Qual é o contraste operacional e de granularidade entre os modelos de controle de acesso **RBAC (Role-Based)** e **ABAC (Attribute-Based)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **RBAC (Role-Based Access Control — Papéis Estáticos)**:
  - Permissões associadas a funções pré-definidas (ex: `ADMIN`, `EDITOR`, `VIEWER`).
  - *Vantagem*: Simples de configurar e gerenciar em sistemas de baixa complexidade.
  - *Limitação*: Sofre com explosão de papéis (*role explosion*) quando surgem exceções contextuais.
- **ABAC (Attribute-Based Access Control — Atributos Dinâmicos)**:
  - Permissões avaliadas em tempo real com base em atributos do sujeito, recurso, ação e ambiente.
  - *Exemplo*: *"Usuário pode editar contrato SE for o criador E status for RASCUNHO E o acesso for em horário comercial"*.
  - *Vantagem*: Máxima granularidade e flexibilidade sem proliferar papéis estáticos.

### Dual Coding Visual
| Modelo | Base de Avaliação | Complexidade |
|---|---|---|
| **RBAC** | Papel fixo atribuído ao usuário (`Role == "ADMIN"`) | Baixa (Ideal para regras simples) |
| **ABAC** | Atributos combinados de usuário, recurso e ambiente | Média/Alta (Motor de políticas como OPA) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Política ABAC com Rego (Open Policy Agent - OPA)
```text
package authz

default allow = false

# Permite acesso se o usuário for do mesmo departamento E o documento for público
allow {
    input.user.department == input.document.department
    input.document.is_classified == false
}

# Permite edição apenas pelo autor durante dias úteis
allow {
    input.user.id == input.document.author_id
    input.action == "edit"
    input.environment.is_business_day == true
}
```

#### Key Takeaways
- Comece com RBAC para estruturas simples de permissão; migre para ABAC (com OPA/Zanzibar) quando as regras de autorização dependerem de contexto e dados do recurso.

</details>
