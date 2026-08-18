---
id: SYS-DIST-SHARDING-001
title: "Nós Virtuais (Virtual Nodes) para Distribuição Uniforme e Hotspots"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::discord
  - freq::high
---

## Pergunta
Por que a técnica de Nós Virtuais (Virtual Nodes / Vnodes) é essencial no Consistent Hashing para evitar desbalanceamento de carga (*Hotspots*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem nós virtuais, uma quantidade pequena de servidores físicos pode se posicionar de forma não uniforme no anel hash, criando segmentos desproporcionalmente grandes onde um servidor recebe muito mais tráfego que os outros.
- **Nós Virtuais**: Cada servidor físico é mapeado para **múltiplos pontos discretos no anel** (ex: 100 a 300 réplicas virtuais por nó com hashes como `hash("ServerA#1")`, `hash("ServerA#2")`).
- **Benefícios**:
  - Distribuição estatisticamente uniforme de dados e tráfego.
  - Permite atribuir pesos diferentes para servidores heterogêneos (um servidor com o dobro de RAM/CPU recebe o dobro de vnodes).

### Dual Coding Visual
| Abordagem | Distribuição de Chaves | Tratamento de Hardware Heterogêneo |
|---|---|---|
| **1 Ponto Físico por Nó** | Altamente irregular (Risco de Hotspots) | Não suporta proporcionalidade |
| **100-300 Vnodes por Nó** | Distribuição quase perfeitamente gaussiana | Suporta pesos dinâmicos por capacidade |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Busca Binária no Hash Ring
```go
package main

import (
  "crypto/sha256"
  "sort"
)

type HashRing struct {
  vnodes []uint32          // Hashes ordenados no anel
  nodes  map[uint32]string // Mapeamento vnode_hash -> physical_node_id
}

func (r *HashRing) GetNode(key string) string {
  if len(r.vnodes) == 0 { return "" }
  h := hash(key)
  // Busca binária pelo primeiro nó >= h no anel circular
  idx := sort.Search(len(r.vnodes), func(i int) bool {
    return r.vnodes[i] >= h
  })
  if idx == len(r.vnodes) { idx = 0 } // Wrap-around circular
  return r.nodes[r.vnodes[idx]]
}
```

</details>
