---
id: SYS-CACHE-ANOMALIES-000
title: "Cache Stampede (Thundering Herd) e Mitigação via Mutex Lock / Probabilistic Early Expiration"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::meta
  - freq::high
---

## Pergunta
O que é o fenômeno Cache Stampede (Thundering Herd) que ocorre após a expiração de uma chave quente e como mitigá-lo com Singleflight / XFetch?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache Stampede**: Quando uma chave de cache altamente requisitada (Hot Key, ex: 50.000 QPS) expira, milhares de requisições simultâneas sofrem *Cache Miss* no mesmo instante e disparam a mesma query pesada contra o banco de dados, derrubando o banco primário.
- **Mitigações Comprovadas**:
  1. **Mutex Lock / Singleflight (Go `singleflight`)**: Apenas uma única goroutine/thread adquire permissão para consultar o banco e recalcular o cache; todas as demais requisições aguardam e compartilham o mesmo resultado.
  2. **Expiração Antecipada Probabilística (XFetch Algorithm)**: O cliente recalcula o valor antes da expiração com probabilidade crescente à medida que o TTL se aproxima do fim:
     $$\Delta - \beta \cdot \ln(\text{rand}()) > \text{TTL}$$

### Dual Coding Visual
| Estratégia contra Stampede | Mecânica | Impacto no Banco de Dados |
|---|---|---|
| **Sem Proteção (Ingênuo)** | 50.000 requisições batem no DB ao expirar | Queda imediata do banco de dados |
| **Mutex / Singleflight** | 1 requisição bate no DB; 49.999 aguardam na RAM | Carga estável de exatamente 1 query |
| **XFetch (Probabilístico)** | Recálculo em background antes de expirar | Zero downtime e zero Cache Miss |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go com `singleflight.Group`
```go
package main

import "golang.org/x/sync/singleflight"

var g singleflight.Group

func GetData(key string) (string, error) {
  // Se 10.000 goroutines chamarem GetData(key) simultaneamente, a função anônima roda 1 vez
  v, err, _ := g.Do(key, func() (interface{}, error) {
    return fetchFromDatabase(key)
  })
  return v.(string), err
}
```

</details>
