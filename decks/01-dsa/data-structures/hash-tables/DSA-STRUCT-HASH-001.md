---
id: DSA-STRUCT-HASH-001
title: "Trade-offs de Cache e Memória: Separate Chaining vs Open Addressing"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::meta
  - freq::high
---

## Pergunta
Quais os trade-offs de desempenho de cache e alocação de memória entre **Separate Chaining** e **Open Addressing** (Linear Probing)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Separate Chaining**: Aloca cada entrada em um nó individual do Heap. Vantagem: suporta $\alpha > 1.0$ sem travar. Desvantagem: gera múltiplos ponteiros extras e frequentes cache misses.
- **Open Addressing (Linear Probing / Robin Hood)**: Todos os pares residem diretamente em um array contíguo plano. Quando ocorre colisão, procura o próximo slot livre ($i+1, i+2$). Vantagem: excelente localidade de cache CPU (leituras sequenciais). Desvantagem: exige $\alpha < 0.7$ para evitar *clustering* (agrupamento primário de colisões).

### Dual Coding Visual
| Característica | Separate Chaining | Open Addressing (Linear Probing) |
|---|---|---|
| **Localidade de Cache CPU** | Ruim (saltos no Heap) | Excelente (vetor contíguo) |
| **Overhead de Ponteiros** | Alto (8–16B por nó) | Zero ponteiros de nó |
| **Sensibilidade a $\alpha$** | Baixa ($alpha > 1$ ok) | Altíssima (degrada se $alpha > 0.8$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Robin Hood Hashing
Variante de Open Addressing onde elementos com maior distância de sua posição ideal "roubam" o slot de elementos com menor distância durante a inserção, equalizando a variância de busca e prevenindo picos de latência.

#### Key Takeaways
- Linguagens modernas de alta performance (Rust `HashMap`, C++ `absl::flat_hash_map`, Go `map`) utilizam variantes de Open Addressing contíguo devido à velocidade dos caches L1/L2.

</details>
