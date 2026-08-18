---
id: BEH-LEAD-FAILURE-001
title: "Estrutura Formal de um Documento de Incident Post-Mortem / RCA SRE"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Quais são as seções estruturais obrigatórias de um documento formal de **Incident Post-Mortem / RCA** no padrão Google SRE?

## Resposta
### Quick Answer
**Solução Direta**:
- **Seções Obrigatórias do Documento**:
  1. **Sumário Executivo & Métricas de Impacto**: Duração do outage, % de requisições afetadas, faturamento perdido e impacto no Error Budget do SLO.
  2. **Timeline Detalhada (UTC)**: Linha cronológica minuto a minuto da detecção, triagem, mitigação e resolução final.
  3. **Causa-Raiz vs Fatores Contribuintes**: Distinção entre o gatilho imediato (*trigger*) e a vulnerabilidade estrutural de fundo.
  4. **O que Funcionou Bem vs O que Falhou**: Avaliação do monitoramento e resposta da equipe.
  5. **Action Items SMART (P0/P1)**: Tarefas com donos nominais e prazos estritos para prevenção de reincidência.

### Dual Coding Visual
| Seção do Post-Mortem | Finalidade | Exemplo de Conteúdo |
|---|---|---|
| **Impacto no SLO** | Mensurar o prejuízo real | *"Disponibilidade caiu para 98.4% por 25 min"* |
| **Timeline (UTC)** | Identificar atrasos de resposta | *"14:02 Alerta disparou $	o$ 14:15 Rollback concluído"* |
| **Action Items** | Evitar repetição do erro | *"[P0] Adicionar Circuit Breaker (Dono: Alice, 3 dias)"* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Modelo de Post-Mortem em Markdown
```text
# Post-Mortem: Indisponibilidade no Gateway de Pagamentos [2026-08-18]
- Impacto: 12.000 transações afetadas (HTTP 504) durante 20 minutos.
- Timeline: 10:00 Deploy v2.1 ➔ 10:03 Alerta ➔ 10:12 Rollback ➔ 10:20 Estabilizado.
- Causa Raiz: Timeout HTTP do parceiro adquirente configurado para 60s em vez de 2s.
- Action Items: [P0] Reduzir timeout para 2000ms com Circuit Breaker (@carlos, 2 dias).
```

#### Key Takeaways
- O documento de Post-Mortem é uma ferramenta de aprendizado e governança técnica que transforma incidentes em blindagem para toda a organização.

</details>
