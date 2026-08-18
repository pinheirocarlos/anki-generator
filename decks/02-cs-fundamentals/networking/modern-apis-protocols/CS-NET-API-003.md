---
id: CS-NET-API-003
title: "Resolução de Over-fetching e Under-fetching com GraphQL"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
Como o **GraphQL** resolve os problemas clássicos de *Over-fetching* e *Under-fetching* comuns em APIs RESTful?

## Resposta
### Quick Answer
**Solução Direta**:
- **Over-fetching**: Ocorre em REST quando um endpoint retorna um objeto com 50 campos, mas o cliente móvel só precisa de 2 campos (ex: `name` e `avatar`), desperdiçando dados e bateria.
  - *Solução GraphQL*: O cliente envia uma query declarativa especificando **exatamente os campos desejados**, e o servidor retorna apenas esses campos.
- **Under-fetching (Problema $N+1$ de Rede)**: Ocorre em REST quando uma tela precisa de dados relacionados e é forçada a fazer múltiplos roundtrips sequenciais (ex: `/users/1`, depois `/users/1/orders`, depois `/orders/10/items`).
  - *Solução GraphQL*: Uma **única requisição HTTP** recupera toda a árvore de dados aninhados em 1 único RTT.

### Dual Coding Visual
| Problema em REST | Sintoma em Clientes Móveis | Resolução com GraphQL |
|---|---|---|
| **Over-fetching** | Baixa 100 KB de JSON para usar 2 KB | Query solicita apenas campos necessários |
| **Under-fetching** | 4 roundtrips HTTP em sequência para montar 1 tela | 1 única query aninhada resolve todo o grafo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Query GraphQL Aninhada
```text
query GetUserProfile {
  user(id: "123") {
    name
    email
    orders(limit: 3) {
      id
      total
      items {
        productName
      }
    }
  }
}
```

#### O Trade-off: Complexidade no Backend (Problema N+1 de Banco)
- Se não for protegido com a técnica de **DataLoader** (que agrupa IDs e faz batching com `IN (?, ?, ?)`), o GraphQL pode disparar centenas de queries individuais ao banco de dados no backend para resolver árvores aninhadas.

#### Key Takeaways
- GraphQL transfere a flexibilidade de composição de dados para o cliente frontend, enquanto REST mantém endpoints estáticos com caching de HTTP público simplificado em CDNs.

</details>
