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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">ConcurrentSkipList: Deleção em Duas Fases com Nós Marcadores</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fase 1: Marcação Lógica | Fase 2: Desvinculação Física</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Insere nó marcador atômico no ponteiro next (CAS) sinalizando deleção lógica.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Qualquer thread concorrente que encontrar o marcador auxilia na remoção física em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Mapas e conjuntos ordenados lock-free com busca, inserção e deleção em O(log N)</text>
</svg>
<p>Visualização: SkipList concorrente realizando remoção lock-free em duas etapas com nós marcadores lógicos atômicos.</p>

| Estrutura Ordenada | Custo de Modificação Concorrente | Escalabilidade Multithread |
|---|---|---|
| **Red-Black Tree Concorrente** | Rotações afetam árvore inteira | Baixa (Locks amplos) |
| **Concurrent SkipList** | Updates locais por ponteiros CAS | Altíssima (Lock-Free reads) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a estrutura de dados utilizada internamente no motor de armazenamento de bancos de dados modernos como Cassandra e RocksDB (MemTable).

</details>
