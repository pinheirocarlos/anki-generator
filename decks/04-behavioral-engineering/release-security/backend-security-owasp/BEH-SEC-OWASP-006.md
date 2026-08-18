---
id: BEH-SEC-OWASP-006
title: "Gestão e Rotação Automática de Segredos com HashiCorp Vault em Microsserviços"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Como arquitetar uma infraestrutura segura de **Gestão e Rotação Automática de Segredos** (HashiCorp Vault / AWS Secrets Manager) em microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Regras de Ouro de Segurança**:
  - Proibição estrita de credenciais em repositórios Git, imagens Docker ou variáveis de ambiente estáticas.
- **Arquitetura com HashiCorp Vault**:
  1. **Autenticação Segura de Máquina**: O pod do Kubernetes autentica no Vault via ServiceAccount token assinado e mTLS.
  2. **Credenciais Efêmeras e Dinâmicas**: O Vault gera usuários de banco de dados sob demanda com tempo de vida curto (ex: TTL de 1 hora).
  3. **Rotação Transparente em Memória**: A aplicação renova o token automaticamente ou recebe o novo secret via sidecar, sem necessidade de restart ou deploy.

### Dual Coding Visual
| Prática Insegura | Prática com Vault / Secrets Manager | Benefício de Segurança |
|---|---|---|
| Senha fixa em `.env` ou Git | Credenciais dinâmicas com TTL curto | Vazamentos de credenciais expiram em 1h |
| Rotação manual com downtime | Rotação automática via Secrets Engine | Zero intervenção humana e zero downtime |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo de Geração de Credencial Dinâmica no Vault
```text
[Microsserviço] ──(Autentica com ServiceAccount)──► [HashiCorp Vault]
                                                             │
                                                             ▼
[Banco de Dados] ◄──(Vault cria usuário temporário com TTL)──┘
        │
        ▼
[Microsserviço conecta com credencial efêmera válida por 1 hora]
```

#### Key Takeaways
- O uso de credenciais dinâmicas e efêmeras transforma segredos estáticos em acessos temporários e auditáveis, limitando drasticamente o impacto de eventuais vazamentos.

</details>
