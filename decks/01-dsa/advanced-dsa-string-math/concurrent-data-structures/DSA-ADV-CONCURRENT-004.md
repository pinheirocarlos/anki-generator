---
id: DSA-ADV-CONCURRENT-004
title: "SkipList Concorrente (ConcurrentSkipListMap) para Mapas Ordenados Lock-Free"
tags:
  - level::l4-pleno
  - topic::dsa::concurrent-data-structures
  - company::amazon
  - freq::high
---

## Pergunta
Por que a **SkipList Concorrente (ConcurrentSkipListMap)** é preferida em relação a árvores balanceadas concorrentes (ex: AVL/Red-Black) para mapas ordenados thread-safe?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema em Árvores Balanceadas Concorrentes**: Uma inserção que dispara uma rotação de rebalanceamento (AVL ou Red-Black) precisa modificar múltiplos nós ancestrais até a raiz, exigindo travas globais ou travamento de árvore inteira, destruindo a escalabilidade multicore.
- **Vantagem da SkipList**: As inserções e deleções em uma SkipList envolvem apenas modificações de ponteiros locais em uma lista encadeada multinível:
  - Cada nível pode ser atualizado de forma independente via CAS.
  - Leituras (`get`, `containsKey`, `subMap`) são **100% lock-free e nunca bloqueiam**.
- **Complexidade**: $O(\log N)$ tempo médio para busca, inserção e remoção com alta concorrência.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/michael-scott-queue-two-cas-loop.webm">
    <p>Visualização: Fila encadeada com dois ponteiros atômicos (head e tail) com avanço do tail atrasado por threads concorrentes.</p>
  </video>
</div>

| Estrutura Ordenada | Custo de Modificação Concorrente | Escalabilidade Multithread |
|---|---|---|
| **Red-Black Tree Concorrente** | Rotações afetam árvore inteira | Baixa (Locks amplos) |
| **Concurrent SkipList** | Updates locais por ponteiros CAS | Altíssima (Lock-Free reads) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a estrutura de dados utilizada internamente no motor de armazenamento de bancos de dados modernos como Cassandra e RocksDB (MemTable).

</details>
