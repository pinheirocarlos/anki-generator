---
id: BEH-SRE-INCIDENT-006
title: "Intuição Fundamental da Gestão de Incidentes: Estancar a Sangria Primeiro e Investigar as Causas-Raiz Depois"
tags:
  - level::l2-fundamental
  - topic::behavioral::observability-sre
  - company::pagerduty
  - freq::high
---

## Pergunta
Qual é a intuição fundamental na condução de um incidente crítico de produção: priorizar mitigação imediata ou diagnóstico detalhado?

## Resposta
### Quick Answer
**Solução Direta**:
- Durante um incidente em produção com clientes impactados (Sev-1 / Sev-2), **a única prioridade é restaurar o serviço o mais rápido possível (Mitigação)**, e NÃO descobrir a causa exata naquele instante:
  - **Fase 1: Mitigação Imediata (Estancar a Sangria)**:
    - Fazer rollback da última versão lançada.
    - Reiniciar instâncias problemáticas ou escalar horizontalmente.
    - Acionar Circuit Breakers ou desligar features não-essenciais via Feature Flags (*Traffic Shedding*).
  - **Fase 2: Diagnóstico & Causa-Raiz (RCA - Após o Sistema Estar Seguro)**:
    - Com o tráfego normalizado e clientes protegidos, a equipe analisa logs, traces e dumps de memória salvos para conduzir a análise de **5 Porquês (5 Whys)**.

### Dual Coding Visual
<svg viewBox="0 0 600 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="220" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Protocolo de Resposta a Incidentes: Sala de Emergência</text>

  <!-- Fase Ativa -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="250" height="120" fill="#1e293b" stroke="#ef4444" stroke-width="2" rx="8" />
    <text x="125" y="24" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">DURANTE O INCIDENTE (Sev-1)</text>
    <text x="125" y="48" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🎯 FOCO TOTAL: MITIGAÇÃO</text>
    <text x="20" y="70" fill="#f87171" font-size="9">1. Rollback imediato da versão</text>
    <text x="20" y="86" fill="#f87171" font-size="9">2. Desligar feature flag instável</text>
    <text x="20" y="102" fill="#f87171" font-size="9">3. Escalar pods e drenar tráfego</text>
  </g>

  <!-- Fase Pós-Incidente -->
  <g transform="translate(320, 45)">
    <rect x="0" y="0" width="250" height="120" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="8" />
    <text x="125" y="24" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">APÓS A RESTAURAÇÃO (Pós-Incidente)</text>
    <text x="125" y="48" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🔍 FOCO TOTAL: ANÁLISE (5 WHYS)</text>
    <text x="20" y="70" fill="#34d399" font-size="9">1. Investigar logs e dumps com calma</text>
    <text x="20" y="86" fill="#34d399" font-size="9">2. Redigir post-mortem blameless</text>
    <text x="20" y="102" fill="#34d399" font-size="9">3. Implementar guardrails de prevenção</text>
  </g>

  <text x="300" y="190" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Analogia Médica: Primeiro estanca-se a hemorragia; a biópsia é feita depois que o paciente estabilizou.</text>
</svg>

| Fase do Incidente | Papel / Ação Esperada | Anti-padrão a Evitar |
|---|---|---|
| **Alerta & Triage** | Declarar o incidente, abrir a War Room e nomear o *Incident Commander* | Tentar consertar em segredo sem comunicar as partes |
| **Mitigação Ativa** | Aplicar rollback, alterar flags de rota ou reiniciar clusters | Ficar horas debugando código linha a linha enquanto usuários são afetados |
| **Pós-Mitigação** | Executar a técnica dos 5 Whys para achar falhas de arquitetura e processo | Encerrar o incidente sem criar planos de ação preventivos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Papel do Incident Commander (IC)
Em empresas de alta escala (PagerDuty, Google, AWS), a gestão de incidentes adota a estrutura de comando de bombeiros:
- O **Incident Commander (IC)** coordena a comunicação, delega hipóteses e garante que ninguém interfira na mitigação.
- Os **Technical Leads** executam as ações de rollback e isolamento.
- O **Communications Lead** atualiza o status page oficial para acalmar clientes e executivos.

#### Key Takeaways
- Nunca tente "consertar para frente" (*fix-forward*) em produção durante um outage grave a menos que o rollback seja impossível.
- A velocidade de retorno ao estado estável é a métrica primordial (MTTR - *Mean Time to Recovery*).

</details>
