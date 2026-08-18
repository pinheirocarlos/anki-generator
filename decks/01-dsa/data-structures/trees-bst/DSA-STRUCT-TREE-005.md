---
id: DSA-STRUCT-TREE-005
title: "Degeneração de BST em Lista Ligada O(N) vs Garantia O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::meta
  - freq::high
---

## Pergunta
Como ocorre a **degeneração de uma BST simples em uma lista encadeada** com busca $O(N)$ no pior caso?

## Resposta
### Quick Answer
**Solução Direta**:
- Se inserirmos elementos já ordenados (ex: `1, 2, 3, 4, 5`) em uma BST ingênua sem auto-balanceamento:
  - Cada novo nó é inserido exclusivamente como filho direito do nó anterior.
  - A árvore se transforma em uma cadeia linear unidimensional (lista encadeada) de altura $H = N$.
- A complexidade de busca, inserção e remoção degrada de $O(\log N)$ para o pior caso desastroso de **$O(N)$ linear**.

### Dual Coding Visual
| Estrutura | Inserção Ordenada (`1,2,3,4`) | Custo de Busca de Alvo |
|---|---|---|
| **BST Ingênua** | Vira lista: `1->2->3->4` | $O(N)$ Pior Caso |
| **Árvore Balanceada** | Mantém `2` na raiz com `1` e `3,4` | $O(\log N)$ Garantido |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Essa vulnerabilidade de pior caso $O(N)$ torna a BST ingênua inadequada para sistemas de produção sem garantias de balanceamento (AVL, Red-Black ou B-Trees).

</details>
