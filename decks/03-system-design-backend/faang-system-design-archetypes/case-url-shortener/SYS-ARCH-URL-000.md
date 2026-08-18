---
id: SYS-ARCH-URL-000
title: "Encurtador de URLs (TinyURL): Codificação Base62 e Gerador de IDs"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::twitter
  - freq::high
---

## Pergunta
Como a codificação Base62 converte IDs inteiros numéricos únicos de 64 bits em strings curtas de 7 caracteres para um encurtador de URLs?

## Resposta
### Quick Answer
**Solução Direta**:
- **Alfabeto Base62**: Composto por 62 caracteres alfanuméricos seguros para URL: `[0-9a-zA-Z]` (10 dígitos + 26 minúsculas + 26 maiúsculas).
- **Capacidade com 7 Caracteres**:
  $$62^7 = 3.521.614.606.208 \approx 3.5 \text{ Trilhões de URLs únicas}$$
- **Mecanismo de Geração**:
  1. Um gerador de IDs distribuído (Snowflake, Range Allocator no ZooKeeper ou Sequência de DB) emite um número inteiro monotônico único (ex: ID $= 125.307$).
  2. O inteiro é convertido para Base62 através de divisões e restos sucessivos por 62 (ex: $125.307 \rightarrow \text{"wX9"}$).
  3. Preenche com zeros à esquerda até 7 caracteres (`"0000wX9"`).

### Dual Coding Visual
| Comprimento da Chave (Base62) | Combinações Únicas Possíveis | Espaço de Endereçamento |
|---|---|---|
| **6 Caracteres ($62^6$)** | ~56.8 Bilhões | Adequado para sistemas médios |
| **7 Caracteres ($62^7$)** | **~3.52 Trilhões** | **Padrão ouro TinyURL / Bitly** |
| **8 Caracteres ($62^8$)** | ~218 Trilhões | Escala para décadas em escala global |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Algoritmo Base62 em Go
```go
package main

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func EncodeBase62(n uint64) string {
  if n == 0 { return "0" }
  bytes := []byte{}
  for n > 0 {
    rem := n % 62
    bytes = append(bytes, alphabet[rem])
    n = n / 62
  }
  // Inverte os bytes para ordem correta
  for i, j := 0, len(bytes)-1; i < j; i, j = i+1, j-1 {
    bytes[i], bytes[j] = bytes[j], bytes[i]
  }
  return string(bytes)
}
```

</details>
