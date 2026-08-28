---
id: DSA-STRUCT-TREE-000
title: "Definição e Propriedades Estruturais de uma Árvore Binária"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - company::apple
  - freq::high
---

## Pergunta
O que define formalmente uma **Árvore Binária** e quais são suas propriedades estruturais básicas?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Árvore Binária** é uma estrutura de dados hierárquica e não-linear composta por nós, onde:
  - Existe um nó raiz único (`root`) sem pai.
  - Cada nó possui **no máximo dois filhos**, denominados `left` (filho esquerdo) e `right` (filho direito).
  - Cada nó não-raiz possui exatamente um nó pai.
- Em uma árvore binária perfeitamente balanceada de altura $H$, ela pode armazenar até $2^{H+1} - 1$ nós, garantindo $H = \lfloor \log_2 N \rfloor$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Propriedade Fundamental de BST: Left &lt; Root &lt; Right (Busca O(h))</text>
  <g transform="translate(240, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="25" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">8</text>

    <!-- Left Subtree -->
    <line x1="85" y1="30" x2="45" y2="65" stroke="#10b981" stroke-width="2"/>
    <circle cx="40" cy="70" r="16" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="75" fill="#fff" font-size="11" text-anchor="middle">3</text>
    <text x="15" y="95" fill="#34d399" font-size="9">&lt; 8 (Esq)</text>

    <!-- Right Subtree -->
    <line x1="115" y1="30" x2="155" y2="65" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="160" cy="70" r="16" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
    <text x="160" y="75" fill="#fff" font-size="11" text-anchor="middle">10</text>
    <text x="155" y="95" fill="#fcd34d" font-size="9">&gt; 8 (Dir)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">A cada decisão de descida, metade dos nós da subárvore é eliminada: O(log N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Propriedade Fundamental de BST: Left &lt; Root &lt; Right (Busca O(h))</text>
  <g transform="translate(240, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="25" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">8</text>

    <!-- Left Subtree -->
    <line x1="85" y1="30" x2="45" y2="65" stroke="#10b981" stroke-width="2"/>
    <circle cx="40" cy="70" r="16" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="75" fill="#fff" font-size="11" text-anchor="middle">3</text>
    <text x="15" y="95" fill="#34d399" font-size="9">&lt; 8 (Esq)</text>

    <!-- Right Subtree -->
    <line x1="115" y1="30" x2="155" y2="65" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="160" cy="70" r="16" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
    <text x="160" y="75" fill="#fff" font-size="11" text-anchor="middle">10</text>
    <text x="155" y="95" fill="#fcd34d" font-size="9">&gt; 8 (Dir)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">A cada decisão de descida, metade dos nós da subárvore é eliminada: O(log N)</text>

</svg>

| Propriedade de Árvore | Fórmula Matemática | Exemplo ($H = 3$) |
|---|---|---|
| **Nós no nível $k$** | $2^k$ nós | Nível 3 tem até 8 nós |
| **Total de nós (Cheia)** | $2^{H+1} - 1$ nós | $H=3 \to 15$ nós |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Tipos Estruturais
- **Full Binary Tree**: Todo nó possui 0 ou 2 filhos.
- **Complete Binary Tree**: Todos os níveis estão totalmente preenchidos, exceto possivelmente o último, que é preenchido da esquerda para a direita (base para Heaps).
- **Perfect Binary Tree**: Todos os nós internos possuem 2 filhos e todas as folhas estão no mesmo nível.

#### Key Takeaways
- A propriedade de divisão binária reduz o espaço de busca pela metade a cada passo, sendo o alicerce de algoritmos $O(\log N)$.

</details>
