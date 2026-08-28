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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">GraphQL: Solução para Over-fetching e Under-fetching</text>
  <g transform="translate(50, 48)">
    <!-- REST Issues -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">REST Clássico</text>
    <text x="135" y="44" fill="#fca5a5" font-size="10" text-anchor="middle">Over-fetching: Traz 50 campos quando precisa de 2</text>
    <text x="135" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">Under-fetching: Requer N chamadas sequenciais</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">GET /users/1 + GET /posts?user=1</text>

    <!-- GraphQL -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">GraphQL Query</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Cliente pede a forma exata dos dados</text>
    <text x="445" y="62" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">1 única requisição trazendo exatamente o necessário</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Atenção ao problema N+1 em resolvers (DataLoader)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Trade-off: GraphQL dificulta caching HTTP de borda (CDN) porque quase todas as requisições usam método POST.</text>

</svg>

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
