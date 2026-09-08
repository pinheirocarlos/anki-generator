---
id: CS-ARCH-CACHE-000
title: "Hierarquia de Caches da CPU (L1/L2/L3) e Latências de Acesso"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
O que é a **hierarquia de memória da CPU (L1/L2/L3)** e por que ela existe na arquitetura de computadores moderna?

## Resposta
### Quick Answer
**Solução Direta**:
- A CPU opera na escala de frações de nanossegundo (~0.3ns por ciclo a 3.5GHz), enquanto a memória RAM principal leva de 50 a 100ns para responder (gargalo de Von Neumann).
- Para evitar que os núcleos fiquem ociosos (*CPU Stalls*), processadores integram múltiplos níveis de cache estático (SRAM) ultra-rápidos:
  - **L1 (Instruções/Dados)**: ~32-64 KB por núcleo, latência de ~1 ns (4 ciclos).
  - **L2**: ~512 KB - 1 MB por núcleo, latência de ~3-4 ns (12-14 ciclos).
  - **L3 (Shared/LLC)**: ~16-64 MB compartilhado entre todos os núcleos, latência de ~10-15 ns (40-60 ciclos).

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Hierarquia de Caches da CPU: Escala de Capacidade vs Latência</text>
  <g transform="translate(140, 45)">
    <!-- Registers -->
    <rect x="110" y="0" width="180" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="16" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Registradores (~1 KB) | ~0.3 ns (1 ciclo)</text>
    
    <!-- L1 Cache -->
    <rect x="80" y="32" width="240" height="26" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="49" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">L1 Cache (~64 KB) | ~1 ns (4 ciclos)</text>
    
    <!-- L2 Cache -->
    <rect x="50" y="66" width="300" height="28" rx="4" fill="#075985" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="84" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">L2 Cache (~1 MB) | ~3-4 ns (12 ciclos)</text>
    
    <!-- L3 Cache -->
    <rect x="20" y="102" width="360" height="30" rx="4" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="121" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">L3 Cache Compartilhado (~32 MB) | ~10-15 ns (40 ciclos)</text>
    
    <!-- Main Memory RAM -->
    <rect x="0" y="140" width="400" height="30" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="200" y="159" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Memória RAM Principal (~32-128 GB) | ~60-80 ns (~200 ciclos)</text>
  </g>

</svg>
<p>Visualização: Hierarquia L1/L2/L3 com latências de ~1ns a ~15ns contra ~80ns da RAM.</p>

| Nível de Memória | Tamanho Típico | Latência de Acesso |
|---|---|---|
| **Registradores** | ~1-2 KB | ~0.3 ns (1 ciclo) |
| **Cache L1 / L2** | ~64 KB / 1 MB | ~1 a 4 ns |
| **Cache L3 (LLC)** | ~16 a 64 MB | ~10 a 15 ns |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental da Mesa de Trabalho
- **Registrador**: É o papel na sua mão agora.
- **Cache L1/L2**: É o caderno aberto sobre a sua mesa de trabalho.
- **Cache L3**: É a gaveta da sua escrivaninha.
- **RAM**: É a estante no corredor (você precisa levantar e andar até lá).
- **SSD/Disco**: É a biblioteca pública no centro da cidade.

#### Exemplo em Go: Impacto de Localidade Temporal
```go
package main

// Acessar variáveis repetidas vezes mantém os dados em L1:
func sumRepeated(arr []int, iterations int) int {
  total := 0
  for k := 0; k < iterations; k++ {
    total += arr[0] // arr[0] permanece no cache L1 durante todo o laço
  }
  return total
}
```

#### Key Takeaways
- O princípio que viabiliza os caches é a **localidade de referência** (temporal: dados acessados recentemente serão reutilizados; espacial: dados vizinhos serão acessados em seguida).

</details>
