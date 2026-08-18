---
id: BEH-LEAD-FAILURE-002
title: "Aplicação da Técnica dos 5 Porquês (5 Whys) para Identificação de Causas-Raiz Sistêmicas"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como aplicar a técnica dos **5 Porquês (5 Whys)** para rastrear a causa-raiz sistêmica de um incidente de produção além de falhas superficiais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito dos 5 Whys**: Consiste em aprofundar recursivamente a pergunta *"Por que isso aconteceu?"* para ultrapassar o sintoma superficial e revelar a deficiência estrutural em processos, testes ou arquitetura.
- **Passo a Passo da Cadeia Causal**:
  - 1º Por quê: Identifica a falha imediata no software.
  - 2º e 3º Por quês: Identificam a mecânica técnica do erro.
  - 4º e 5º Por quês: Identificam a ausência de testes, guardrails ou processos de governança que permitiram o bug chegar à produção.

### Dual Coding Visual
| Nível do "Por quê?" | Análise do Incidente | Camada de Causalidade |
|---|---|---|
| **1. Por que caiu?** | Pool de conexões do banco esgotou | Sintoma operacional imediato |
| **3. Por que esgotou?** | Query pesada sem índice executou Full Scan | Causa técnica direta |
| **5. Por que foi a prod?** | Ausência de linter de migrações no CI/CD | **Causa-Raiz Sistêmica** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Completo de Análise 5 Whys
```text
Incidente: O banco de produção atingiu 100% de CPU e travou por 15 minutos.
├── 1. Por que? O pool de conexões do PostgreSQL esgotou.
├── 2. Por que? Uma query de relatórios levou 45 segundos para responder.
├── 3. Por que? A query fazia full scan na tabela de 80 milhões de usuários.
├── 4. Por que? A migração que criava o índice composto não foi executada no deploy.
└── 5. Por que (Causa Raiz)? O deploy de migrations era um script manual sem validação no CI.
    └── Ação Preventiva Definitiva: Integrar ferramenta automatizada de migrações na esteira de CI/CD.
```

#### Key Takeaways
- A técnica dos 5 Whys evita correções superficiais que apenas mascaram o problema e conduz a automações de qualidade que blindam a arquitetura.

</details>
