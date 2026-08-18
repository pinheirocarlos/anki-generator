---
id: SYS-FND-FRAMEWORK-000
title: "Framework de Entrevista de System Design em 4 Etapas"
tags:
  - level::l3-junior
  - topic::sys::foundations
  - company::google
  - freq::high
---

## Pergunta
Qual é o framework padrão em 4 etapas utilizado para estruturar uma entrevista de System Design em 45 minutos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Etapa 1: Clarificação de Requisitos e Escopo (3-5 min)**: Delimitar requisitos funcionais (casos de uso principais) e não-funcionais (QPS, latência p99, disponibilidade, consistência).
- **Etapa 2: Estimativas de Ordem de Grandeza (3-5 min)**: Calcular QPS de leitura/escrita, largura de banda e storage para 5 anos.
- **Etapa 3: Design de Alto Nível (10-15 min)**: Desenhar diagrama de blocos (Clients -> LB -> API Gateway -> Microservices -> Cache -> DB).
- **Etapa 4: Deep Dives e Gargalos (15-20 min)**: Tratar falhas parciais, estratégias de particionamento, replicação, concorrência e monitoramento.

### Dual Coding Visual
| Etapa do Framework | Duração Sugerida | Objetivo Central |
|---|---|---|
| **1. Requisitos & Escopo** | 5 min | Eliminar ambiguidades e definir metas |
| **2. High-Level Design** | 15 min | Estabelecer topologia ponta a ponta |
| **3. Deep Dive & Bottlenecks** | 20 min | Resolver trade-offs e falhas críticas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Erros Críticos a Evitar em Entrevistas FAANG
1. **Pular direto para o desenho**: Desenhar antes de definir requisitos funcionais leva à rejeição imediata.
2. **Monólogo**: Trate a entrevista como uma sessão colaborativa de arquitetura com um colega sênior.
3. **Ignorar Não-Funcionais**: Deixar de perguntar sobre tolerância a partição ou consistência (ex: ACID vs Eventual).

</details>
