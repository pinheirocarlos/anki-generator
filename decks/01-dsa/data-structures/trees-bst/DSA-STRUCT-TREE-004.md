---
id: DSA-STRUCT-TREE-004
title: "Trade-offs Práticos: Árvores AVL vs Red-Black Trees em Bibliotecas Padrão"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::google
  - freq::high
---

## Pergunta
Quais são os trade-offs práticos entre **Árvores AVL** e **Red-Black Trees** e por que Red-Black Trees são predominantes em bibliotecas padrão de linguagens?

## Resposta
### Quick Answer
**Solução Direta**:
- **Árvores AVL**:
  - Balanceamento estrito ($|\text{alt}(E) - \text{alt}(D)| \le 1$).
  - Árvore mais rasa e compacta $\to$ **Buscas mais rápidas**.
  - Exige mais rotações em inserções e deleções. Ideal para cenários *Read-Heavy*.
- **Red-Black Trees**:
  - Balanceamento mais frouxo (o caminho mais longo tem no máximo o dobro do mais curto).
  - Exige no máximo **2 rotações por inserção** e 3 por deleção $\to$ **Inserções e deleções muito mais rápidas**.
  - Escolhida para `std::map` (C++), `TreeMap` (Java) e o escalonador CFS do kernel Linux (*Workloads mistos*).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/avl-vs-redblack-rotations-loop.webm">
    <p>Visualização: AVL com balanceamento rígido (delta h <= 1) vs Red-Black com no máximo 3 rotações por inserção.</p>
  </video>
</div>

| Critério | Árvore AVL | Red-Black Tree |
|---|---|---|
| **Foco de Performance** | Leituras ultra-rápidas | Inserções / Deleções rápidas |
| **Altura Máxima** | $\approx 1.44 \log_2 N$ | $\approx 2 \log_2 N$ |
| **Uso em Bibliotecas** | Caches / Índices estáticos | `java.util.TreeMap`, C++ STL |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Red-Black Trees amortizam muito melhor o custo de rebalanceamento contínuo sob intensa taxa de modificação de dados.

</details>
