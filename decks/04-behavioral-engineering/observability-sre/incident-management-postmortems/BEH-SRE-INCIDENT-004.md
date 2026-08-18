---
id: BEH-SRE-INCIDENT-004
title: "Condução Prática da Análise 5 Whys em Incidentes Críticos de Infraestrutura"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como conduzir a técnica dos **5 Whys** em incidentes de infraestrutura para rastrear a causa-raiz sistêmica subjacente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Condução Passo a Passo dos 5 Porquês**:
  - *1º Por quê*: Qual foi a falha imediata? (Ex: *O pod de pagamento encerrou por OOM*).
  - *2º Por quê*: Por que faltou memória? (Ex: *Uma resposta JSON gigante de 50MB foi desserializada em memória*).
  - *3º Por quê*: Por que a resposta foi tão grande? (Ex: *A query do banco retornou todos os registros sem paginação*).
  - *4º Por quê*: Por que não havia paginação? (Ex: *A API legada não tinha limite máximo de tamanho de página imposto*).
  - *5º Por quê (Causa Raiz)*: Por que isso foi aceito em produção? (Ex: *Não havia linter ou contrato de schema OpenAPI validando limites de payload no CI*).

### Dual Coding Visual
| Nível do Porquê | Resposta Identificada | Categoria de Falha |
|---|---|---|
| **1-2** | OOM e payload gigante | Sintoma operacional e consumo de recursos |
| **3-4** | Query sem paginação | Falha de implementação no código |
| **5 (Raiz)** | Ausência de linter de API no CI | **Falha de Governança e Processo** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Ação Corretiva Derivada do 5º Porquê
```text
Causa Raiz: Ausência de limite obrigatório de paginação em contratos de API.
├── Ação Preventiva 1: Adicionar middleware global impondo max_limit=100 em todas as APIs.
└── Ação Preventiva 2: Adicionar teste automatizado no CI rejeitando endpoints sem paginação.
```

#### Key Takeaways
- A análise dos 5 Whys garante que o time ataque as raízes institucionais e processuais dos problemas, evitando soluções paliativas.

</details>
