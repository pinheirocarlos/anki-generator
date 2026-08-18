---
id: DSA-STRUCT-ARRAY-002
title: "Mecanismo de Redimensionamento Dinâmico em Vetores (Length vs Capacity)"
tags:
  - level::l3-junior
  - topic::dsa::arrays-strings
  - company::google
  - freq::high
---

## Pergunta
Como funciona o **redimensionamento dinâmico** de vetores (`ArrayList` / `slice`) quando sua capacidade máxima é atingida?

## Resposta
### Quick Answer
**Solução Direta**:
- Vetores dinâmicos encapsulam um array estático interno mantendo dois atributos essenciais:
  - `length` / `size`: Quantidade de elementos atualmente ocupados.
  - `capacity`: Quantidade total de elementos que o buffer alocado suporta.
- Quando `length == capacity` e ocorre um novo append:
  1. Um novo bloco contíguo de memória é alocado com fator de crescimento geométrico ($1.5\times$ em Java, $2\times$ em Go).
  2. Todos os elementos antigos são copiados para o novo bloco.
  3. O buffer antigo é liberado pelo Garbage Collector.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dynamic-array-realloc-copy-loop.webm">
    <p>Visualização: Alocação de novo buffer contíguo de tamanho duplicado e cópia em bloco dos elementos.</p>
  </video>
</div>

| Estado do Vetor | Dimensões (Len / Cap) | Ação de Alocação |
|---|---|---|
| **Inicial** | `len: 3, cap: 4` | Nenhuma (há espaço livre) |
| **Após 4º item** | `len: 4, cap: 4` | Limite do buffer atingido |
| **Após 5º item (Append)** | `len: 5, cap: 8` | Novo array $2\times$ alocado + cópia |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura do Slice Header em Go
Em Go, um `slice` é uma struct compacta de 24 bytes (arquitetura 64-bit):

```go
package main

import "fmt"

func inspectSliceGrowth() {
  s := make([]int, 0, 2)
  fmt.Printf("Inicial -> len: %d, cap: %d\n", len(s), cap(s)) // len: 0, cap: 2

  s = append(s, 1, 2)
  fmt.Printf("Cheio   -> len: %d, cap: %d\n", len(s), cap(s)) // len: 2, cap: 2

  s = append(s, 3) // Dispara realocação geométrica
  fmt.Printf("Crescido-> len: %d, cap: %d\n", len(s), cap(s)) // len: 3, cap: 4
}
```

#### Key Takeaways
- O redimensionamento geométrico é o mecanismo que garante custo constante amortizado $O(1)$ por inserção.
- Se o crescimento fosse aritmético fixo ($+10$ posições a cada estouro), o custo total de $N$ inserções se tornaria $O(N^2)$.

</details>
