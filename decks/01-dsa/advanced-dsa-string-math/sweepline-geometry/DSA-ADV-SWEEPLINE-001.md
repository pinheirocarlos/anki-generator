---
id: DSA-ADV-SWEEPLINE-001
title: "Fecho Convexo (Convex Hull) com Monotone Chain de Andrew e Graham Scan em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo **Monotone Chain de Andrew** constrói o Fecho Convexo (Convex Hull) de um conjunto de pontos 2D em $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Ordena todos os $N$ pontos lexicograficamente por $X$ (e depois por $Y$) em $O(N \log N)$.
- 2. **Construção da Casca Inferior (*Lower Hull*)**:
  - Para cada ponto $P$: enquanto a pilha tiver $\ge 2$ pontos e os últimos 3 pontos não formarem uma curva para a esquerda (produto vetorial $\le 0$), desempilha o ponto anterior.
- 3. **Construção da Casca Superior (*Upper Hull*)**:
  - Repete o mesmo processo iterando os pontos em ordem reversa.
- 4. A união das duas cascas forma o Fecho Convexo mínimo.
- **Produto Vetorial 2D (Cross Product)**:
  $$\text{cross}(A, B, C) = (B_x - A_x)(C_y - A_y) - (B_y - A_y)(C_x - A_x)$$
  - Se $> 0$: Curva para a esquerda (anti-horário, válido). Se $\le 0$: Curva para a direita ou colinear (inválido).

### Dual Coding Visual
| Sinal do Produto Vetorial | Orientação dos 3 Pontos | Ação na Pilha Monótona |
|---|---|---|
| $\text{cross}(A, B, C) > 0$ | Curva estritamente para a esquerda | Adiciona ponto $C$ |
| $\text{cross}(A, B, C) \le 0$ | Curva para a direita ou reto | Desempilha $B$ (viola convexidade) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O algoritmo Monotone Chain de Andrew é numericamente mais estável e fácil de implementar que o Graham Scan clássico por evitar cálculos trigonométricos de ângulos polares (`atan2`).

</details>
