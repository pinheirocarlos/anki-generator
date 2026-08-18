---
id: BEH-SEC-DEPLOY-003
title: "Feature Flags e Dark Launching: Desacoplando Deploy de Release"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão de **Feature Flags / Dark Launching** desacopla o envio de código (*Deploy*) da disponibilização para os usuários (*Release*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Desacoplamento de Deploy e Release**:
  - **Deploy (Ato Técnico)**: O código novo é compilado, testado e enviado para produção com a funcionalidade desativada por padrão.
  - **Release (Ato de Negócio)**: A ativação da funcionalidade ocorre em tempo de execução via painel de configuração (ex: LaunchDarkly / Unleash) para grupos específicos de usuários, sem necessidade de novo deploy.
- **Vantagens Operacionais**:
  - Rollback instantâneo (desligar a flag em milissegundos se houver erro).
  - Liberação gradual por público (ex: apenas funcionários internos $	o$ beta testers $	o$ 100%).

### Dual Coding Visual
| Abordagem Tradicional | Abordagem com Feature Flags | Vantagem Decisiva |
|---|---|---|
| Deploy e liberação ocorrem juntos | Código dorme desativado em produção | Zero risco no momento do deploy |
| Rollback exige novo deploy no CI/CD | Rollback via chave de flag em runtime | **Recuperação instantânea (< 1 segundo)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Avaliação Dinâmica em Go
```go
func (s *PaymentService) Charge(ctx context.Context, order *Order) error {
  // Avalia dinamicamente se a flag está ativa para o ID do usuário
  if s.flags.IsEnabled("use_new_payment_v2", order.UserID) {
    return s.processWithNewEngine(ctx, order)
  }
  return s.processWithLegacyEngine(ctx, order)
}
```

#### Key Takeaways
- Feature flags transformam decisões de lançamento em controles dinâmicos de runtime, mitigando riscos e capacitando times de produto a controlar experimentos de forma autônoma.

</details>
