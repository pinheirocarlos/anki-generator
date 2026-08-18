---
id: CS-ARCH-CACHE-002
title: "Conceito e Mecânica de Cache Line (64 Bytes)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
O que é uma **Cache Line** de 64 bytes e como ela afeta a transferência de dados entre a RAM e a CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- A CPU nunca carrega bytes individuais da memória RAM; ela transfere dados exclusivamente em blocos de tamanho fixo chamados **Cache Lines** (geralmente **64 bytes** em arquiteturas x86 e ARM64).
- Quando você lê uma variável de 4 bytes (`int32`), o controlador de memória carrega a variável e os 60 bytes vizinhos alinhados na mesma linha de 64 bytes.
- Isso maximiza o aproveitamento da **localidade espacial**, tornando acessos a elementos contíguos de um array praticamente gratuitos (Cache Hits em L1).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/cache-write-through-vs-write-back-loop.webm">
    <p>Visualização: Atualização síncrona da RAM (Write-Through) vs marcação de bit sujo (Dirty Bit) com flush assíncrono (Write-Back).</p>
  </video>
</div>

| Estrutura de Memória | Unidade de Transferência | Alinhamento Típico |
|---|---|---|
| **RAM para Cache L3/L2/L1** | 1 Cache Line | Blocos de 64 bytes |
| **Cache L1 para Registrador** | Palavra de CPU (Word) | 4 ou 8 bytes (32/64 bits) |
| **Disco para RAM (OS Page)** | 1 Página de Memória | 4.096 bytes (4 KB) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em C: Alinhamento de Estruturas
```c
#include <stdio.h>

// Struct de 64 bytes cabe perfeitamente em 1 única Cache Line:
struct alignas(64) WorkerData {
  long counter;
  char padding[56];
};

int main() {
  printf("Tamanho da struct alinhada: %zu bytes\n", sizeof(struct WorkerData)); // 64
  return 0;
}
```

#### Key Takeaways
- Uma Cache Line é a menor unidade atômica de transferência e coerência na hierarquia de hardware.
- Se uma struct cruzar o limite de 64 bytes (*boundary split*), um único acesso exigirá a leitura de duas Cache Lines distintas.

</details>
