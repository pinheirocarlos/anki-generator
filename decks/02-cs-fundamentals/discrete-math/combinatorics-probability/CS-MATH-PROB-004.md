---
id: CS-MATH-PROB-004
title: "Dimensionamento e Análise de Falsos Positivos em Bloom Filters"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::netflix
  - freq::high
---

## Pergunta
Como dimensionar o tamanho do vetor de bits ($m$) e a quantidade de funções hash ($k$) em um **Bloom Filter** para atingir uma taxa alvo de falsos positivos?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Bloom Filter** é uma estrutura de dados probabilística com tempo $O(k)$ e espaço ultra-compacto que garante:
  - **Zero Falsos Negativos**: Se o filtro responder "NÃO", o elemento com 100% de certeza nunca foi inserido.
  - **Possíveis Falsos Positivos**: Se o filtro responder "SIM", o elemento pode estar presente ou os bits colidiram por acaso.
- **Fórmulas de Dimensionamento Ótimo**:
  - Para $n$ elementos inseridos e taxa de falsos positivos desejada $p$:
    $$m = -\frac{n \ln p}{(\ln 2)^2} \approx -1.44 \cdot n \log_2 p \quad \text{(Tamanho do vetor em bits)}$$
  - Quantidade ótima de funções hash $k$:
    $$k = \frac{m}{n} \ln 2 \approx 0.693 \cdot \frac{m}{n}$$

### Dual Coding Visual
| Taxa de Falso Positivo ($p$) | Bits por Elemento ($m/n$) | Funções Hash Ótimas ($k$) |
|---|---|---|
| **$1\%$ ($p = 0.01$)** | ~9.6 bits / item | $k = 7$ |
| **$0.1\%$ ($p = 0.001$)** | ~14.4 bits / item | $k = 10$ |
| **$0.01\%$ ($p = 0.0001$)**| ~19.1 bits / item | $k = 13$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Estrutura de Lookup em Bloom Filter
```go
package main

type BloomFilter struct {
  bits []uint64
  m    uint64 // total de bits
  k    uint8  // total de hashes
}

func (bf *BloomFilter) Contains(key string) bool {
  for i := uint8(0); i < bf.k; i++ {
    hash := calculateHash(key, i) % bf.m
    if (bf.bits[hash/64] & (1 << (hash % 64))) == 0 {
      return false // 100% de certeza que NÃO existe!
    }
  }
  return true // Provavelmente existe (sujeito a falso positivo)
}
```

#### Key Takeaways
- Motores de banco como RocksDB e Cassandra usam Bloom Filters antes de buscar em SSTables no disco, evitando 99% das leituras de disco desnecessárias para chaves inexistentes.

</details>
