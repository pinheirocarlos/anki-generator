---
id: DSA-STRUCT-ADVTREE-005
title: "Conceito de Treap (Tree + Heap) e Resolução Probabilística de Balanceamento"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Como a estrutura **Treap (Cartesian Tree)** combina as propriedades de BST e Heap para manter balanceamento com alta probabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Treap** atribui a cada nó dois valores:
  1. Uma **Chave (`key`)**: Satisfaz estritamente a invariante de **BST** (esquerda $<$ chave $<$ direita).
  2. Uma **Prioridade (`priority`)**: Um número aleatório gerado no momento da inserção que satisfaz a invariante de **Max-Heap** ($\text{pai} \ge \text{filhos}$).
- Ao inserir um elemento:
  - Insere-o como folha seguindo as regras da BST.
  - Executa rotações para subir o nó até satisfazer a prioridade do Heap.
- Como as prioridades são aleatórias, a árvore é equivalente a uma BST construída por inserção em ordem aleatória, garantindo altura esperada $O(\log N)$ com alta probabilidade.

### Dual Coding Visual
| Dimensão do Nó | Invariante Satisfeita | Função na Estrutura |
|---|---|---|
| **`key` (Chave)** | BST ($	ext{left} < 	ext{key} < 	ext{right}$) | Busca de elementos ordenada |
| **`priority` (Aleatória)** | Max-Heap ($	ext{pai} \ge 	ext{filhos}$) | Garante balanceamento probabilístico |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Operações Especiais em Treap
- **`split(treap, k)`**: Divide a Treap em duas Treaps $T_1$ (chaves $\le k$) e $T_2$ (chaves $> k$) em $O(\log N)$.
- **`merge(T1, T2)`**: Funde duas Treaps em uma única em $O(\log N)$.

#### Key Takeaways
- Treaps (especialmente Treaps Implícitas) são a base para implementar vetores com inserção, remoção e inversão de intervalos em $O(\log N)$.

</details>
