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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Degeneração de BST em Lista Ligada O(N) vs Balanceada O(log N)</text>
  <g transform="translate(80, 50)">
    <!-- Degenerate Skewed -->
    <text x="70" y="10" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">BST Degenerada (Pior Caso)</text>
    <circle cx="20" cy="30" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="20" y="34" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="28" y1="38" x2="42" y2="52" stroke="#ef4444"/>
    <circle cx="50" cy="60" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="50" y="64" fill="#fff" font-size="9" text-anchor="middle">2</text>
    <line x1="58" y1="68" x2="72" y2="82" stroke="#ef4444"/>
    <circle cx="80" cy="90" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="80" y="94" fill="#fff" font-size="9" text-anchor="middle">3</text>
    <text x="80" y="115" fill="#ef4444" font-size="10" font-weight="bold">Busca: O(N)</text>

    <!-- Balanced Tree -->
    <g transform="translate(280, 0)">
      <text x="80" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Árvore AVL / Red-Black</text>
      <circle cx="80" cy="30" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="34" fill="#fff" font-size="10" text-anchor="middle">2</text>
      <line x1="70" y1="40" x2="40" y2="60" stroke="#10b981"/>
      <circle cx="35" cy="70" r="12" fill="#1e293b" stroke="#10b981"/><text x="35" y="74" fill="#fff" font-size="9" text-anchor="middle">1</text>
      <line x1="90" y1="40" x2="120" y2="60" stroke="#10b981"/>
      <circle cx="125" cy="70" r="12" fill="#1e293b" stroke="#10b981"/><text x="125" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>
      <text x="80" y="115" fill="#10b981" font-size="10" font-weight="bold">Busca: O(log N)</text>
    </g>
  </g>
  <text x="340" y="175" fill="#f59e0b" font-size="11" text-anchor="middle">Inserções ordenadas sem auto-balanceamento transformam árvores em listas encadeadas</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Degeneração de BST em Lista Ligada O(N) vs Balanceada O(log N)</text>
  <g transform="translate(80, 50)">
    <!-- Degenerate Skewed -->
    <text x="70" y="10" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">BST Degenerada (Pior Caso)</text>
    <circle cx="20" cy="30" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="20" y="34" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="28" y1="38" x2="42" y2="52" stroke="#ef4444"/>
    <circle cx="50" cy="60" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="50" y="64" fill="#fff" font-size="9" text-anchor="middle">2</text>
    <line x1="58" y1="68" x2="72" y2="82" stroke="#ef4444"/>
    <circle cx="80" cy="90" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="80" y="94" fill="#fff" font-size="9" text-anchor="middle">3</text>
    <text x="80" y="115" fill="#ef4444" font-size="10" font-weight="bold">Busca: O(N)</text>

    <!-- Balanced Tree -->
    <g transform="translate(280, 0)">
      <text x="80" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Árvore AVL / Red-Black</text>
      <circle cx="80" cy="30" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="34" fill="#fff" font-size="10" text-anchor="middle">2</text>
      <line x1="70" y1="40" x2="40" y2="60" stroke="#10b981"/>
      <circle cx="35" cy="70" r="12" fill="#1e293b" stroke="#10b981"/><text x="35" y="74" fill="#fff" font-size="9" text-anchor="middle">1</text>
      <line x1="90" y1="40" x2="120" y2="60" stroke="#10b981"/>
      <circle cx="125" cy="70" r="12" fill="#1e293b" stroke="#10b981"/><text x="125" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>
      <text x="80" y="115" fill="#10b981" font-size="10" font-weight="bold">Busca: O(log N)</text>
    </g>
  </g>
  <text x="340" y="175" fill="#f59e0b" font-size="11" text-anchor="middle">Inserções ordenadas sem auto-balanceamento transformam árvores em listas encadeadas</text>

</svg>

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
