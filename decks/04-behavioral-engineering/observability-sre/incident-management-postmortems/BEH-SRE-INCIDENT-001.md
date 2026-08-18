---
id: BEH-SRE-INCIDENT-001
title: "Estrutura e Seções Obrigatórias de um Post-Mortem SRE"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Quais são os elementos e seções essenciais de um documento de **Post-Mortem Sem Culpa (Blameless Post-Mortem)** no padrão Google SRE?

## Resposta
### Quick Answer
**Solução Direta**:
- **Seções Fundamentais do Post-Mortem**:
  1. **Executive Summary & Impacto**: Resumo executivo, tempo total de downtime e métricas financeiras ou de SLO violadas.
  2. **Timeline Detalhada em UTC**: Linha do tempo minuto a minuto cobrindo detecção, escalada, mitigação e resolução.
  3. **Root Cause Analysis (RCA) com 5 Whys**: Análise aprofundada da falha estrutural subjacente.
  4. **Lessons Learned**: O que funcionou bem, o que deu errado e onde o time teve sorte.
  5. **Action Items SMART (P0/P1)**: Tarefas com donos nominais e prazos para eliminar a possibilidade de reincidência.

### Dual Coding Visual
| Seção | Finalidade Principal | Exemplo de Conteúdo |
|---|---|---|
| **Impacto no Negócio** | Quantificar o dano real | *$35k em pedidos afetados, 28 minutos de queda* |
| **Timeline (UTC)** | Avaliar eficiência de resposta | *14:02 Alerta $	o$ 14:08 War Room $	o$ 14:15 Rollback* |
| **Action Items** | Prevenir novas falhas | *Adicionar timeout de 2s e Circuit Breaker no cliente* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Estrutura de Documento
```text
# Incident Post-Mortem: Queda no Serviço de Autenticação [2026-08-18]
- **Duração**: 22 minutos (11:00 às 11:22 UTC)
- **Impacto**: 5.400 tentativas de login rejeitadas (HTTP 500).
- **Causa Raiz**: Certificado TLS expirado em um dos pods de federação.
- **Action Items**:
  - [P0] Automatizar rotação de certificados via Cert-Manager (@alice, 2 dias).
  - [P1] Criar alerta de expiração de certificados com 30 dias de antecedência (@bob, 5 dias).
```

#### Key Takeaways
- O Post-Mortem é um investimento institucional em confiabilidade que assegura a evolução contínua da arquitetura sociotécnica da organização.

</details>
