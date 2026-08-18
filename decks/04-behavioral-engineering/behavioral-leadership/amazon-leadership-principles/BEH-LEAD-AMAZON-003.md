---
id: BEH-LEAD-AMAZON-003
title: "Decisões One-Way Door vs Two-Way Door no Framework de Decisão da Amazon"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença operacional entre decisões **One-Way Door (Tipo 1)** e **Two-Way Door (Tipo 2)** no framework de tomada de decisões da Amazon?

## Resposta
### Quick Answer
**Solução Direta**:
- **Decisões One-Way Door (Tipo 1 - Porta de Sentido Único)**:
  - Decisões irreversíveis ou com custo quase proibitivo de reversão (ex: escolha do banco de dados relacional vs NoSQL core, protocolo base de comunicação da empresa, contrato de segurança).
  - *Abordagem*: Exigem *Dive Deep*, análise matemática/estatística detalhada, múltiplos reviews e cautela máxima.
- **Decisões Two-Way Door (Tipo 2 - Porta de Vaivém)**:
  - Decisões facilmente reversíveis caso a hipótese se mostre incorreta (ex: teste A/B de UI, ajuste de parâmetros de cache, criação de feature flags).
  - *Abordagem*: Exigem *Bias for Action*, rapidez e experimentação com dados parciais (~70% de certeza).

### Dual Coding Visual
| Tipo de Porta | Reversibilidade | Abordagem Recomendada |
|---|---|---|
| **One-Way (Tipo 1)** | Praticamente irreversível | Deliberação profunda, RFC formal e cautela |
| **Two-Way (Tipo 2)** | Facilmente reversível | Decisão rápida, experimentação e *Bias for Action* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Classificação Prática em Engenharia Backend
```text
Tipo 1 (One-Way): "Migrar todo o storage de pedidos de PostgreSQL para Cassandra."
└── Requer PoC exaustiva, análise de consistência e aprovação de Staff Engineers.

Tipo 2 (Two-Way): "Habilitar compressão Gzip em endpoint REST com feature flag."
└── Testar em 5% dos usuários; se aumentar CPU além do limite, desativar flag em 1s.
```

#### Key Takeaways
- Tratar todas as decisões como Tipo 1 gera paralisia por análise; tratar decisões Tipo 1 como Tipo 2 gera desastres arquiteturais. O discernimento do tipo de porta é marca de senioridade.

</details>
