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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/binary-tree-properties-loop.webm">
    <p>Visualização: Divisão hierárquica por níveis k com até 2^k nós e capacidade máxima 2^(H+1)-1.</p>
  </video>
</div>

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
