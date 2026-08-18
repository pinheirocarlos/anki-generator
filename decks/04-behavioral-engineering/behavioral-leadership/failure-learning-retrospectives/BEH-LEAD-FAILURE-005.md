---
id: BEH-LEAD-FAILURE-005
title: "Estruturação e Classificação de Action Items SMART Pós-Incidente"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como classificar e redigir **Action Items (AIs) SMART** pós-incidente para garantir a não-reincidência de outages?

## Resposta
### Quick Answer
**Solução Direta**:
- **Classificação em 3 Categorias Fundamentais**:
  1. **Detectar Mais Rápido**: Criar alertas proativos de SLO no Prometheus para reduzir o MTTD.
  2. **Mitigar Mais Rápido**: Implementar automações de rollback em Canary e ferramentas de traffic shedding.
  3. **Prevenir Ocorrência**: Adicionar linters, testes de integração reais com Testcontainers e validações no CI.
- **Regras SMART para Action Items**:
  - *Specific*: Tarefa técnica precisa (não genérica como *"melhorar testes"*).
  - *Measurable*: Critério de aceite claro (ex: *"teste de carga cobrindo 20k QPS"*).
  - *Assignable*: Dono nominal único e intransferível.
  - *Time-Bound*: Prazo máximo de entrega (P0: $le 3$ dias; P1: $le 2$ semanas).

### Dual Coding Visual
| Prioridade & Categoria | Prazo Máximo | Exemplo de Action Item |
|---|---|---|
| **P0 (Prevenção Crítica)** | 1 a 3 dias | Adicionar Circuit Breaker e timeout estrito de 2s |
| **P1 (Melhoria de Observabilidade)** | 1 a 2 semanas | Configurar alerta Multi-Window Multi-Burn-Rate |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Action Items Formatados
```text
Action Items do Incidente de Checkout:
├── [P0] [Prevenir] Adicionar linter de queries SQL no CI/CD (Dono: @carlos, Prazo: 3 dias).
├── [P0] [Mitigar] Habilitar rollback automático no Argo Rollouts se 5xx > 1% (Dono: @alice, Prazo: 2 dias).
└── [P1] [Detectar] Criar dashboard de saturação de pool de conexões (Dono: @bob, Prazo: 1 semana).
```

#### Key Takeaways
- Um Post-Mortem só é considerado concluído quando todos os Action Items P0 forem implementados e validados em ambiente de produção.

</details>
