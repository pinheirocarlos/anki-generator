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
