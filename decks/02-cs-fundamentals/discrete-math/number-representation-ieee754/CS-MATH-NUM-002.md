---
id: CS-MATH-NUM-002
title: "Endianness (Big-Endian vs Little-Endian) e Network Byte Order"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que é **Endianness** (Big-Endian vs Little-Endian) e por que a conversão para Network Byte Order é mandatória em redes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Endianness**: É a convenção de ordem pela qual bytes individuais de uma palavra multi-byte (como um `uint32` de 4 bytes) são armazenados em endereços sequenciais de memória:
  - **Little-Endian (x86-64, ARM64 padrão)**: O byte **menos significativo (LSB)** fica no endereço de memória mais baixo.
  - **Big-Endian**: O byte **mais significativo (MSB)** fica no endereço de memória mais baixo (ordem natural de leitura humana).
- **Network Byte Order**: A arquitetura da Internet (TCP/IP) adota estritamente **Big-Endian**. Protocolos exigem conversão explícita (`htons`, `htonl`, `binary.BigEndian`) antes de transmitir pacotes na rede.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Endianness: Big-Endian (Network) vs Little-Endian (x86/ARM)</text>
  <g transform="translate(50, 48)">
    <!-- Little Endian -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Little-Endian (x86-64 / ARM64)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Valor: 0x12345678</text>
    <text x="135" y="60" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">Memória: [0x78] [0x56] [0x34] [0x12]</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">LSB no menor endereço de memória</text>

    <!-- Big Endian -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Big-Endian (Network Byte Order)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Valor: 0x12345678</text>
    <text x="445" y="60" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">Memória: [0x12] [0x34] [0x56] [0x78]</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">MSB no menor endereço (leitura humana)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Funções htons() / ntohs() realizam a conversão obrigatória entre Host e Network Byte Order.</text>

</svg>
<p>Visualização: Disposição sequencial de bytes na memória física: Big-Endian (ordem de rede) vs Little-Endian (padrão x86/ARM).</p>

| Ordem de Bytes (`0x12345678`) | Endereço `0x00` (Início) | Endereço `0x03` (Fim) |
|---|---|---|
| **Big-Endian (Network Order)** | `0x12` (MSB Mais Significativo) | `0x78` (LSB Menos Significativo) |
| **Little-Endian (Host x86)** | `0x78` (LSB Menos Significativo) | `0x12` (MSB Mais Significativo) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Serialização em Network Byte Order
```go
package main

import (
  "encoding/binary"
  "fmt"
)

func main() {
  buf := make([]byte, 4)
  var val uint32 = 0x12345678

  // Converte para Big-Endian (Network Order):
  binary.BigEndian.PutUint32(buf, val)
  fmt.Printf("Big-Endian: % X\n", buf) // 12 34 56 78

  // Converte para Little-Endian (Host x86):
  binary.LittleEndian.PutUint32(buf, val)
  fmt.Printf("Little-Endian: % X\n", buf) // 78 56 34 12
}
```

#### Key Takeaways
- Little-Endian facilita a conversão de tipos em hardware (um `uint32` lido como `uint16` no mesmo ponteiro retorna o valor correto sem deslocamento).

</details>
