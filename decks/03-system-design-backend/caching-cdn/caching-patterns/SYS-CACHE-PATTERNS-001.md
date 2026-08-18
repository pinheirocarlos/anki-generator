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
