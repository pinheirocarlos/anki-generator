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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LLD Case Study: Cache Thread-Safe em Memória com TTL e Evicção LRU</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estrutura Concorrente: sync.RWMutex + Map + Doubly-Linked List</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="55" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">RLock() para Get(key)</text>
      <text x="85" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Múltiplos leitores concorrentes</text>

      <rect x="195" y="0" width="170" height="55" rx="4" fill="#78350f"/>
      <text x="280" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Lock() para Set/Evict</text>
      <text x="280" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Escrita exclusiva O(1)</text>

      <rect x="390" y="0" width="170" height="55" rx="4" fill="#065f46"/>
      <text x="475" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Cleanup Goroutine</text>
      <text x="475" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Purga chaves expiradas por TTL</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Sharded Cache (ex: 32 partições de locks independentes) reduz contenção de threads em 96%.</text>

</svg>
<p>Visualização: Cache em memória com mutex RWMutex, limpeza ativa de chaves expiradas por worker em background e evicção LRU.</p>

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
