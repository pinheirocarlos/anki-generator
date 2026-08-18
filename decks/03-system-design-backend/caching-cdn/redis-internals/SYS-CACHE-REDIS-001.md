---
id: SYS-CACHE-REDIS-001
title: "Estruturas de Dados Internas do Redis: SDS, ZipList e SkipList (ZSet)"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::redis
  - freq::high
---

## Pergunta
Como o Redis implementa Sorted Sets (ZSet) combinando internamente uma SkipList e uma Hash Table para obter operações de busca e ranking em $O(\log N)$ e $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A estrutura **Sorted Set (ZSet)** do Redis atende a dois casos de uso distintos com máxima eficiência combinando:
  1. **Hash Table**: Mapeia `Member -> Score` para consultas de pontuação em tempo constante **$O(1)$** (ex: `ZSCORE`).
  2. **SkipList (Lista com Saltos)**: Mantém os elementos ordenados por pontuação (`Score`), permitindo inserções, remoções e consultas por ranking/faixa em tempo logarítmico **$O(\log N)$** (ex: `ZRANGEBYSCORE`, `ZRANK`).
- Para conjuntos pequenos com poucos elementos, o Redis utiliza codificações compactas em memória (**ZipList / ListPack**) economizando até $80\%$ de RAM.

### Dual Coding Visual
| Operação no ZSet | Estrutura Interna Utilizada | Complexidade de Tempo |
|---|---|---|
| `ZSCORE member` | Hash Table | $O(1)$ |
| `ZRANGEBYSCORE min max` | SkipList | $O(\log N + M)$ |
| `ZRANK member` | SkipList com contadores de largura (*Span*) | $O(\log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como a SkipList Calcula o Ranking ($O(\log N)$)
- Cada ponteiro entre nós na SkipList do Redis armazena um atributo `span` (quantos nós aquele salto pula). O ranking é calculado somando os `spans` percorridos do topo até o elemento alvo, sem precisar contar nós um a um.

</details>
