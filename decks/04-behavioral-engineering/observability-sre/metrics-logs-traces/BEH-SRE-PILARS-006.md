---
id: BEH-SRE-PILARS-006
title: "Intuição Fundamental da Observabilidade: A Tríade de Métricas, Logs e Traces"
tags:
  - level::l2-fundamental
  - topic::behavioral::observability-sre
  - company::datadog
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás dos 3 Pilares da Observabilidade (Métricas, Logs e Traces) e como eles se complementam na investigação de problemas?

## Resposta
### Quick Answer
**Solução Direta**:
- Observabilidade não é apenas monitorar alertas; é a capacidade de **deduzir o estado interno de um sistema a partir de suas saídas externas**:
  - **Métricas ("Algo está quebrado e onde?")**: Dados numéricos agregados ao longo do tempo (ex: CPU em 92%, taxa de erro HTTP 5xx em 4.5%). Extremamente baratas de armazenar e perfeitas para alertas rápidos.
  - **Traces ("Qual microsserviço causou a lentidão no caminho?")**: Rastreiam a jornada completa de uma requisição distribuída através de dezenas de microsserviços e bancos via `TraceId` e `SpanId`.
  - **Logs ("Qual foi o erro exato e a mensagem de exceção?")**: Registro detalhado e textual com contexto contextualizado e `TraceId` associado (ex: `NullPointerException` ao parsear payload).

### Dual Coding Visual
<svg viewBox="0 0 600 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="220" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Fluxo de Diagnóstico dos 3 Pilares da Observabilidade</text>

  <!-- Pilar 1: Métricas -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="160" height="115" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="80" y="24" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">1. Métricas (Alerta)</text>
    <text x="80" y="46" fill="#f8fafc" font-size="10" text-anchor="middle">O que está acontecendo?</text>
    <text x="80" y="66" fill="#64748b" font-size="9" text-anchor="middle">Séries Temporais Numéricas</text>
    <text x="80" y="82" fill="#64748b" font-size="9" text-anchor="middle">Baixo Custo / Alta Retenção</text>
    <text x="80" y="100" fill="#3b82f6" font-size="9" font-weight="bold" text-anchor="middle">Ex: Taxa 500 subiu para 8%</text>
  </g>

  <!-- Pilar 2: Traces -->
  <g transform="translate(220, 45)">
    <rect x="0" y="0" width="160" height="115" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="80" y="24" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">2. Traces (Isolamento)</text>
    <text x="80" y="46" fill="#ffffff" font-size="10" text-anchor="middle">Onde está o gargalo?</text>
    <text x="80" y="66" fill="#34d399" font-size="9" text-anchor="middle">Grafo de Spans Distribuídos</text>
    <text x="80" y="82" fill="#34d399" font-size="9" text-anchor="middle">Caminho da Requisição</text>
    <text x="80" y="100" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Ex: Latência no PaymentService</text>
  </g>

  <!-- Pilar 3: Logs -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="160" height="115" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="8" />
    <text x="80" y="24" fill="#fde68a" font-size="12" font-weight="bold" text-anchor="middle">3. Logs (Causa Raiz)</text>
    <text x="80" y="46" fill="#f8fafc" font-size="10" text-anchor="middle">Por que falhou?</text>
    <text x="80" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">Eventos Estruturados (JSON)</text>
    <text x="80" y="82" fill="#fbbf24" font-size="9" text-anchor="middle">Stack Trace &amp; Contexto</text>
    <text x="80" y="100" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">Ex: Database timeout em query X</text>
  </g>

  <!-- Conectores -->
  <text x="195" y="105" fill="#475569" font-size="16" font-weight="bold">→</text>
  <text x="385" y="105" fill="#475569" font-size="16" font-weight="bold">→</text>

  <text x="300" y="185" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Métricas detectam a anomalia; Traces isolam o serviço; Logs revelam o erro exato.</text>
</svg>

| Pilar | Tipo de Dado | Função Central no Diagnóstico |
|---|---|---|
| **Métricas** | Séries temporais numéricas | Detectam a anomalia e geram alertas imediatos com baixo custo |
| **Traces** | Grafos de spans (`TraceId`) | Isolam o microsserviço ou dependência causadora da lentidão |
| **Logs** | Texto / JSON estruturado | Revelam o erro exato e a stack trace com contexto completo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Poder do Context Propagation (OpenTelemetry)
A mágica da observabilidade moderna ocorre quando os 3 pilares estão correlacionados:
1. O usuário recebe erro 500 no checkout.
2. A métrica dispara um alerta no Slack informando aumento de erros no gateway.
3. O engenheiro abre o dashboard de APM e localiza um Trace lento no serviço de faturamento.
4. O `TraceId` está automaticamente injetado nos Logs estruturados daquele container (`trace_id=abc123xyz`), permitindo filtrar instantaneamente a linha exata de código que disparou a exceção.

#### Key Takeaways
- Nenhum pilar sozinho resolve o problema de observabilidade: métricas alertam, traces isolam e logs explicam.

</details>
