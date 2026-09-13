---
id: SYS-RES-RATELIMIT-002
title: "Sliding Window Counter com Aproximação Ponderada: Memória O(1) vs Precisão"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::cloudflare
  - freq::high
---

## Pergunta
Como o algoritmo Sliding Window Counter por aproximação ponderada estima o consumo de taxa sem o alto custo de memória de um log temporal completo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Time Complexity**: $O(1)$
- **Space Complexity**: $O(1)$
- Em vez de reter o histórico de cada timestamp individual no Redis ou na memória como no *Sliding Window Log* (que custa $O(N)$ de espaço por usuário), a aproximação ponderada mantém apenas **dois contadores inteiros**: o da janela fixa anterior e o da janela corrente.
- Quando uma requisição chega no instante $t$, calcula-se a taxa combinada:
  $$\text{Requisições Estimadas} = \text{Contador Atual} + \left( \text{Contador Anterior} \times (1 - \text{Fração Transcorrida da Janela}) \right)$$
- Se a estimativa for menor que o limite contratado, o contador atual é incrementado e a requisição passa; caso contrário, é rejeitada com `429 Too Many Requests`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Sliding Window Counter: Interpolação Linear entre Janelas Fixas</text>

  <!-- Janela Anterior -->
  <g transform="translate(40, 48)">
    <rect x="0" y="0" width="280" height="70" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">Janela Anterior (Ex: 100 reqs)</text>
    <rect x="112" y="34" width="160" height="24" rx="4" fill="#334155"/>
    <text x="192" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Peso Restante: (1 - 0.40) = 60%</text>
    <text x="192" y="86" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Contribuição: 100 × 0.6 = 60 reqs</text>
  </g>

  <!-- Janela Corrente -->
  <g transform="translate(360, 48)">
    <rect x="0" y="0" width="280" height="70" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Janela Corrente (Ex: 30 reqs)</text>
    <rect x="0" y="34" width="112" height="24" rx="4" fill="#065f46"/>
    <text x="56" y="50" fill="#a7f3d0" font-size="10" text-anchor="middle">Decorrido: 40%</text>
    <text x="140" y="86" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Contribuição: 30 reqs (100%)</text>
  </g>

  <!-- Resultado Ponderado -->
  <rect x="140" y="150" width="400" height="34" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="340" y="172" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Volume Estimado no Momento: 60 + 30 = 90 requisições (Limite: 100) ✓</text>
</svg>

<p>Visualização: Cálculo da aproximação ponderada entre janela anterior e janela corrente no Sliding Window Counter.</p>

| Algoritmo de Janela | Consumo de Memória | Precisão Temporal |
|---|---|---|
| **Sliding Window Log** | $O(N)$ (1 timestamp por request) | 100% Exato |
| **Fixed Window Counter** | $O(1)$ (1 contador inteiro) | Baixa ($2\times$ rajada na borda) |
| **Sliding Window Counter** | $O(1)$ (2 contadores inteiros) | Alta ($<0.05\%$ desvio estatístico) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que a Cloudflare usa Aproximação Ponderada
No *Sliding Window Log*, se um usuário fizer 10.000 requisições/minuto, o sistema precisa armazenar 10.000 inteiros de 64 bits em memória ($80\text{ KB}$ por IP). Em escala de milhões de IPs, isso consome gigabytes de RAM no Redis.
Com a **Aproximação Ponderada**, são armazenados apenas 2 contadores por chave ($16\text{ bytes}$), reduzindo o consumo de memória em mais de $99.9\%$, com taxa de erro empírica insignificante ($< 0.05\%$).

#### Implementation (Go & Java)

```go
package ratelimit

import (
  "sync"
  "time"
)

type SlidingCounterLimiter struct {
  mu          sync.Mutex
  windowSize  time.Duration
  limit       int64
  prevCount   int64
  currCount   int64
  windowStart time.Time
}

func NewSlidingCounter(limit int64, window time.Duration) *SlidingCounterLimiter {
  return &SlidingCounterLimiter{
    windowSize:  window,
    limit:       limit,
    windowStart: time.Now(),
  }
}

func (l *SlidingCounterLimiter) Allow() bool {
  l.mu.Lock()
  defer l.mu.Unlock()

  now := time.Now()
  elapsed := now.Sub(l.windowStart)

  if elapsed >= l.windowSize*2 {
    l.prevCount = 0
    l.currCount = 0
    l.windowStart = now
    elapsed = 0
  } else if elapsed >= l.windowSize {
    l.prevCount = l.currCount
    l.currCount = 0
    l.windowStart = l.windowStart.Add(l.windowSize)
    elapsed = now.Sub(l.windowStart)
  }

  weight := float64(l.windowSize-elapsed) / float64(l.windowSize)
  estimated := float64(l.prevCount)*weight + float64(l.currCount)

  if estimated < float64(l.limit) {
    l.currCount++
    return true
  }
  return false
}
```

```java
package ratelimit;

import java.time.Instant;

public class SlidingCounterLimiter {
  private final long limit;
  private final long windowMillis;
  private long prevCount = 0;
  private long currCount = 0;
  private long windowStartMillis;

  public SlidingCounterLimiter(long limit, long windowMillis) {
    this.limit = limit;
    this.windowMillis = windowMillis;
    this.windowStartMillis = Instant.now().toEpochMilli();
  }

  public synchronized boolean allow() {
    long now = Instant.now().toEpochMilli();
    long elapsed = now - windowStartMillis;

    if (elapsed >= windowMillis * 2) {
      prevCount = 0;
      currCount = 0;
      windowStartMillis = now;
      elapsed = 0;
    } else if (elapsed >= windowMillis) {
      prevCount = currCount;
      currCount = 0;
      windowStartMillis += windowMillis;
      elapsed = now - windowStartMillis;
    }

    double weight = (double) (windowMillis - elapsed) / windowMillis;
    double estimated = prevCount * weight + currCount;

    if (estimated < limit) {
      currCount++;
      return true;
    }
    return false;
  }
}
```

#### Key Takeaways & Trade-offs
- **Suposição Estatística**: Assume que as requisições na janela anterior ocorreram de forma uniforme ao longo do período. Em tráfegos reais contínuos, essa premissa é amplamente válida.
- **Edge Case**: Se a janela anterior teve um surto súbito de tráfego nos últimos 2 segundos e a janela atual iniciou vazia, pode haver ligeira superestimação ou subestimação momentânea.
</details>
