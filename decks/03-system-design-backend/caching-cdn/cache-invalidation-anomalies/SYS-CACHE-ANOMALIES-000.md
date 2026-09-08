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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cache Stampede (Thundering Herd) &amp; Singleflight / Mutex Lock</text>
  <g transform="translate(40, 50)">
    <!-- Stampede Problem -->
    <rect x="0" y="0" width="280" height="150" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="24" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Sem Proteção: Cache Miss Simultâneo</text>
    <text x="140" y="55" fill="#fca5a5" font-size="11" text-anchor="middle">50.000 QPS → Chave Hot Expira</text>
    <path d="M 40 75 L 240 75" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>
    <text x="140" y="105" fill="#fca5a5" font-size="11" text-anchor="middle">50.000 queries disparam ao DB</text>
    <text x="140" y="130" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">💥 Colapso por Sobrecarga de I/O</text>

    <!-- Singleflight Solution -->
    <rect x="320" y="0" width="280" height="150" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Com Singleflight / Mutex em Go</text>
    <text x="460" y="55" fill="#86efac" font-size="11" text-anchor="middle">1 Goroutine adquire o Lock e calcula</text>
    <rect x="350" y="75" width="220" height="28" rx="4" fill="#065f46"/>
    <text x="460" y="94" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">49.999 requisições aguardam na RAM</text>
    <text x="460" y="130" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">✅ Exatamente 1 query ao DB primário</text>
  </g>
  <text x="340" y="222" fill="#94a3b8" font-size="11" text-anchor="middle">XFetch Probabilístico: recálculo antecipado assíncrono antes do TTL expirar.</text>

</svg>
<p>Visualização: Cache Stampede: múltiplas requisições simultâneas em cache miss bloqueadas por Mutex/Singleflight enquanto apenas 1 worker recalcula o dado.</p>

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
