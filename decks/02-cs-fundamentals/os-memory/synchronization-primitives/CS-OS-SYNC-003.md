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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Read-Write Locks (sync.RWMutex) para Cargas Read-Heavy</text>
  <g transform="translate(50, 48)">
    <!-- Readers -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">RLock() Compartilhado (Múltiplos Leitores)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">N threads leem simultaneamente sem bloqueio mútuo</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Escala linearmente com o número de núcleos de CPU</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para: Caches in-memory e tabelas de roteamento</text>

    <!-- Writer -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="445" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Lock() Exclusivo (Escritor Único)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Bloqueia todos os leitores e todos os outros escritores</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Garante mutação segura sem inconsistência</text>
    <text x="445" y="76" fill="#f87171" font-size="9" text-anchor="middle">Atenção ao risco de Writer Starvation se leituras forem infinitas</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Se a proporção de leituras for &lt; 80%, um Mutex simples costuma ser mais rápido devido ao menor overhead atômico.</text>

</svg>
<p>Visualização: Funcionamento do Read-Write Lock permitindo múltiplos leitores simultâneos concorrentes e isolando escritas sob exclusividade estrita.</p>

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
