---
id: BEH-SRE-CHAOS-005
title: "Controle de Blast Radius e Mecanismos de Parada de Emergência em Chaos Testing"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
Como mitigar e limitar o **Raio de Explosão (Blast Radius)** ao executar testes de injeção de falhas controladas em ambientes de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estratégias de Contenção de Blast Radius**:
  1. **Evolução Gradual de Ambientes**: Executar o teste primeiro em staging, depois em canary/ambiente de pré-produção e, finalmente, em produção.
  2. **Segmentação Mínima de Instâncias**: Injetar a falha em apenas 1 pod ou em uma fração mínima de tráfego de usuários sintéticos (ex: 1%).
  3. **Botão de Parada de Emergência (Dead Man's Switch)**: Automação que aborta imediatamente a injeção de falha e executa rollback se o Error Budget do SLO atingir um limiar de alerta.

### Dual Coding Visual
| Mecanismo de Proteção | Função Técnica | Ação em Caso de Anomalia |
|---|---|---|
| **Canary Ingestion** | Limita falha a pequena % de tráfego | Isola impacto de usuários reais |
| **Dead Man's Switch** | Monitora violação de SLO em tempo real | Aborta o experimento instantaneamente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo de Segurança em Testes de Chaos em Produção
```text
┌─────────────────────────────────┐
│ 1. Checa Saldo de Error Budget  │ ──► Se Budget < 20%: Aborta experimento!
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 2. Injeta Falha em 1% do Tráfego│
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 3. Monitora Steady State (Real) │ ──► Se Latência > Limiar: Rollback Imediato!
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 4. Conclusão Segura do Teste    │
└─────────────────────────────────┘
```

#### Key Takeaways
- Chaos Engineering responsável opera com guardrails rigorosos de segurança que protegem a experiência dos clientes acima de tudo.

</details>
