---
id: SYS-RES-FAULTTOL-001
title: "Retries com Exponential Backoff e Full Jitter contra Tempestades de Sincronização"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::amazon
  - freq::high
---

## Pergunta
Por que adicionar Full Jitter aleatório ao Exponential Backoff é obrigatório para evitar o colapso de servidores em recuperação?

## Resposta
### Quick Answer
**Solução Direta**:
- **Exponential Backoff Puro**:
  - Dobra o tempo de espera a cada tentativa falha: $t = \text{base} \times 2^{\text{attempt}}$.
  - **Problema**: Se 10.000 clientes falharem no mesmo milissegundo, todos calcularão exatamente o mesmo intervalo de espera e reenviarão as requisições em pulsos perfeitamente sincronizados (**Tempestade de Retries / Stampede**), derrubando o servidor novamente.
- **Full Jitter (Amazon Architecture)**:
  - Sorteia um tempo aleatório uniforme entre zero e o limite exponencial:
    $$t_{\text{wait}} = \text{random}(0, \min(\text{max\_backoff}, \text{base} \times 2^{\text{attempt}}))$$
  - Dispersa uniformemente a carga de retries no tempo, permitindo que o servidor se recupere suavemente.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Exponential Backoff com Full Jitter: Dissipação de Tempestades de Rede</text>
  <g transform="translate(40, 50)">
    <!-- Fixed Retry (Thundering Herd) -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Retentativa Fixa / Sem Jitter</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">10.000 clientes retentam no segundo t=2s</text>
    <text x="140" y="70" fill="#fca5a5" font-size="10" text-anchor="middle">Picos de carga sincronizados</text>
    <text x="140" y="92" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Derruba o servidor que tenta se recuperar</text>

    <!-- Exponential Backoff with Full Jitter -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Full Jitter (AWS Architecture)</text>
    <text x="460" y="48" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">sleep = rand(0, min(cap, base * 2^attempt))</text>
    <text x="460" y="70" fill="#86efac" font-size="10" text-anchor="middle">Distribuição suave e uniforme de requisições</text>
    <text x="460" y="92" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero pulsos de contenção sincronizada</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Padrão obrigatório em todos os SDKs de clientes cloud resilientes.</text>

</svg>
<p>Visualização: Full Jitter aleatorizando tempos de espera entre retentativas dissipando tempestades de requisições sincronizadas.</p>

| Estratégia de Retry | Distribuição de Tráfego no Tempo | Risco de Ressaturação do Backend |
|---|---|---|
| **Retry Imediato** | Rajada violenta contínua | Colapso garantido do serviço |
| **Exponential Backoff sem Jitter** | Ondas sincronizadas periódicas | Alto (Pulsos de colisão periódica) |
| **Exponential Backoff + Full Jitter** | **Distribuição uniforme contínua** | **Mínimo (Recuperação suave)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação em Go
```go
package main

import (
  "math/rand"
  "time"
)

func BackoffWithJitter(attempt int, base time.Duration, max time.Duration) time.Duration {
  exp := base * time.Duration(1<<attempt)
  if exp > max { exp = max }
  return time.Duration(rand.Int63n(int64(exp))) // Full Jitter [0, exp)
}
```

</details>
