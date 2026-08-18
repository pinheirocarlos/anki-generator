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
