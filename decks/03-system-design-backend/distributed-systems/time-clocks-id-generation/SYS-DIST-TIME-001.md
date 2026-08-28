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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Twitter Snowflake: Gerador de IDs de 64 Bits Distribuído</text>
  <g transform="translate(40, 50)">
    <!-- 64 Bits Layout -->
    <rect x="0" y="0" width="600" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    
    <!-- 1 bit unused -->
    <rect x="5" y="10" width="30" height="40" rx="4" fill="#334155"/>
    <text x="20" y="34" fill="#94a3b8" font-size="9" text-anchor="middle">1b</text>

    <!-- 41 bits timestamp -->
    <rect x="40" y="10" width="320" height="40" rx="4" fill="#0284c7"/>
    <text x="200" y="28" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">41 Bits: Timestamp em Milissegundos</text>
    <text x="200" y="44" fill="#e0f2fe" font-size="9" text-anchor="middle">~69 anos de duração a partir de epoch customizada</text>

    <!-- 10 bits worker id -->
    <rect x="365" y="10" width="120" height="40" rx="4" fill="#78350f"/>
    <text x="425" y="28" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">10 Bits: Machine ID</text>
    <text x="425" y="44" fill="#fef3c7" font-size="9" text-anchor="middle">1024 nós/datacenters</text>

    <!-- 12 bits sequence -->
    <rect x="490" y="10" width="105" height="40" rx="4" fill="#065f46"/>
    <text x="542" y="28" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">12b: Sequence</text>
    <text x="542" y="44" fill="#a7f3d0" font-size="9" text-anchor="middle">4096 IDs/ms/nó</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Capacidade: 4.096.000 IDs únicos ordenáveis por tempo por nó a cada segundo sem coordenação central.</text>

</svg>

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
