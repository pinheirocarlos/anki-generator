---
id: BEH-SRE-INCIDENT-003
title: "O Princípio de Mitigação Imediata sobre Investigação durante Outages de Produção"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Por que o princípio de **"Mitigação Imediata $gg$ Investigação de Causa-Raiz (First, Stop the Bleeding)"** é a regra de ouro durante um outage ativo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Foco em Estancar o Sangramento**: Durante a crise ativa, a única missão da equipe é restaurar o serviço para os usuários com a máxima velocidade (via rollback de versão, traffic shedding, scale-up forçado ou desligamento de feature flags).
- **Proibição de Depuração Profunda na Crise**: Tentar descobrir exatamente qual linha de código gerou o bug enquanto os clientes estão sem acesso atrasa a recuperação e eleva os prejuízos de negócio.
- **Separação de Fases**: A investigação meticulosa da causa raiz pertence exclusivamente à etapa posterior de Post-Mortem.

### Dual Coding Visual
| Fase do Incidente | Prioridade Absoluta | Ação Típica |
|---|---|---|
| **Durante o Outage** | Mitigação rápida e restabelecimento | Rollback de versão, restart ou corte de tráfego |
| **Pós-Incidente** | Investigação detalhada e causa-raiz | Análise de logs, 5 Whys e escrita de Post-Mortem |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Mitigação Imediata
```text
Cenário: Novo deploy causou 15% de erro 500 no checkout.
├── Decisão Errada: Abrir IDE e tentar debugar a query SQL ao vivo em produção.
└── Decisão Correta: Executar rollback imediato para a versão anterior em 2 minutos.
    └── Serviço volta a 100% -> time investiga a causa raiz tranquilamente em staging.
```

#### Key Takeaways
- Priorizar a mitigação imediata protege os clientes e os negócios da empresa, adiando a curiosidade diagnóstica para um ambiente seguro.

</details>
