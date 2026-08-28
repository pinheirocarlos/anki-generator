---
id: DSA-STRUCT-TREE-001
title: "Rotações Simples e Duplas em Árvores Auto-Balanceadas (AVL / Red-Black)"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::oracle
  - freq::high
---

## Pergunta
Como as rotações simples e duplas (LL, RR, LR, RL) reequilibram a altura de uma árvore auto-balanceada em tempo $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Rotações são operações locais de troca de ponteiros em tempo $O(1)$ que preservam estritamente a invariante de ordenação da BST enquanto diminuem a altura da subárvore:
  - **Rotação Simples à Direita (LL)**: Corrige desbalanceamento causado por inserção na subárvore esquerda do filho esquerdo. O filho esquerdo sobe para a raiz.
  - **Rotação Simples à Esquerda (RR)**: Corrige inserção no filho direito da direita. O filho direito sobe.
  - **Rotação Dupla (LR)**: Rotação à esquerda no filho esquerdo seguida de rotação à direita na raiz.
  - **Rotação Dupla (RL)**: Rotação à direita no filho direito seguida de rotação à esquerda na raiz.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rotação Simples AVL (LL) à Direita O(1)</text>
  <g transform="translate(100, 50)">
    <!-- Unbalanced -->
    <circle cx="80" cy="20" r="14" fill="#7f1d1d" stroke="#ef4444"/><text x="80" y="24" fill="#fff" font-size="10" text-anchor="middle">Y(+2)</text>
    <line x1="70" y1="30" x2="40" y2="55" stroke="#64748b"/>
    <circle cx="35" cy="65" r="14" fill="#1e293b" stroke="#f59e0b"/><text x="35" y="69" fill="#fff" font-size="10" text-anchor="middle">X(+1)</text>
    <line x1="25" y1="75" x2="10" y2="95" stroke="#64748b"/>
    <circle cx="10" cy="100" r="12" fill="#1e293b" stroke="#10b981"/><text x="10" y="104" fill="#fff" font-size="9" text-anchor="middle">Z</text>

    <!-- Arrow -->
    <path d="M 140 50 L 190 50" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="165" y="40" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">rotateRight</text>

    <!-- Balanced -->
    <g transform="translate(230, 0)">
      <circle cx="80" cy="20" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="24" fill="#fff" font-size="10" text-anchor="middle">X(0)</text>
      <line x1="70" y1="30" x2="40" y2="55" stroke="#64748b"/>
      <circle cx="35" cy="65" r="12" fill="#1e293b" stroke="#10b981"/><text x="35" y="69" fill="#fff" font-size="9" text-anchor="middle">Z</text>
      <line x1="90" y1="30" x2="120" y2="55" stroke="#64748b"/>
      <circle cx="125" cy="65" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="125" y="69" fill="#fff" font-size="9" text-anchor="middle">Y</text>
    </g>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Preserva a invariante BST com estritamente 3 trocas de ponteiros O(1)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rotação Simples AVL (LL) à Direita O(1)</text>
  <g transform="translate(100, 50)">
    <!-- Unbalanced -->
    <circle cx="80" cy="20" r="14" fill="#7f1d1d" stroke="#ef4444"/><text x="80" y="24" fill="#fff" font-size="10" text-anchor="middle">Y(+2)</text>
    <line x1="70" y1="30" x2="40" y2="55" stroke="#64748b"/>
    <circle cx="35" cy="65" r="14" fill="#1e293b" stroke="#f59e0b"/><text x="35" y="69" fill="#fff" font-size="10" text-anchor="middle">X(+1)</text>
    <line x1="25" y1="75" x2="10" y2="95" stroke="#64748b"/>
    <circle cx="10" cy="100" r="12" fill="#1e293b" stroke="#10b981"/><text x="10" y="104" fill="#fff" font-size="9" text-anchor="middle">Z</text>

    <!-- Arrow -->
    <path d="M 140 50 L 190 50" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="165" y="40" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">rotateRight</text>

    <!-- Balanced -->
    <g transform="translate(230, 0)">
      <circle cx="80" cy="20" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="24" fill="#fff" font-size="10" text-anchor="middle">X(0)</text>
      <line x1="70" y1="30" x2="40" y2="55" stroke="#64748b"/>
      <circle cx="35" cy="65" r="12" fill="#1e293b" stroke="#10b981"/><text x="35" y="69" fill="#fff" font-size="9" text-anchor="middle">Z</text>
      <line x1="90" y1="30" x2="120" y2="55" stroke="#64748b"/>
      <circle cx="125" cy="65" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="125" y="69" fill="#fff" font-size="9" text-anchor="middle">Y</text>
    </g>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Preserva a invariante BST com estritamente 3 trocas de ponteiros O(1)</text>

</svg>

| Tipo de Desbalanceamento | Caso | Rotação Necessária |
|---|---|---|
| **Esquerda-Esquerda** | LL | Rotação Simples à Direita ($O(1)$) |
| **Direita-Direita** | RR | Rotação Simples à Esquerda ($O(1)$) |
| **Esquerda-Direita** | LR | Rotação Dupla: Esquerda + Direita |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Rotação Simples à Direita
```java
private Node rotateRight(Node y) {
  Node x = y.left;
  Node t2 = x.right;

  // Realiza a rotação
  x.right = y;
  y.left = t2;

  // Atualiza alturas
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;

  return x; // Nova raiz
}
```

#### Key Takeaways
- Como apenas um número fixo de ponteiros é atualizado ($O(1)$ por rotação), a reinserção balanceada completa executa em $O(\log N)$.

</details>
