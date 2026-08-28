---
id: DSA-STRUCT-TREE-003
title: "Travessia In-order e Visita Ordenada em Árvores Binárias de Busca"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - company::amazon
  - freq::high
---

## Pergunta
Por que a travessia **In-order (Em-ordem)** visita os elementos de uma BST estritamente em ordem crescente?

## Resposta
### Quick Answer
**Solução Direta**:
- A travessia In-order segue a ordem recursiva rígida:
  1. Visitar recursivamente a **Subárvore Esquerda** (todos os nós $< \text{nó atual}$).
  2. Visitar o **Nó Atual** (valor mediano local).
  3. Visitar recursivamente a **Subárvore Direita** (todos os nós $> \text{nó atual}$).
- Pela própria invariante da BST, esse padrão garante que nenhum elemento maior seja processado antes de seus predecessores menores, gerando uma sequência monotônica estritamente ordenada em tempo linear $O(N)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Travessias em Árvore: In-Order (Ordenada), Pre-Order e Post-Order</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="80" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">In-Order (E, R, D)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Visita em ordem crescente</text>
    <text x="15" y="60" fill="#a7f3d0" font-size="10">Usado para validar BST</text>

    <rect x="180" y="0" width="160" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Pre-Order (R, E, D)</text>
    <text x="195" y="42" fill="#f8fafc" font-size="10">Visita raiz primeiro</text>
    <text x="195" y="60" fill="#93c5fd" font-size="10">Serialização e cópia</text>

    <rect x="360" y="0" width="180" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="450" y="20" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Post-Order (E, D, R)</text>
    <text x="375" y="42" fill="#f8fafc" font-size="10">Visita filhos primeiro</text>
    <text x="375" y="60" fill="#fde68a" font-size="10">Deleção e cálculo de altura</text>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Todas as travessias DFS clássicas executam em tempo O(N) e espaço O(h)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Travessias em Árvore: In-Order (Ordenada), Pre-Order e Post-Order</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="80" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">In-Order (E, R, D)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Visita em ordem crescente</text>
    <text x="15" y="60" fill="#a7f3d0" font-size="10">Usado para validar BST</text>

    <rect x="180" y="0" width="160" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Pre-Order (R, E, D)</text>
    <text x="195" y="42" fill="#f8fafc" font-size="10">Visita raiz primeiro</text>
    <text x="195" y="60" fill="#93c5fd" font-size="10">Serialização e cópia</text>

    <rect x="360" y="0" width="180" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="450" y="20" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Post-Order (E, D, R)</text>
    <text x="375" y="42" fill="#f8fafc" font-size="10">Visita filhos primeiro</text>
    <text x="375" y="60" fill="#fde68a" font-size="10">Deleção e cálculo de altura</text>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Todas as travessias DFS clássicas executam em tempo O(N) e espaço O(h)</text>

</svg>

| Ordem de Travessia | Sequência de Passos | Propriedade em BST |
|---|---|---|
| **In-order** | Esquerda $\to$ Raiz $\to$ Direita | Produz array ordenado ($O(N)$) |
| **Pre-order** | Raiz $\to$ Esquerda $\to$ Direita | Serialização da árvore |
| **Post-order** | Esquerda $\to$ Direita $\to$ Raiz | Liberação de memória / Bottom-up |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Validação de BST (LeetCode 98)
Um método eficiente para validar se uma árvore binária é uma BST válida consiste em executar uma travessia in-order e verificar se cada elemento visitado é estritamente maior que o elemento anterior (`prev < curr.val`).

#### Key Takeaways
- A travessia In-order é a forma mais direta de recuperar todos os $N$ elementos ordenados de uma BST em $O(N)$ tempo e $O(H)$ espaço de pilha.

</details>
