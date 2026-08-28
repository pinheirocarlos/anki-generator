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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Framework de 4 Etapas para Entrevistas de System Design (FAANG / Top Tech)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="135" height="115" rx="6" fill="#0284c7"/>
    <text x="67" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 1 (3-5 min)</text>
    <text x="67" y="48" fill="#e0f2fe" font-size="9" font-weight="bold" text-anchor="middle">Escopo &amp; Requisitos</text>
    <text x="67" y="70" fill="#bae6fd" font-size="8" text-anchor="middle">• Funcionais vs Não-Func</text>
    <text x="67" y="88" fill="#bae6fd" font-size="8" text-anchor="middle">• Escala (DAU, QPS, SLA)</text>
    <text x="67" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Esclarecer premissas</text>

    <rect x="155" y="0" width="135" height="115" rx="6" fill="#0369a1"/>
    <text x="222" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 2 (10-15 min)</text>
    <text x="222" y="48" fill="#e0f2fe" font-size="9" font-weight="bold" text-anchor="middle">High-Level Design</text>
    <text x="222" y="70" fill="#bae6fd" font-size="8" text-anchor="middle">• Diagrama de blocos</text>
    <text x="222" y="88" fill="#bae6fd" font-size="8" text-anchor="middle">• APIs &amp; Esquema de BD</text>
    <text x="222" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Fluxo ponta a ponta</text>

    <rect x="310" y="0" width="135" height="115" rx="6" fill="#065f46"/>
    <text x="377" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 3 (15-20 min)</text>
    <text x="377" y="48" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Design Deep Dive</text>
    <text x="377" y="70" fill="#a7f3d0" font-size="8" text-anchor="middle">• Gargalos específicos</text>
    <text x="377" y="88" fill="#a7f3d0" font-size="8" text-anchor="middle">• Algoritmos &amp; Caches</text>
    <text x="377" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Consistência &amp; Falhas</text>

    <rect x="465" y="0" width="135" height="115" rx="6" fill="#047857"/>
    <text x="532" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 4 (5 min)</text>
    <text x="532" y="48" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Wrap-up &amp; Escala</text>
    <text x="532" y="70" fill="#a7f3d0" font-size="8" text-anchor="middle">• Single Points of Failure</text>
    <text x="532" y="88" fill="#a7f3d0" font-size="8" text-anchor="middle">• Monitoramento &amp; SRE</text>
    <text x="532" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Resumo de trade-offs</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Conduza a entrevista como uma sessão de colaboração técnica entre pares de engenharia sênior.</text>

</svg>

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
