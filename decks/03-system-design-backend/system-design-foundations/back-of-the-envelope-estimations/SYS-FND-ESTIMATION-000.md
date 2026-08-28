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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Latências de Hardware de Jeff Dean: Ordens de Grandeza</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    
    <rect x="20" y="15" width="200" height="24" rx="3" fill="#0284c7"/>
    <text x="30" y="31" fill="#ffffff" font-size="10" font-weight="bold">L1 Cache Reference</text>
    <text x="210" y="31" fill="#e0f2fe" font-size="10" text-anchor="end">0.5 ns</text>

    <rect x="20" y="43" width="260" height="24" rx="3" fill="#0369a1"/>
    <text x="30" y="59" fill="#ffffff" font-size="10" font-weight="bold">Main Memory (RAM) Reference</text>
    <text x="270" y="59" fill="#e0f2fe" font-size="10" text-anchor="end">100 ns (200x L1)</text>

    <rect x="20" y="71" width="360" height="24" rx="3" fill="#78350f"/>
    <text x="30" y="87" fill="#ffffff" font-size="10" font-weight="bold">SSD Random Read</text>
    <text x="370" y="87" fill="#fde68a" font-size="10" text-anchor="end">100.000 ns (100 µs)</text>

    <rect x="20" y="99" width="560" height="24" rx="3" fill="#7f1d1d"/>
    <text x="30" y="115" fill="#ffffff" font-size="10" font-weight="bold">Cross-Continent Round Trip (CA to Netherlands)</text>
    <text x="570" y="115" fill="#fca5a5" font-size="10" text-anchor="end">150.000.000 ns (150 ms)</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Acessar a memória RAM é 1000x mais rápido que ler do SSD e 1.500.000x mais rápido que uma chamada de rede transatlântica.</text>

</svg>

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
