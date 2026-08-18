---
id: BEH-SRE-INCIDENT-002
title: "Papéis e Responsabilidades no War Room: Incident Commander, Ops Lead e Comms Lead"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Quais são as responsabilidades específicas dos papéis de **Incident Commander (IC)**, **Operations Lead** e **Communications Lead** em um War Room de crise?

## Resposta
### Quick Answer
**Solução Direta**:
- **Incident Commander (IC)**:
  - Comanda a sala de crise, mantém a calma, delega tarefas técnicas e toma decisões estratégicas (ex: autorizar rollback).
  - **Regra de Ouro**: O IC **não programa ou executa comandos diretamente** para não perder a visão macro do incidente.
- **Operations / Tech Lead**:
  - Engenheiro sênior responsável por diagnosticar o sistema, analisar traces e executar ações de mitigação aprovadas pelo IC.
- **Communications Lead**:
  - Atualiza a Status Page externa, gerentes de produto e times de suporte, blindando os engenheiros operacionais de interrupções.

### Dual Coding Visual
| Papel no War Room | Responsabilidade Principal | O que NUNCA Deve Fazer |
|---|---|---|
| **Incident Commander** | Orquestrar time e definir prioridades | Não codar ou rodar comandos na hora |
| **Operations Lead** | Diagnóstico técnico e mitigação | Não responder stakeholders externos |
| **Communications Lead** | Atualizar Status Page e suporte | Não alterar infraestrutura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dinâmica de Comunicação em Crise
```text
Stakeholders Externos ◄─── Comms Lead ◄───┐
                                          │
Incident Commander (Comando Estratégico) ─┴─► Operations Lead (Execução Técnica)
```

#### Key Takeaways
- A divisão clara de papéis em momentos de crise evita confusão, reduz ruídos de comunicação e diminui drasticamente o MTTR.

</details>
