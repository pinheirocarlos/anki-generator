---
id: CS-MATH-BOOL-004
title: "Implementação de Bitset / Bit Array de Alta Densidade"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::netflix
  - freq::high
---

## Pergunta
Como implementar um **Bitset / Bit Array** compacto de alta performance e realizar operações de união/interseção em $O(N/64)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Bitset** armazena uma sequência de $N$ booleanos empacotados dentro de um array de inteiros de 64 bits (`[]uint64`), consumindo **1 bit por booleano** em vez de 1 byte por `bool` em linguagens padrão (redução de 8x no uso de RAM).
- **Indexação**: Para o bit $k$:
  - Índice do bloco no array: `wordIdx = k / 64` (ou `k >> 6`).
  - Posição dentro da palavra: `bitOffset = k % 64` (ou `k & 63`).
- **Operações Vetoriais**: Operações de conjunto (União com `|`, Interseção com `&`) processam **64 booleanos por ciclo de clock da ALU**, alcançando velocidade $64\times$ maior que loops iterativos.

### Dual Coding Visual
| Estrutura de Booleans | Memória por 1.000.000 Bools | Custo de Interseção (AND) |
|---|---|---|
| **Array de Bools (`[]bool`)** | ~1.000.000 bytes (1 MB) | 1.000.000 iterações escalares |
| **Bitset (`[]uint64`)** | ~125.000 bytes (125 KB) | 15.625 operações bitwise ($64\times$ mais rápido) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Estrutura BitSet Básica
```go
package main

type BitSet struct {
  words []uint64
}

func NewBitSet(size int) *BitSet {
  return &BitSet{words: make([]uint64, (size+63)/64)}
}

func (b *BitSet) Set(k int) {
  b.words[k>>6] |= 1 << (k & 63)
}

func (b *BitSet) Test(k int) bool {
  return (b.words[k>>6] & (1 << (k & 63))) != 0
}

func (b *BitSet) Union(other *BitSet) {
  for i := range b.words {
    b.words[i] |= other.words[i] // 64 flags unidas por ciclo!
  }
}
```

#### Key Takeaways
- Bitsets são o alicerce de filtros de Bloom, indexadores de banco de dados (Bitmap Indexes do PostgreSQL/ClickHouse) e solvers de grafos em alta escala.

</details>
