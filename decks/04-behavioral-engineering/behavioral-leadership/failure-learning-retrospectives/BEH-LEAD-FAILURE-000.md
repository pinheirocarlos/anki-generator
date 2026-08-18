---
id: BEH-LEAD-FAILURE-000
title: "Cultura de Blameless Post-Mortem no Modelo Google SRE"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
O que é o princípio de **Blameless Post-Mortem (Pós-Morte sem Culpa)** na cultura Google SRE e por que culpar indivíduos prejudica a confiabilidade dos sistemas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Premissa Sistêmica Fundamental**: Seres humanos cometem erros involuntários. Se um engenheiro conseguiu derrubar a produção com um comando ou commit, a causa raiz **não é a pessoa**, mas sim uma **lacuna no sistema, processos, testes ou automações** que permitiu tal ação.
- **Danos da Cultura de Culpa**: Punir pessoas gera medo, encobrimento de incidentes e lentidão operacional.
- **Benefícios da Abordagem Sem Culpa**: Incentiva a transparência imediata, colaboração psicológica segura e criação de defesas sistêmicas duradouras contra reincidências.

### Dual Coding Visual
| Abordagem Punitiva | Abordagem Blameless SRE | Consequência no Sistema |
|---|---|---|
| *"Quem executou o comando errado?"* | *"Qual guardrail faltou para impedir o comando?"* | Eliminação da causa estrutural |
| Advertência individual | Testes automatizados e rollbacks | Redução contínua do MTTR |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Postura SRE Diante de Falhas Humanas
```text
Incidente: Engenheiro apagou tabela de produção por engano.
├── Reação Punitiva (Errada): Demitir o engenheiro (o sistema continua vulnerável).
└── Reação Blameless SRE (Correta):
    ├── Remover permissão de DROP direta no banco de produção.
    ├── Implementar soft-delete e backup com PITR (Point-in-Time Recovery).
    └── Adicionar confirmação em duas etapas na CLI de administração.
```

#### Key Takeaways
- Um sistema verdadeiramente confiável é resiliente a erros humanos normais através de guardrails de arquitetura e automações de proteção.

</details>
