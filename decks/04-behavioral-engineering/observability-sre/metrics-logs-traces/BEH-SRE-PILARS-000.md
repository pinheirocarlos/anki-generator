---
id: BEH-SRE-PILARS-000
title: "Os 3 Pilares da Observabilidade: Perguntas Respondidas por Métricas, Logs e Traces"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
O que são os **3 Pilares da Observabilidade (Metrics, Logs e Distributed Tracing)** e qual a pergunta essencial que cada um responde?

## Resposta
### Quick Answer
**Solução Direta**:
- **Os 3 Pilares**:
  1. **Métricas (Dados Numéricos Agregados)**: Respondem **SE** há um problema no sistema (ex: *taxa de erro 5xx subiu para 7%*, *utilização de CPU em 95%*). Baixíssimo custo de armazenamento.
  2. **Logs (Eventos Textuais Estruturados em JSON)**: Respondem **O QUE** aconteceu em um evento específico com detalhes de contexto (ex: *stack trace de NullPointerException*, *ID de usuário*).
  3. **Distributed Traces (Árvores de Spans com Trace ID)**: Respondem **ONDE** na cadeia de microsserviços ocorreu o gargalo ou a lentidão.

### Dual Coding Visual
| Pilar | Pergunta Respondida | Volume de Dados & Custo |
|---|---|---|
| **Métricas** | *"O sistema está saudável ou degradado?"* | Baixo (dados agregados) |
| **Logs** | *"O que exatamente ocorreu neste evento?"* | Alto (texto contextual em JSON) |
| **Traces** | *"Onde na malha distribuída ocorreu a lentidão?"* | Médio/Alto (controlado por sampling) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Analogia Médica dos 3 Pilares
```text
Diagnóstico Clínico de Sistemas:
├── Métricas = Termômetro e Medidor de Pressão (alertam sobre febre em tempo real).
├── Logs = Prontuário Médico Detalhado (registram sintomas específicos e histórico).
└── Tracing = Ressonância Magnética com Contraste (revela o ponto exato da obstrução).
```

#### Key Takeaways
- Nenhum pilar substitui os outros: métricas geram alertas rápidos, traces localizam o serviço culpado e logs revelam o motivo raiz do erro no código.

</details>
