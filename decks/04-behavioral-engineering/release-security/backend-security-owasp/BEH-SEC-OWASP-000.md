---
id: BEH-SEC-OWASP-000
title: "Distinção Fundamental entre Autenticação (AuthN) e Autorização (AuthZ)"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre **Autenticação (AuthN)** e **Autorização (AuthZ)** em segurança de aplicações backend?

## Resposta
### Quick Answer
**Solução Direta**:
- **Autenticação (AuthN — "Quem é você?")**:
  - Processo de verificar e validar a identidade alegada do usuário ou serviço (ex: usuário e senha com hash Argon2, MFA/TOTP, biometria WebAuthn, login federado OIDC).
- **Autorização (AuthZ — "O que você pode fazer?")**:
  - Processo de determinar quais permissões, recursos e operações uma identidade já autenticada tem direito de acessar ou executar (ex: permissões de leitura/escrita, escopos OAuth2, regras RBAC/ABAC).

### Dual Coding Visual
| Conceito de Segurança | Pergunta Central | Mecanismo Típico no Backend |
|---|---|---|
| **Autenticação (AuthN)** | *"Quem é você?"* | Validação de credenciais, MFA e tokens OIDC |
| **Autorização (AuthZ)** | *"O que você pode acessar?"* | Escopos de permissão, RBAC e ABAC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo Sequencial de Segurança
```text
[Usuário envia Credenciais]
          │
          ▼
1. Autenticação (AuthN): Valida senha e MFA ──► Identidade Confirmada (ID: usr_99)
          │
          ▼
2. Autorização (AuthZ): Checa se usr_99 tem role ADMIN ──► Permissão Concedida ✅
```

#### Key Takeaways
- AuthN sempre precede AuthZ: primeiro confirmamos a identidade com certeza criptográfica, e em seguida validamos as permissões específicas sobre cada recurso solicitado.

</details>
