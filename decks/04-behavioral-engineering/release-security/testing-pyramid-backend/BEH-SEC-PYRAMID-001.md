---
id: BEH-SEC-PYRAMID-001
title: "Princípios de Consumer-Driven Contract Testing (Pact) vs Esquemas Estáticos"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
O que é a filosofia de **Consumer-Driven Contract Testing (Pact)** e em que ela difere da validação estática de esquemas OpenAPI / JSON Schema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Filosofia Consumer-Driven**:
  - Em vez de o fornecedor (Provider) apenas publicar um catálogo estático amplo, cada serviço cliente (Consumer) declara formalmente **quais campos, formatos e respostas ele realmente usa e depende**.
  - Essas expectativas geram um arquivo de contrato (`pact.json`) executável.
- **Diferença para OpenAPI / JSON Schema Estático**:
  - Esquemas estáticos validam apenas tipos de dados teóricos.
  - Contract Testing com Pact valida **comportamento dinâmico real**: se o Provider alterar o nome de um campo usado pelo Consumer, o teste do Provider falha imediatamente no CI antes do deploy.

### Dual Coding Visual
| Abordagem | O que Valida | Ponto Fraco |
|---|---|---|
| **OpenAPI / JSON Schema** | Estrutura sintática de campos | Não sabe quais campos os clientes usam de fato |
| **Consumer-Driven (Pact)** | Dependência e comportamento real de uso | Exige integração contínua com o Pact Broker |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Vantagem do Consumer-Driven
```text
Cenário: Provider deseja remover o campo legado "telefone".
├── Com OpenAPI: Não sabe se algum dos 15 clientes ainda usa o campo.
└── Com Pact: Consulta a matriz do Pact Broker; se nenhum contrato usar "telefone",
    a remoção é segura; se algum usar, o build falha alertando o time.
```

#### Key Takeaways
- Consumer-Driven Contract Testing permite evolução independente de microsserviços com a segurança de testes integrados e a velocidade de testes locais.

</details>
