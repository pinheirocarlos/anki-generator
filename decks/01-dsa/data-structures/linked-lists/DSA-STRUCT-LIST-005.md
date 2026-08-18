---
id: DSA-STRUCT-LIST-005
title: "Mecânica Probabilística de Skip Lists para Busca em Tempo O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::redis
  - freq::high
---

## Pergunta
Como as **Skip Lists** alcançam busca, inserção e remoção em tempo $O(\log N)$ usando ponteiros multinível e aleatoriedade?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Skip List** sobrepõe múltiplas camadas de listas encadeadas ordenadas com atalhos:
  - A camada 0 (base) contém todos os $N$ elementos ordenados.
  - Cada camada superior $k$ atua como uma "pista expressa", contendo um subconjunto aleatório dos elementos da camada $k-1$ (geralmente com probabilidade $p = 1/2$).
- Durante a busca, caminhamos horizontalmente na camada mais alta até que o próximo valor seja maior que o alvo; em seguida, descemos verticalmente para a camada inferior.
- Essa descida em torre divide o espaço de busca pela metade a cada nível, atingindo $O(\log N)$ esperado.

### Dual Coding Visual
| Estrutura de Busca | Custo de Busca | Complexidade de Implementação |
|---|---|---|
| **Árvore Red-Black** | $O(\log N)$ Pior caso | Alta (Rotações e recolorações) |
| **Skip List** | $O(\log N)$ Esperado | Média (Ponteiros + `coinFlip`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Modelo de Torres da Skip List
```text
Level 3:  [Head] -------------------------> [30] -----------------> nil
Level 2:  [Head] -------------> [15] ------> [30] ------> [50] ----> nil
Level 1:  [Head] -----> [8] --> [15] ------> [30] ------> [50] ----> nil
Level 0:  [Head] -> [3]->[8]->[12]->[15]->[20]->[30]->[42]->[50]-> nil
```

#### Key Takeaways
- Skip Lists são utilizadas no **Redis (Sorted Sets / ZSET)** e em bancos de dados LSM-Tree (como LevelDB/RocksDB) porque são significativamente mais fáceis de sincronizar em ambientes concorrentes (*Lock-Free Skip Lists*) do que árvores balanceadas.

</details>
