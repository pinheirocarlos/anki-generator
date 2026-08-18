---
id: SYS-FND-ESTIMATION-000
title: "Latências de Hardware de Jeff Dean e Ordens de Grandeza"
tags:
  - level::l3-junior
  - topic::sys::foundations
  - company::google
  - freq::high
---

## Pergunta
Quais são os números de latência de hardware fundamentais de Jeff Dean que todo engenheiro de software deve memorizar para dimensionar sistemas distribuídos?

## Resposta
### Quick Answer
**Solução Direta**:
- **L1 CPU Cache**: ~0.5 a 1 ns.
- **L2 CPU Cache**: ~3 a 4 ns.
- **RAM (Acesso Principal)**: ~100 ns.
- **SSD NVMe (Leitura Aleatória)**: ~10 a 50 μs (microssegundos).
- **Rede no Mesmo Data Center**: ~500 μs (0.5 ms).
- **Disco Magnético HDD (Seek)**: ~10 ms.
- **RTT Transcontinental (EUA - Europa)**: ~150 ms.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/jeff-dean-latency-numbers-orders-of-magnitude-loop.webm">
    <p>Visualização: Comparação visual de latências de hardware: L1 Cache (0.5ns), RAM (100ns), SSD (100µs), Network RTT (150ms).</p>
  </video>
</div>

| Nível de Acesso | Latência Típica | Fator de Escala Relativo |
|---|---|---|
| **L1 / L2 Cache** | 0.5 - 4 ns | 1x (Fração de segundo) |
| **RAM Principal** | ~100 ns | ~100x |
| **NVMe SSD / Rede Local** | 10 - 500 μs | ~10.000x a 500.000x |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Analogia de Escala Temporal (Se 1 ciclo de CPU = 1 segundo)
- **Acesso L1**: 1 segundo.
- **Acesso RAM**: ~3 minutos (levantar e pegar um café).
- **Leitura SSD**: ~2 dias úteis.
- **Round-Trip Data Center**: ~6 dias.
- **Seek em HDD**: ~4 meses.
- **RTT Transcontinental**: ~5 anos.

#### Exemplo em Go: Por que evitar I/O em loops
```go
package main

// Ruim: 1.000 round-trips de rede ou disco = 1000 * 0.5ms = 500ms
// Bom: Carregar em lote na RAM (100ns por acesso) = sub-milissegundo
func processItems(ids []int64) {
  // Batch fetching minimiza a penalidade de travessia de barramento de rede
}
```

#### Key Takeaways
- Acesso à RAM é ~1.000x mais rápido que leitura em SSD NVMe e ~100.000x mais rápido que HDD.
- Sempre projete caches em memória para blindar storages secundários e chamadas remotas de rede.

</details>
