---
id: SYS-RES-RATELIMIT-005
title: "Rate Limiting Multi-Camadas e Cost-Based Limiting para Proteção em Profundidade"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::meta
  - freq::high
---

## Pergunta
Como funciona a estratégia de Cost-Based Rate Limiting e por que ela supera o modelo de contagem de requisições 1:1 na proteção de sistemas backend heterogêneos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Time Complexity**: $O(1)$
- **Space Complexity**: $O(1)$
- No modelo tradicional 1:1, uma chamada leve de healthcheck consome a mesma quota de uma consulta analítica complexa com agregações que consome $100\%$ da CPU por $2\text{ segundos}$, tornando o sistema vulnerável a negação de serviço com baixo volume de requisições (*Low-Rate DoS*).
- No **Cost-Based Rate Limiting**, cada operação possui um peso computacional debitado do mesmo balde de tokens:
  - Leitura simples de cache: **1 token**.
  - Gravação transacional com commit no banco: **5 tokens**.
  - Query complexa de busca / exportação de relatório: **50 tokens**.
- Quando combinada a uma arquitetura **Multi-Camadas (Defense-in-Depth)** (Borda por IP $\to$ Gateway por API Key $\to$ Serviço por Custo), a infraestrutura neutraliza ataques e abusos antes que alcancem o banco de dados.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Defesa em Profundidade: Funil de Rate Limiting Multi-Camadas</text>

  <!-- Camada 1: Borda / WAF -->
  <g transform="translate(30, 48)">
    <rect x="0" y="0" width="190" height="120" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="95" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">1. Edge / WAF (Por IP)</text>
    <rect x="15" y="36" width="160" height="34" rx="4" fill="#334155"/>
    <text x="95" y="52" fill="#ffffff" font-size="9" text-anchor="middle">DDoS Volumétrico</text>
    <text x="95" y="64" fill="#94a3b8" font-size="8" text-anchor="middle">Max: 10.000 req/s por IP</text>
    <text x="95" y="98" fill="#fde68a" font-size="9" text-anchor="middle">Bloqueia bots na entrada</text>
  </g>

  <!-- Seta 1 -->
  <text x="235" y="112" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">→</text>

  <!-- Camada 2: API Gateway -->
  <g transform="translate(245, 48)">
    <rect x="0" y="0" width="190" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="95" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">2. API Gateway (Tenant)</text>
    <rect x="15" y="36" width="160" height="34" rx="4" fill="#0369a1"/>
    <text x="95" y="52" fill="#ffffff" font-size="9" text-anchor="middle">Enforçamento de SLA</text>
    <text x="95" y="64" fill="#bae6fd" font-size="8" text-anchor="middle">Tier Free vs Enterprise</text>
    <text x="95" y="98" fill="#7dd3fc" font-size="9" text-anchor="middle">Validação por API Key</text>
  </g>

  <!-- Seta 2 -->
  <text x="450" y="112" fill="#10b981" font-size="16" font-weight="bold" text-anchor="middle">→</text>

  <!-- Camada 3: Service Layer (Cost-Based) -->
  <g transform="translate(460, 48)">
    <rect x="0" y="0" width="190" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="95" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">3. Service (Cost-Based)</text>
    <rect x="15" y="36" width="160" height="34" rx="4" fill="#065f46"/>
    <text x="95" y="52" fill="#ffffff" font-size="9" text-anchor="middle">Proteção de CPU &amp; DB</text>
    <text x="95" y="64" fill="#a7f3d0" font-size="8" text-anchor="middle">Ponderação por Custo</text>
    <text x="95" y="98" fill="#86efac" font-size="9" text-anchor="middle">Query: 50 | Ping: 1</text>
  </g>
</svg>

<p>Visualização: Arquitetura de Rate Limiting multi-camadas em defesa em profundidade combinada com dimensionamento por custo.</p>

| Camada de Filtragem | Identificador Utilizado | Foco Principal de Proteção |
|---|---|---|
| **Edge / WAF** | Endereço IP / Subnet CIDR | Ataques volumétricos e Scrapers |
| **API Gateway** | `Authorization` / API Key | Enforçamento de SLA comercial |
| **Service Mesh / Pod** | Endpoint &amp; Custo Dinâmico | Prevenção de exaustão de CPU/DB |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo do GitHub GraphQL API
O GitHub atribui pontos a cada consulta GraphQL:
- Cada nó retornado na árvore consome frações de pontos.
- O usuário possui um orçamento de $5.000\text{ pontos}$ por hora.
- Se uma query aninhada custa 200 pontos, o balde de tokens do usuário é debitado imediatamente em 200 unidades, retornando o header:
  `X-RateLimit-Cost: 200`
  `X-RateLimit-Remaining: 4800`

#### Implementation (Go & Java)

```go
package ratelimit

import (
  "sync"
  "time"
)

type CostLimiter struct {
  mu       sync.Mutex
  tokens   float64
  capacity float64
  refillRate float64
  lastRefill time.Time
}

func NewCostLimiter(capacity, ratePerSec float64) *CostLimiter {
  return &CostLimiter{
    tokens:     capacity,
    capacity:   capacity,
    refillRate: ratePerSec,
    lastRefill: time.Now(),
  }
}

func (c *CostLimiter) AllowCost(cost float64) bool {
  c.mu.Lock()
  defer c.mu.Unlock()

  now := time.Now()
  elapsed := now.Sub(c.lastRefill).Seconds()
  c.tokens = c.tokens + elapsed*c.refillRate
  if c.tokens > c.capacity {
    c.tokens = c.capacity
  }
  c.lastRefill = now

  if c.tokens >= cost {
    c.tokens -= cost
    return true
  }
  return false
}
```

```java
package ratelimit;

import java.time.Instant;

public class CostLimiter {
  private final double capacity;
  private final double refillRatePerSec;
  private double tokens;
  private long lastRefillMillis;

  public CostLimiter(double capacity, double refillRatePerSec) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
    this.tokens = capacity;
    this.lastRefillMillis = Instant.now().toEpochMilli();
  }

  public synchronized boolean allowCost(double cost) {
    long now = Instant.now().toEpochMilli();
    double elapsedSeconds = (now - lastRefillMillis) / 1000.0;
    tokens = Math.min(capacity, tokens + elapsedSeconds * refillRatePerSec);
    lastRefillMillis = now;

    if (tokens >= cost) {
      tokens -= cost;
      return true;
    }
    return false;
  }
}
```

#### Key Takeaways & Trade-offs
- **Estimativa Estática vs Consumo Real**: Operações podem cobrar custo estimado antecipado ou reconciliar o custo real medido após a execução da query no banco (*Post-Execution Reconciliation*).
- **Graceful Throttling**: Permite retornar respostas parciais (ex: paginação menor ou payload reduzido) caso o usuário esteja próximo de esgotar seus créditos de custo.
</details>
