---
id: BEH-SEC-PYRAMID-004
title: "O Comando can-i-deploy do Pact Broker como Quality Gate de CI/CD"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
Como o comando **`can-i-deploy`** do Pact Broker atua como portão de qualidade (*Quality Gate*) automatizado na esteira de CI/CD para impedir quebras de API em produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Funcionamento do `can-i-deploy`**:
  - Antes de promover qualquer nova versão para o ambiente de produção, a esteira de CI/CD executa a CLI do Pact:
    `pact-broker can-i-deploy --pacticipant OrderService --version 2.4.0 --to-environment production`
  - A ferramenta consulta a matriz de compatibilidade do Pact Broker.
  - **Decisão do Gate**:
    - Se todos os contratos com consumidores ativos em produção estiverem verificados com sucesso: **Deploy Aprovado ✅**.
    - Se houver qualquer contrato incompatível ou não verificado: **Deploy Bloqueado com Código de Saída 1 ❌**.

### Dual Coding Visual
| Resultado da Matriz | Ação do `can-i-deploy` | Efeito na Esteira de CI/CD |
|---|---|---|
| **Compatível com 100% dos Clientes** | Retorna código `0` | Pipeline prossegue com o deploy |
| **Quebra contrato de cliente ativo** | Retorna código `1` | Pipeline aborta e impede outage |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Step de CI/CD (GitHub Actions)
```yaml
- name: Check Contract Compatibility
  run: |
    pact-broker can-i-deploy       --broker-base-url https://pact.empresa.com       --broker-token ${{ secrets.PACT_BROKER_TOKEN }}       --pacticipant PaymentService       --version ${{ github.sha }}       --to-environment production
```

#### Key Takeaways
- O comando `can-i-deploy` é o guardrail definitivo para garantir que nenhuma alteração incompatível de API seja lançada em produção.

</details>
