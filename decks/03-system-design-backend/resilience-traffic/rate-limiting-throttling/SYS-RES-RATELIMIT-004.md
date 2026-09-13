---
id: SYS-RES-RATELIMIT-004
title: "Mitigação de Thundering Herd: Exponential Backoff com Full Jitter no Cliente"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::aws
  - freq::high
---

## Pergunta
Por que a aplicação de Full Jitter ao algoritmo de Exponential Backoff é essencial para mitigar o colapso por Thundering Herd em clientes que recebem HTTP 429?

## Resposta
### Quick Answer
**Solução Direta**:
- **Time Complexity**: $O(1)$
- **Space Complexity**: $O(1)$
- O **Exponential Backoff puro** ($T = \text{base} \times 2^{\text{attempt}}$) faz com que milhares de clientes que sofreram rate limit no mesmo segundo aguardem intervalos idênticos e disparem novas tentativas **em sincronia perfeita**, gerando ondas periódicas de sobrecarga que impedem a recuperação do servidor (*Thundering Herd*).
- O **Full Jitter** sorteia um intervalo aleatório uniforme entre $0$ e o teto exponencial:
  $$T_{\text{sleep}} = \text{random}\left(0,\ \min\left(\text{max\_backoff},\ \text{base} \times 2^{\text{attempt}}\right)\right)$$
- Essa aleatoriedade dispersa uniformemente a carga ao longo do tempo, transformando picos concentrados em um fluxo contínuo e tratável pelo backend.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Mitigação de Thundering Herd: Backoff Puro vs Full Jitter</text>

  <!-- Sem Jitter: Ondas de Ressonância -->
  <g transform="translate(30, 48)">
    <rect x="0" y="0" width="295" height="120" rx="6" fill="#1e293b" stroke="#f87171" stroke-width="1.5"/>
    <text x="147" y="22" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Sem Jitter: Ondas Sincronizadas</text>
    
    <!-- Picos concentrados -->
    <rect x="35" y="38" width="18" height="60" fill="#ef4444" rx="3"/>
    <text x="44" y="112" fill="#cbd5e1" font-size="8" text-anchor="middle">t=1s</text>

    <rect x="115" y="38" width="18" height="60" fill="#ef4444" rx="3"/>
    <text x="124" y="112" fill="#cbd5e1" font-size="8" text-anchor="middle">t=2s</text>

    <rect x="215" y="38" width="18" height="60" fill="#ef4444" rx="3"/>
    <text x="224" y="112" fill="#cbd5e1" font-size="8" text-anchor="middle">t=4s</text>

    <text x="147" y="75" fill="#fca5a5" font-size="9" text-anchor="middle">Picos repetidos de colapso</text>
  </g>

  <!-- Com Full Jitter: Carga Dispersa -->
  <g transform="translate(355, 48)">
    <rect x="0" y="0" width="295" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="147" y="22" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Com Full Jitter: Dispersão Suave</text>

    <!-- Barras espalhadas uniformemente -->
    <rect x="25" y="68" width="12" height="30" fill="#10b981" rx="2"/>
    <rect x="55" y="73" width="12" height="25" fill="#10b981" rx="2"/>
    <rect x="90" y="70" width="12" height="28" fill="#10b981" rx="2"/>
    <rect x="130" y="74" width="12" height="24" fill="#10b981" rx="2"/>
    <rect x="170" y="69" width="12" height="29" fill="#10b981" rx="2"/>
    <rect x="215" y="72" width="12" height="26" fill="#10b981" rx="2"/>
    <rect x="260" y="75" width="12" height="23" fill="#10b981" rx="2"/>

    <text x="147" y="52" fill="#a7f3d0" font-size="9" text-anchor="middle">Distribuição estocástica contínua</text>
    <text x="147" y="112" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Backend recupera com estabilidade</text>
  </g>
</svg>

<p>Visualização: Impacto do Exponential Backoff puro (ondas de pico sincronizadas) vs Full Jitter (dispersão uniforme da carga).</p>

| Estratégia de Retentativa | Comportamento Temporal | Risco de Thundering Herd |
|---|---|---|
| **Retentativa Imediata** | Disparo instantâneo em loop | Crítico (DDoS involuntário) |
| **Exponential Backoff Puro** | Ondas de pulsos sincronizados | Alto (Ressonância de pico) |
| **Full Jitter (AWS Standard)** | Dispersão aleatória uniforme | Mínimo (Carga suavizada) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Fórmula Canônica AWS (Marc Brooker)
No estudo da AWS Architecture sobre mitigação de contenção, comparou-se três abordagens:
1. **No Jitter**: $T = \min(M, B \times 2^i)$
2. **Equal Jitter**: $T = \frac{v}{2} + \text{random}(0, \frac{v}{2})$, mantendo um piso fixo.
3. **Full Jitter**: $T = \text{random}(0, \min(M, B \times 2^i))$.
O **Full Jitter** demonstrou a menor taxa de colisão total e o menor tempo agregado para esvaziamento da fila de clientes concorrentes.

#### Headers de Resposta HTTP (RFC 6585)
Quando o servidor retorna `429 Too Many Requests`, ele deve enviar:
- `Retry-After`: Segundos restantes para que novas requisições sejam aceitas.
- `X-RateLimit-Limit`: Limite máximo da janela.
- `X-RateLimit-Remaining`: Tokens disponíveis no momento.

#### Implementation (Go & Java)

```go
package retry

import (
  "math"
  "math/rand"
  "time"
)

func SleepWithFullJitter(attempt int, base, maxBackoff time.Duration) {
  multiplier := math.Pow(2, float64(attempt))
  temp := float64(base) * multiplier

  if temp > float64(maxBackoff) {
    temp = float64(maxBackoff)
  }

  sleepDuration := time.Duration(rand.Int63n(int64(temp)))
  time.Sleep(sleepDuration)
}
```

```java
package retry;

import java.util.concurrent.ThreadLocalRandom;

public class BackoffUtil {
  public static void sleepWithFullJitter(int attempt, long baseMillis, long maxBackoffMillis) {
    double multiplier = Math.pow(2, attempt);
    long temp = (long) (baseMillis * multiplier);
    long ceiling = Math.min(temp, maxBackoffMillis);

    long sleepTime = ThreadLocalRandom.current().nextLong(ceiling + 1);
    try {
      Thread.sleep(sleepTime);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }
}
```

#### Key Takeaways & Trade-offs
- **Diferença entre Rate Limiting e Circuit Breaker**: O Rate Limiting rejeita o excesso para proteger quotas; o Circuit Breaker interrompe chamadas para downstream falhos. Combinar ambos garante estabilidade ponta a ponta.
- **Client Good Citizen**: Clientes móveis devem honrar o header `Retry-After` fornecido pelo servidor antes de calcular retentativas locais.
</details>
