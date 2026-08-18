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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/exponential-backoff-full-jitter-distribution-loop.webm">
    <p>Visualização: Full Jitter aleatorizando tempos de espera entre retentativas dissipando tempestades de requisições sincronizadas.</p>
  </video>
</div>

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
