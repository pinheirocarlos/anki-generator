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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura de Cache Line (64 Bytes) e Alinhamento de Memória</text>
  <g transform="translate(50, 55)">
    <!-- 64 Bytes line -->
    <rect x="0" y="0" width="580" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <rect x="0" y="0" width="72" height="50" rx="4" fill="#0369a1"/>
    <text x="36" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 0</text>
    <text x="36" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">0..7 B</text>

    <rect x="73" y="0" width="72" height="50" fill="#0284c7"/>
    <text x="109" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 1</text>
    <text x="109" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">8..15 B</text>

    <rect x="146" y="0" width="72" height="50" fill="#0369a1"/>
    <text x="182" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 2</text>
    <text x="182" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">16..23 B</text>

    <rect x="219" y="0" width="72" height="50" fill="#0284c7"/>
    <text x="255" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 3</text>
    <text x="255" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">24..31 B</text>

    <rect x="292" y="0" width="288" height="50" fill="#1e293b"/>
    <text x="436" y="30" fill="#64748b" font-size="11" font-weight="bold" text-anchor="middle">Words 4 a 7 (32..63 Bytes) — Preenchidos em Bloco Atômico</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transferência em Bloco de 64B = Custo de Cache Miss idêntico para 1 byte ou 64 bytes contíguos</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Base da Localidade Espacial: Acessar array sequencial aproveita 1 miss a cada 8 elementos int64.</text>

</svg>
<p>Visualização: Transferência de blocos contíguos de 64 bytes da RAM para os caches da CPU.</p>

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
