---
id: SYS-LLD-CASES-001
title: "Low-Level Design: In-Memory Cache Thread-Safe com Expiração Ativa e Passiva"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::google
  - freq::high
---

## Pergunta
Como projetar um Cache em Memória Thread-Safe de alta performance com suporte a TTL e limpeza de chaves expiradas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estruturas de Dados Internas**:
  - `map[string]CacheItem`: Tabela hash para acesso em $O(1)$.
  - `sync.RWMutex` (ou sharding com múltiplos buckets) para permitir leituras concorrentes simultâneas (`RLock`).
- **Estratégias de Expiração de TTL**:
  1. **Expiração Passiva (Lazy Expiration)**: Ao executar `Get(key)`, verifica se `item.ExpiresAt < now`. Se expirado, remove e retorna *Miss*.
  2. **Expiração Ativa em Background (Active Purge)**: Uma goroutine roda periodicamente (ex: a cada 100 ms), sorteia 20 chaves aleatórias com TTL e purga as expiradas, evitando vazamento de memória para chaves que nunca mais são consultadas.

### Dual Coding Visual
| Mecanismo de Expiração | Gatilho | Finalidade |
|---|---|---|
| **Lazy (Passiva)** | Ocorre sob demanda na chamada `Get(key)` | Zero overhead enquanto a chave não for lida |
| **Active (Background)** | Loop periódico amostrando chaves aleatórias | Impede que chaves órfãs vazem memória RAM |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação Thread-Safe em Go
```go
package main

import (
  "sync"
  "time"
)

type Item struct {
  value     any
  expiresAt int64
}

type InMemoryCache struct {
  mu    sync.RWMutex
  items map[string]Item
}

func (c *InMemoryCache) Get(key string) (any, bool) {
  c.mu.RLock()
  item, found := c.items[key]
  c.mu.RUnlock()

  if !found { return nil, false }
  if item.expiresAt > 0 && time.Now().UnixMilli() > item.expiresAt {
    c.mu.Lock()
    delete(c.items, key) // Lazy purge
    c.mu.Unlock()
    return nil, false
  }
  return item.value, true
}
```

</details>
