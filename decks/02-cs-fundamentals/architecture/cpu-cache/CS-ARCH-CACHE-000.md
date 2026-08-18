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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/cpu-cache-false-sharing-mesi-loop.webm">
    <p>Visualização: Invalidação de linha de cache compartilhada entre cores distintos durante escritas simultâneas em variáveis vizinhas.</p>
  </video>
</div>

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
