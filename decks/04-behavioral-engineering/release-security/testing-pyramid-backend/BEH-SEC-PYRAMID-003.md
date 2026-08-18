---
id: BEH-SEC-PYRAMID-003
title: "Fluxo de Verificação de Contratos entre Consumer e Provider com Pact Broker"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
Como funciona o fluxo de verificação de contratos entre pipelines CI/CD do Consumidor e do Provedor via **Pact Broker**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo em 3 Etapas**:
  1. **Consumer Pipeline**: O consumidor executa seus testes unitários contra o Mock Server do Pact. Ao passar, gera o arquivo `pact.json` e o publica no **Pact Broker**.
  2. **Webhook & Provider Verification**: O Pact Broker aciona a esteira do Provider via webhook. O Provider baixa os contratos e dispara requisições reais contra sua própria aplicação.
  3. **Publicação dos Resultados**: O Provider publica os resultados da validação de volta no Pact Broker, atualizando a matriz de compatibilidade de versões.

### Dual Coding Visual
| Etapa | Responsável | Ação Executada |
|---|---|---|
| **1. Publicação** | Pipeline do Consumidor | Envia contrato JSON para o Pact Broker |
| **2. Verificação** | Pipeline do Provedor | Valida endpoints reais contra o contrato |
| **3. Matriz** | Pact Broker | Registra se as versões são compatíveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura de Comunicação no CI/CD
```text
[Pipeline Consumer] ──(1. Publica Contrato)──► [Pact Broker]
                                                     ▲
[Pipeline Provider] ──(2. Executa Verificação)───────┘
         │
         └──► (3. Publica Resultado: Aprovado ✅ / Quebrado ❌)
```

#### Key Takeaways
- O Pact Broker atua como o registro central e orquestrador de compatibilidade de APIs entre times autônomos de microsserviços.

</details>
