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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura de Bitset / Bit Array de Alta Densidade</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="55" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Palavra uint64 (64 flags booleanas em 8 Bytes de memória)</text>
    
    <g transform="translate(40, 30)">
      <rect x="0" y="0" width="15" height="15" fill="#10b981"/>
      <rect x="16" y="0" width="15" height="15" fill="#334155"/>
      <rect x="32" y="0" width="15" height="15" fill="#10b981"/>
      <rect x="48" y="0" width="15" height="15" fill="#10b981"/>
      <rect x="64" y="0" width="15" height="15" fill="#334155"/>
      <rect x="80" y="0" width="15" height="15" fill="#334155"/>
      <text x="120" y="12" fill="#94a3b8" font-size="10" font-family="monospace">... bits 0..63</text>
    </g>
  </g>
  <g transform="translate(60, 115)">
    <rect x="0" y="0" width="270" height="60" rx="5" fill="#0f172a" stroke="#10b981"/>
    <text x="135" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Set(i): words[i/64] |= (1ULL &lt;&lt; (i%64))</text>
    <text x="135" y="44" fill="#a7f3d0" font-size="10" text-anchor="middle">Liga o i-ésimo bit em tempo O(1)</text>

    <rect x="290" y="0" width="270" height="60" rx="5" fill="#0f172a" stroke="#38bdf8"/>
    <text x="425" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Test(i): (words[i/64] &amp; (1ULL &lt;&lt; (i%64))) != 0</text>
    <text x="425" y="44" fill="#bae6fd" font-size="10" text-anchor="middle">Consulta o estado do bit em O(1)</text>
  </g>

</svg>

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
