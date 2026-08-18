---
id: BEH-SRE-SLI-005
title: "Implementação de Deploy Freeze Automatizado na Esteira CI/CD via Error Budget"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como implementar a governança de **Deploy Freeze automatizado** na esteira de CI/CD baseado no saldo restante de Error Budget?

## Resposta
### Quick Answer
**Solução Direta**:
- **Mecanismo de Bloqueio Automatizado no CI/CD**:
  1. **Etapa de Quality Gate no Pipeline**: Antes do job de deploy de produção, a esteira (GitHub Actions / GitLab CI) executa uma chamada à API do Prometheus/Datadog.
  2. **Consulta do Saldo de 30 Dias**: Calcula a disponibilidade observada nos últimos 30 dias rolantes contra o SLO acordado.
  3. **Decisão Automática**:
     - Se $	ext{Disponibilidade} ge 	ext{SLO}$: O deploy prossegue normalmente.
     - Se $	ext{Disponibilidade} < 	ext{SLO}$: O pipeline cancela o deploy com erro explicativo, permitindo apenas deploys marcados com a flag especial de `hotfix-p0`.

### Dual Coding Visual
| Condição no Pipeline | Ação no CI/CD | Notificação Gerada |
|---|---|---|
| **Error Budget $> 0$** | Deploy aprovado automaticamente | Notificação verde no canal de releases |
| **Error Budget $le 0$** | **Deploy bloqueado com código 1** | Alerta vermelho instruindo foco em confiabilidade |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Verificação em Step de GitHub Actions
```yaml
- name: Verify Error Budget Gate
  run: |
    AVAILABILITY=$(curl -s "http://prometheus:9090/api/v1/query?query=1-(sum(increase(http_requests_total%7Bstatus=~%225..%22%7D%5B30d%5D))/sum(increase(http_requests_total%5B30d%5D)))" | jq -r '.data.result[0].value[1]')
    SLO_TARGET=0.999
    if (( $(echo "$AVAILABILITY < $SLO_TARGET" | bc -l) )); then
      echo "❌ [DEPLOY FREEZE] Error Budget esgotado (Disponibilidade: $AVAILABILITY < SLO: $SLO_TARGET)."
      exit 1
    fi
    echo "✅ [APPROVED] Error Budget saudável: $AVAILABILITY"
```

#### Key Takeaways
- Automatizar o Deploy Freeze na esteira transforma as diretrizes de SRE em garantias executáveis que protegem a estabilidade do sistema sem depender de intervenções manuais.

</details>
