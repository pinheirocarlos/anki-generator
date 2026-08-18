---
id: CS-OS-SYNC-003
title: "Read-Write Locks (RW-Lock) para Cenários Read-Heavy"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que é um **Read-Write Lock (RW-Lock)** e em que cenários de tráfego ele entrega maior throughput do que um Mutex exclusivo?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **RW-Lock (`RWMutex`)** desacopla o acesso concorrente em dois modos distintos:
  - **Leitura Compartilhada (`RLock` / `RUnlock`)**: Múltiplas threads leitoras podem segurar o lock simultaneamente em paralelo, desde que não haja nenhuma escritora ativa.
  - **Escrita Exclusiva (`Lock` / `Unlock`)**: Apenas 1 thread escritora por vez; bloqueia todas as outras leitoras e escritoras.
- **Cenário Ideal**: Cargas de trabalho com **alta taxa de leitura e baixa taxa de escrita** (ex: 95% leituras / 5% escritas em tabelas de cache e configurações).
- Em cenários com muitas escritas, o RW-Lock pode ter performance inferior a um Mutex simples devido ao overhead de manter contadores atômicos de leitores.

### Dual Coding Visual
| Modo do Lock | Múltiplos Leitores Simultâneos? | Escritores Simultâneos? |
|---|---|---|
| **RLock (Leitura)** | **Sim (Ilimitados)** | Não (Bloqueia novos escritores) |
| **Lock (Escrita)**  | Não (Bloqueia todos os leitores) | **Exatamente 1 (Exclusivo)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Cache Concorrente Seguro com RWMutex
```go
package main

import "sync"

type ThreadSafeCache struct {
  mu   sync.RWMutex
  data map[string]string
}

func (c *ThreadSafeCache) Get(key string) (string, bool) {
  c.mu.RLock() // 100 threads leem em paralelo sem bloquear umas às outras
  defer c.mu.RUnlock()
  val, ok := c.data[key]
  return val, ok
}

func (c *ThreadSafeCache) Set(key, val string) {
  c.mu.Lock() // Escrita exclusiva bloqueia leituras e escritas concorrentes
  defer c.mu.Unlock()
  c.data[key] = val
}
```

#### Key Takeaways
- Para evitar *Writer Starvation* (onde um fluxo contínuo de novos leitores impede eternamente a escritora de adquirir o lock), implementações modernas de RW-Lock priorizam novos escritores.

</details>
