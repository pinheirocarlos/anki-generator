---
id: SYS-RES-RATELIMIT-003
title: "Arquitetura Distribuída de Rate Limiting: Centralizado vs Local com Batch Sync"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::stripe
  - freq::high
---

## Pergunta
Quais são os trade-offs de latência de I/O e precisão de quotas entre um Rate Limiter centralizado no Redis e limites locais com sincronização em lote?

## Resposta
### Quick Answer
**Solução Direta**:
- **Time Complexity**: $O(1)$
- **Space Complexity**: $O(1)$
- **Centralizado (Redis/Memcached)**:
  - Garante **consistência estrita** de quota global entre todos os servidores do cluster.
  - Custo: Adiciona $1\text{ a }5\text{ ms}$ de latência de rede em cada chamada na borda e torna o Redis um ponto único de contenção e falha (*SPOF*).
- **Híbrido Local com Reserva em Lote (Batch Token Reservation)**:
  - Cada instância de API Gateway avalia a requisição em memória local RAM ($< 1\ \mu\text{s}$).
  - A instância solicita antecipadamente "lotes" de tokens do Redis (ex: blocos de 50 tokens) e reporta o consumo de forma assíncrona em segundo plano.
  - Trade-off: Permite pequenas ultrapassagens temporárias da quota global (*Soft Limit*) em troca de imunidade a falhas de rede e throughput massivo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Topologias de Rate Limiting: Centralizado vs Híbrido com Batch Sync</text>

  <!-- Centralizado -->
  <g transform="translate(30, 48)">
    <rect x="0" y="0" width="290" height="120" rx="6" fill="#1e293b" stroke="#f87171" stroke-width="1.5"/>
    <text x="145" y="22" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">1. Centralizado Síncrono (Redis)</text>
    <rect x="15" y="36" width="115" height="40" rx="4" fill="#334155"/>
    <text x="72" y="54" fill="#cbd5e1" font-size="9" text-anchor="middle">Gateway / Pod</text>
    <text x="72" y="68" fill="#94a3b8" font-size="8" text-anchor="middle">Requisição chega</text>
    <text x="150" y="60" fill="#f87171" font-size="12" text-anchor="middle">→</text>
    <rect x="165" y="36" width="110" height="40" rx="4" fill="#450a0a"/>
    <text x="220" y="54" fill="#fca5a5" font-size="9" text-anchor="middle">Redis Central</text>
    <text x="220" y="68" fill="#f87171" font-size="8" text-anchor="middle">+2ms Latência I/O</text>
    <text x="145" y="102" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">Gargalo: SPOF &amp; Latência de Rede</text>
  </g>

  <!-- Híbrido Batch -->
  <g transform="translate(360, 48)">
    <rect x="0" y="0" width="290" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="145" y="22" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">2. Local em Memória + Batch Sync</text>
    <rect x="15" y="36" width="125" height="40" rx="4" fill="#065f46"/>
    <text x="77" y="54" fill="#a7f3d0" font-size="9" font-weight="bold" text-anchor="middle">Memória Local RAM</text>
    <text x="77" y="68" fill="#ffffff" font-size="8" text-anchor="middle">Decisão: &lt; 1 µs</text>
    <text x="155" y="60" fill="#38bdf8" font-size="10" text-anchor="middle">⇄ (Lote)</text>
    <rect x="180" y="36" width="95" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-dasharray="3,3"/>
    <text x="227" y="54" fill="#7dd3fc" font-size="9" text-anchor="middle">Async Sync</text>
    <text x="227" y="68" fill="#cbd5e1" font-size="8" text-anchor="middle">A cada 100ms</text>
    <text x="145" y="102" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Alta Vazão &amp; Resiliência Máxima</text>
  </g>
</svg>

<p>Visualização: Comparação entre Rate Limiter centralizado síncrono e arquitetura híbrida com reserva de tokens em batch.</p>

| Abordagem de Rate Limiter | Latência por Requisição | Consistência de Quota |
|---|---|---|
| **Centralizado (Redis puro)** | $1\text{--}5\text{ ms}$ (I/O síncrono) | Estrita (Strong Consistency) |
| **Totalmente Local (Sem Sync)** | $< 1\ \mu\text{s}$ (RAM local) | Fraca (Desbalanceamento por nó) |
| **Híbrido (Batch Sync / Envoy)** | $< 1\ \mu\text{s}$ (RAM + Async) | Eventual (Soft Limit tolerante) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Padrão de Arquitetura Envoy / Stripe
Grandes gateways (como Envoy RLS) utilizam **Batch Token Reservation**:
1. Em vez de chamar o serviço central a cada requisição individual, o worker local adquire um bloco de $N$ tokens (ex: 50 tokens).
2. Enquanto houver tokens no balde local, as requisições recebem `HTTP 200` imediatamente em memória RAM com zero latência de rede.
3. Quando a reserva local atinge um threshold mínimo (ex: restam 10 tokens), uma goroutine/thread em background envia requisição assíncrona para buscar outro lote.
4. **Política de Falha (Fail-Open vs Fail-Closed)**: Se o Redis central estiver indisponível ou inacessível, a maioria das Big Techs adota **Fail-Open**, permitindo o tráfego passar para não interromper a operação comercial legítima.

#### Implementation (Go & Java)

```go
package ratelimit

import (
  "sync/atomic"
)

type BatchLocalLimiter struct {
  localTokens int64
  batchSize   int64
  refillChan  chan struct{}
}

func NewBatchLocalLimiter(batchSize int64) *BatchLocalLimiter {
  l := &BatchLocalLimiter{
    localTokens: batchSize,
    batchSize:   batchSize,
    refillChan:  make(chan struct{}, 1),
  }
  return l
}

func (l *BatchLocalLimiter) Allow() bool {
  remaining := atomic.AddInt64(&l.localTokens, -1)
  if remaining >= 0 {
    if remaining < (l.batchSize / 4) {
      select {
      case l.refillChan <- struct{}{}:
      default:
      }
    }
    return true
  }
  return false
}

func (l *BatchLocalLimiter) ReplenishBatch(acquired int64) {
  atomic.AddInt64(&l.localTokens, acquired)
}
```

```java
package ratelimit;

import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;

public class BatchLocalLimiter {
  private final AtomicLong localTokens;
  private final long batchSize;
  private final Runnable refillTrigger;

  public BatchLocalLimiter(long batchSize, Runnable refillTrigger) {
    this.batchSize = batchSize;
    this.localTokens = new AtomicLong(batchSize);
    this.refillTrigger = refillTrigger;
  }

  public boolean allow() {
    long remaining = localTokens.decrementAndGet();
    if (remaining >= 0) {
      if (remaining < (batchSize / 4)) {
        refillTrigger.run();
      }
      return true;
    }
    return false;
  }

  public void replenishBatch(long acquired) {
    localTokens.addAndGet(acquired);
  }
}
```

#### Key Takeaways & Trade-offs
- **Fail-Open**: Sob indisponibilidade do Redis, o gateway degrada graciosamente e não rejeita usuários válidos.
- **Over-allocation**: Se existirem 100 instâncias de gateway e cada uma reservar 50 tokens, até 5.000 requisições adicionais podem ser autorizadas temporariamente se o cliente concentrar tráfego em múltiplas instâncias.
</details>
