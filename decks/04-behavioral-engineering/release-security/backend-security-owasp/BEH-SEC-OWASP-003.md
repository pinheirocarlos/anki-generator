---
id: BEH-SEC-OWASP-003
title: "Estrutura do JWT e Mecanismo de Validação Stateless via Chave Pública JWKS"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::google
  - freq::high
---

## Pergunta
Como está estruturado um **JWT (JSON Web Token)** e por que sua validação de assinatura criptográfica é considerada *stateless*?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura em 3 Partes (Codificadas em Base64URL)**:
  `Header.Payload.Signature`
  1. **Header**: Metadados do algoritmo de assinatura (ex: `RS256`, `ES256`) e ID da chave (`kid`).
  2. **Payload**: Claims de dados (identificador `sub`, emissor `iss`, expiração `exp`, roles).
  3. **Signature**: Assinatura criptográfica gerada com a chave privada do servidor de autenticação.
- **Validação Stateless via JWKS**:
  - Qualquer microsserviço backend pode baixar a chave pública do emissor (endpoint JWKS) e verificar a assinatura localmente em memória com computação puramente matemática, sem consultar banco de dados ou servidor central a cada requisição.

### Dual Coding Visual
| Componente do JWT | O que Contém | Função de Segurança |
|---|---|---|
| **Header** | Algoritmo e `kid` | Instruções de validação criptográfica |
| **Payload** | Dados e permissões | Claims de identidade com validade (`exp`) |
| **Signature** | Assinatura com Chave Privada | Garante que o payload não foi adulterado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Validação Stateless entre Microsserviços
```text
[Auth Server] ──(Emite JWT assinado com Chave Privada)──► [Cliente]
                                                               │
┌──────────────────────────────────────────────────────────────┘
│ (Envia Header: Bearer <jwt>)
▼
[API Gateway / Microsserviço]
├── Baixa Chave Pública uma vez do endpoint /.well-known/jwks.json (com cache local).
├── Valida a assinatura matematicamente em < 1ms.
└── Processa a requisição sem fazer nenhuma consulta de rede ou banco!
```

#### Key Takeaways
- JWTs viabilizam arquiteturas de microsserviços altamente escaláveis e desacopladas, dispensando compartilhamento de sessões em bancos de dados centrais.

</details>
