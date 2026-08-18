---
id: DSA-STRUCT-ADVTREE-001
title: "Mecanismo de Lazy Propagation em Segment Trees para Atualizações de Intervalo em O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::amazon
  - freq::high
---

## Pergunta
Como o mecanismo de **Lazy Propagation (Propagação Preguiçosa)** permite atualizar intervalos completos $[L, R]$ em uma Segment Tree em tempo $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem Lazy Propagation, atualizar um intervalo $[L, R]$ exigiria visitar todas as folhas do intervalo em $O(N)$.
- **Lazy Propagation**:
  - Quando um nó da árvore está totalmente contido no intervalo de atualização $[L, R]$, atualizamos o valor agregado daquele nó imediatamente e registramos a pendência em um array auxiliar `lazy[node]`.
  - **Postergamos** a propagação para os filhos até que uma operação futura precise consultar aquela subárvore.
  - Ao visitar um nó com pendência, empurramos o valor para os filhos imediatos (`pushDown`) e limpamos o `lazy[node]`.
- **Complexidade**: Reduz a atualização de intervalo de $O(N)$ para **$O(\log N)$**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/segment-tree-lazy-propagation-loop.webm">
    <p>Visualização: Armazenamento do delta pendente no nó ancestral com propagação sob demanda aos filhos em O(log N).</p>
  </video>
</div>

| Estratégia de Range Update | Visita de Nós | Complexidade de Tempo |
|---|---|---|
| **Sem Lazy Propagation** | Visita todas as folhas no range | $O(N)$ Ineficiente |
| **Com Lazy Propagation** | Atualiza nó superior + marca lazy | $O(\log N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Lazy Propagation é essencial para problemas competitivos de grafos e intervalos onde ocorrem frequentes operações em lote sobre faixas de dados.

</details>
