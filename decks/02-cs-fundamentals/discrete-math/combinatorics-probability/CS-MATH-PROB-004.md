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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bloom Filter: Estrutura Probabilística de Pertencimento</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Vetor de m bits com k funções de hash independentes</text>
    
    <g transform="translate(50, 35)">
      <rect x="0" y="0" width="22" height="22" fill="#334155" stroke="#475569"/>
      <rect x="25" y="0" width="22" height="22" fill="#10b981" stroke="#34d399"/><text x="36" y="15" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
      <rect x="50" y="0" width="22" height="22" fill="#334155" stroke="#475569"/>
      <rect x="75" y="0" width="22" height="22" fill="#10b981" stroke="#34d399"/><text x="86" y="15" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
      <rect x="100" y="0" width="22" height="22" fill="#334155" stroke="#475569"/>
      <rect x="125" y="0" width="22" height="22" fill="#10b981" stroke="#34d399"/><text x="136" y="15" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
      <text x="220" y="15" fill="#94a3b8" font-size="10" font-family="monospace">... m bits no array</text>
    </g>
    <text x="280" y="75" fill="#fef3c7" font-size="10" text-anchor="middle">Falso Positivo Possível (Hash Collisions) | Falso Negativo IMPOSSÍVEL (Zero Falsos Negativos)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Se Bloom Filter diz 'NÃO': certeza absoluta de ausência (evita I/O de disco em Cassandra/RocksDB).</text>

</svg>

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
