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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Nós Virtuais (Virtual Nodes / Vnodes) em Consistent Hashing</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Mapeamento de 1 Servidor Físico para 100-256 Tokens Distribuídos no Anel</text>

    <!-- Node Distribution -->
    <g transform="translate(20, 40)">
      <rect x="0" y="0" width="170" height="50" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Servidor A (Potente)</text>
      <text x="85" y="38" fill="#bae6fd" font-size="9" text-anchor="middle">200 Vnodes (Peso Maior)</text>

      <rect x="200" y="0" width="170" height="50" rx="4" fill="#065f46"/>
      <text x="285" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Servidor B (Padrão)</text>
      <text x="285" y="38" fill="#a7f3d0" font-size="9" text-anchor="middle">100 Vnodes</text>

      <rect x="400" y="0" width="160" height="50" rx="4" fill="#78350f"/>
      <text x="480" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Benefício Imediato</text>
      <text x="480" y="38" fill="#fde68a" font-size="9" text-anchor="middle">Zero Hotspots / Skew</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Vnodes garantem distribuição de carga homogênea com desvio padrão inferior a 3% entre partições.</text>

</svg>

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
