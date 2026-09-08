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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Redimensionamento Dinâmico em Vetores (Length vs Capacity)</text>
  <g transform="translate(70, 50)">
    <rect x="0" y="0" width="240" height="80" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="120" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Antes do Resize (Append)</text>
    <text x="20" y="50" fill="#f8fafc" font-size="11">length = 4 (Ocupados)</text>
    <text x="20" y="68" fill="#f87171" font-size="11">capacity = 4 (Buffer Cheio)</text>

    <path d="M 260 40 L 300 40" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)"/>

    <rect x="320" y="0" width="260" height="80" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="450" y="25" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Após Resize 2x em Bloco Novo</text>
    <text x="340" y="50" fill="#f8fafc" font-size="11">length = 5 (Novo item inserido)</text>
    <text x="340" y="68" fill="#34d399" font-size="11">capacity = 8 (4 slots livres reservados)</text>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Buffer antigo é coletado pelo GC após cópia em bloco (memmove / memcpy)</text>
</svg>

<p>Visualização: Alocação de novo buffer contíguo e cópia de elementos ao atingir capacity.</p>

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
