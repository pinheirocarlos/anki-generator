---
id: BEH-SEC-OWASP-002
title: "OAuth 2.0 (Autorização Delegada) vs OpenID Connect / OIDC (Identidade)"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a distinção funcional entre os padrões **OAuth 2.0 (Autorização)** e **OpenID Connect / OIDC (Autenticação)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **OAuth 2.0 (Framework de Autorização Delegada)**:
  - Permite que uma aplicação terceira acesse recursos protegidos em nome do usuário sem ter acesso à senha dele.
  - Emite um `access_token` com escopos de permissão (ex: `scope="read:photos"`).
- **OpenID Connect / OIDC (Camada de Identidade)**:
  - Protocolo de autenticação construído sobre o OAuth 2.0.
  - Emite um `id_token` assinado no formato JWT contendo as informações de perfil do usuário (`sub`, `name`, `email`).

### Dual Coding Visual
| Protocolo | Função Central | Token Principal Emitido |
|---|---|---|
| **OAuth 2.0** | Autorização Delegada de Recursos | `access_token` (Chave de Acesso) |
| **OpenID Connect (OIDC)** | Autenticação Federada e Identidade | `id_token` (Documento de Identidade / RG) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Analogia Prática do Crachá e da Chave
```text
- id_token (OIDC): O crachá com sua foto e nome comprovando quem você é.
- access_token (OAuth 2.0): O cartão magnético que abre as portas das salas autorizadas.
```

#### Key Takeaways
- OAuth 2.0 resolve o problema de delegação de acesso a APIs; OIDC adiciona a camada padronizada de login federado e perfil de usuário.

</details>
