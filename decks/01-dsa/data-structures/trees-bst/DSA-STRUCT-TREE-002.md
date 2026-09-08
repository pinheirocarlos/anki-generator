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

  <text x="340" y="26" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Invariante Global de BST: Subárvore Esquerda &lt; Nó Raiz &lt; Subárvore Direita</text>
  
  <g transform="translate(140, 45)">
    <!-- Root Node 50 -->
    <circle cx="200" cy="20" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="200" y="25" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">50</text>
    <rect x="160" y="42" width="80" height="18" fill="#0369a1" rx="3"/>
    <text x="200" y="54" fill="#e0f2fe" font-size="9" text-anchor="middle">Faixa: (-∞, +∞)</text>

    <!-- Left Child 30 -->
    <line x1="185" y1="28" x2="105" y2="72" stroke="#10b981" stroke-width="2"/>
    <circle cx="95" cy="78" r="16" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="95" y="83" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">30</text>
    <rect x="55" y="98" width="80" height="18" fill="#047857" rx="3"/>
    <text x="95" y="110" fill="#d1fae5" font-size="9" text-anchor="middle">Faixa: (-∞, 50)</text>

    <!-- Right Child 70 -->
    <line x1="215" y1="28" x2="295" y2="72" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="305" cy="78" r="16" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="305" y="83" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">70</text>
    <rect x="265" y="98" width="80" height="18" fill="#b45309" rx="3"/>
    <text x="305" y="110" fill="#fef3c7" font-size="9" text-anchor="middle">Faixa: (50, +∞)</text>
  </g>
  <text x="340" y="180" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Validação O(N): Cada nó herda estritamente o teto (upper bound) ou piso (lower bound) de seus ancestrais</text>
</svg>

<p>Visualização: Invariante da BST com subárvore esquerda estritamente menor e subárvore direita estritamente maior.</p>

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
