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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Encurtador de URL (TinyURL): Codificação Base62 de ID Numérico</text>
  <g transform="translate(40, 50)">
    <!-- ID Generation -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Gerador de ID Único de 64 Bits</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Snowflake ou Range Allocator (ZooKeeper)</text>
    <text x="140" y="68" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">ID = 20.092.148.972</text>
    <text x="140" y="95" fill="#86efac" font-size="9" text-anchor="middle">Zero colisão e geração determinística</text>

    <!-- Base62 Conversion -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Codificação Base62 [0-9, a-z, A-Z]</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">62^7 = ~3.5 Trilhões de URLs únicas</text>
    <text x="460" y="70" fill="#34d399" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">https://tiny.url/9Ab4x1z</text>
    <text x="460" y="98" fill="#a7f3d0" font-size="9" text-anchor="middle">String curta e compacta de 7 caracteres</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Evita funções de Hash (MD5/SHA) que exigem truncamento e loops de verificação de colisão caros no banco.</text>

</svg>
<p>Visualização: Conversão de identificador numérico de 64 bits em string alfanumérica compacta de 7 caracteres via Base62.</p>

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
