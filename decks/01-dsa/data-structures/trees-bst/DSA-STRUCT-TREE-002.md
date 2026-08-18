---
id: DSA-STRUCT-TREE-002
title: "Invariante Fundamental de uma Árvore Binária de Busca (BST)"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - company::google
  - freq::high
---

## Pergunta
Qual é a invariante matemática fundamental que caracteriza uma **Árvore Binária de Busca (BST - Binary Search Tree)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Para todo nó $N$ da árvore:
  1. Todos os nós na subárvore esquerda possuem chaves **estritamente menores** que a chave de $N$ ($\text{left.val} < N.\text{val}$).
  2. Todos os nós na subárvore direita possuem chaves **estritamente maiores** que a chave de $N$ ($\text{right.val} > N.\text{val}$).
  3. Ambas as subárvores esquerda e direita são também árvores binárias de busca válidas.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bst-invariant-left-right-loop.webm">
    <p>Visualização: Invariante de busca binária: todos os nós na subárvore esquerda são menores e na direita são maiores que a raiz.</p>
  </video>
</div>

| Posição do Nó | Relação de Valor com $N$ | Direção de Busca para Alvo $X$ |
|---|---|---|
| **Subárvore Esquerda** | $\text{val} < N.\text{val}$ | Se $X < N.\text{val}$, vá para esquerda |
| **Subárvore Direita** | $\text{val} > N.\text{val}$ | Se $X > N.\text{val}$, vá para direita |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Busca em BST
```java
public class BSTSearch {
  public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    if (val < root.val) return searchBST(root.left, val);
    return searchBST(root.right, val);
  }
}
```

#### Key Takeaways
- A invariante da BST permite descartar metade da árvore a cada comparação durante a busca quando a árvore está balanceada.

</details>
