---
id: BEH-SEC-DEPLOY-000
title: "Rolling Update vs Blue-Green Deployment: Operação, Custo e Velocidade de Rollback"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::meta
  - freq::high
---

## Pergunta
Qual é a distinção operacional, custo de infraestrutura e velocidade de rollback entre **Rolling Update** e **Blue-Green Deployment**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Rolling Update (Substituição Gradual)**:
  - Atualiza instâncias em lotes incrementais (ex: 2 pods por vez em um total de 10).
  - *Custo*: Baixo ($1	imes$), sem necessidade de duplicar infraestrutura.
  - *Rollback*: Moderado (exige novo rolling update reverso).
  - *Atenção*: As versões antiga e nova convivem ativas por vários minutos.
- **Blue-Green Deployment (Comutação Total de Ambientes)**:
  - Mantém dois ambientes completos idênticos: **Blue (Ativo)** e **Green (Novo com a nova versão)**.
  - O Load Balancer comuta 100% do tráfego para o ambiente Green instantaneamente.
  - *Custo*: Alto ($2	imes$ durante o deploy).
  - *Rollback*: Instantâneo (basta comutar o tráfego de volta para o Blue).

### Dual Coding Visual
| Estratégia | Custo de Infra | Velocidade de Rollback |
|---|---|---|
| **Rolling Update** | $1	imes$ (Zero custo extra) | Moderada (requer rollout reverso) |
| **Blue-Green** | $2	imes$ (Ambiente duplicado) | **Instantânea (< 1 segundo)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comutação no Load Balancer (Blue-Green)
```text
Antes do Deploy:
[Load Balancer] ──(100% Tráfego)──► [Ambiente BLUE (v1.0)]  |  [Ambiente GREEN (v2.0 em Teste)]

Após Homologação do Green:
[Load Balancer] ──(100% Tráfego)──► [Ambiente GREEN (v2.0)] |  [Ambiente BLUE (v1.0 Standby)]
```

#### Key Takeaways
- Rolling Update é a escolha padrão em Kubernetes por economia de recursos; Blue-Green é ideal para aplicações críticas onde o rollback instantâneo é mandatário.

</details>
