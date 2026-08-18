---
id: SYS-DIST-TIME-001
title: "Gerador de IDs Únicos Twitter Snowflake de 64 Bits"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::twitter
  - freq::high
---

## Pergunta
Qual é a estrutura binária de 64 bits do algoritmo Twitter Snowflake e como ele gera IDs únicos e ordenáveis por tempo sem coordenação central?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Twitter Snowflake** gera inteiros de **64 bits** (compatíveis com `BIGINT` e inteiros padrão) com o seguinte layout de bits:
  1. **1 bit de sinal**: Sempre `0` (garante número positivo).
  2. **41 bits de Timestamp**: Milissegundos decorridos desde uma época customizada (permite ~69 anos de operação).
  3. **10 bits de Node ID / Machine ID**: 5 bits para Data Center ID + 5 bits para Worker ID (suporta até 1.024 instâncias geradoras simultâneas).
  4. **12 bits de Sequência**: Contador local incrementado a cada ID gerado no mesmo milissegundo (suporta até $4.096$ IDs por milissegundo por nó $\approx 4.096.000$ IDs/segundo por nó).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/twitter-snowflake-64bit-id-structure-loop.webm">
    <p>Visualização: Estrutura do Snowflake: 41 bits de timestamp, 10 bits de ID de máquina/datacenter e 12 bits de sequência local.</p>
  </video>
</div>

| Segmento do Snowflake ID | Quantidade de Bits | Capacidade / Propósito |
|---|---|---|
| **Sign Bit** | 1 bit | Sempre 0 (Valor positivo) |
| **Timestamp (ms)** | 41 bits | $2^{41} \text{ ms} \approx 69.7 \text{ anos}$ de tempo útil |
| **Node ID (DC + Worker)** | 10 bits | Até 1.024 nós geradores independentes |
| **Contador de Sequência** | 12 bits | 4.096 IDs por milissegundo por máquina |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação em Go
```go
package main

import (
  "sync"
  "time"
)

type Snowflake struct {
  mu        sync.Mutex
  epoch     int64
  nodeID    int64
  sequence  int64
  lastTime  int64
}

func (s *Snowflake) Generate() int64 {
  s.mu.Lock()
  defer s.mu.Unlock()

  now := time.Now().UnixMilli()
  if now == s.lastTime {
    s.sequence = (s.sequence + 1) & 0xFFF // 12 bits max (4095)
    if s.sequence == 0 {
      for now <= s.lastTime { now = time.Now().UnixMilli() }
    }
  } else {
    s.sequence = 0
  }
  s.lastTime = now

  return ((now - s.epoch) << 22) | (s.nodeID << 12) | s.sequence
}
```

</details>
