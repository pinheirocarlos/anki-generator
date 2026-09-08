---
id: SYS-CACHE-PATTERNS-001
title: "Políticas de Evicção de Cache: LRU, LFU, ARC e TinyLFU"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::netflix
  - freq::high
---

## Pergunta
Como a política de evicção LRU (Least Recently Used) se compara à LFU (Least Frequently Used) e por que sistemas modernos adotam W-TinyLFU?

## Resposta
### Quick Answer
**Solução Direta**:
- **LRU (Least Recently Used)**: Descarta o item acessado há mais tempo (implementado com HashMap + Doubly Linked List em $O(1)$). Vulnerável a poluição por varreduras pontuais (*Scan Pollution*).
- **LFU (Least Frequently Used)**: Descarta o item com menor frequência de acessos. Vulnerável a itens antigos com contadores históricos inflados que nunca são removidos (*Frequency Pollution*).
- **W-TinyLFU (Caffeine Cache / Redis)**:
  - Combina uma pequena janela de admissão LRU para itens novos com um filtro probabilístico **Count-Min Sketch** com mecanismo de decaimento temporal.
  - Garante taxas de acerto (*Hit Rate*) superiores a qualquer algoritmo clássico isolado.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Políticas de Evicção: LRU vs LFU vs ARC vs W-TinyLFU</text>
  <g transform="translate(40, 50)">
    <!-- LRU -->
    <rect x="0" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">LRU (Least Recently Used)</text>
    <text x="140" y="42" fill="#cbd5e1" font-size="10" text-anchor="middle">Doubly-Linked List + Hash Map O(1). Vulnerável a Scan Pollution.</text>
    <text x="140" y="56" fill="#94a3b8" font-size="9" text-anchor="middle">Evita elementos acessados há mais tempo.</text>

    <!-- LFU -->
    <rect x="320" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">LFU (Least Frequently Used)</text>
    <text x="460" y="42" fill="#cbd5e1" font-size="10" text-anchor="middle">Contadores de frequência. Risco de 'Frequency Starvation' de novos dados.</text>
    <text x="460" y="56" fill="#94a3b8" font-size="9" text-anchor="middle">Itens antigos acumulam contagens altas e não saem.</text>

    <!-- W-TinyLFU (Caffeine / Modern Caches) -->
    <rect x="0" y="80" width="600" height="60" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="102" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">W-TinyLFU: Window Cache (Recência) + Count-Min Sketch (Frequência Compacta)</text>
    <text x="300" y="122" fill="#cbd5e1" font-size="10" text-anchor="middle">Combina o melhor de LRU (absorve rajadas) com LFU de 4 bits por item via Bloom-like hashing com decay periódico.</text>
  </g>
  <text x="340" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">W-TinyLFU atinge taxas de hit próximas de 99% em benchmarks de servidores de alta escala.</text>

</svg>
<p>Visualização: Política W-TinyLFU combinando Window Cache para recência com Count-Min Sketch para frequência com 99% de hit ratio.</p>

| Política de Evicção | Critério de Descarte | Vulnerabilidade Típica |
|---|---|---|
| **LRU** | Menor recência (acessado há mais tempo) | Varreduras completas limpam o cache útil |
| **LFU** | Menor frequência de acessos | Itens históricos obsoletos travam o espaço |
| **W-TinyLFU** | Equilíbrio entre recência e frequência com decaimento | Complexidade de estrutura (otimizado em bibliotecas) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação de LRU em Go ($O(1)$)
```go
package main

import "container/list"

type LRUCache struct {
  capacity int
  items    map[string]*list.Element
  order    *list.List
}
type entry struct { key, value string }
// Get move elemento para frente do list; Put insere na frente e remove do fundo se lotado
```

</details>
