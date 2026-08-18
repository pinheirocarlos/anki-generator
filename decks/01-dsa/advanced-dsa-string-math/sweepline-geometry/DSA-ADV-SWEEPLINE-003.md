---
id: DSA-ADV-SWEEPLINE-003
title: "Detecção de Interseção de Segmentos (Bentley-Ottmann) em O((N + K) log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Bentley-Ottmann** encontra todas as $K$ interseções entre $N$ segmentos de reta em $O((N + K) \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Testar todos os pares de segmentos custaria $O(N^2)$.
- **Bentley-Ottmann com Sweep-Line**:
  - Dois segmentos só podem se cruzar se forem **vizinhos adjacentes imediatos** no estado da linha de varredura (BST ordenada por $Y$).
  - **Eventos**: Ponto inicial de segmento, ponto final de segmento e ponto de interseção recém-descoberto.
  - A cada inserção/remoção na BST, testamos interseção **apenas entre os vizinhos adjacentes acima e abaixo**.
  - Ao encontrar uma interseção, inserimos o novo evento na fila para trocar a ordem relativa dos dois segmentos na BST após o cruzamento.
- **Complexidade**: $O((N + K) \log N)$ tempo.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/closest-pair-points-divide-strip-loop.webm">
    <p>Visualização: Divisão e conquista examinando apenas pontos dentro da faixa de largura 2d no retorno ordenado por Y.</p>
  </video>
</div>

| Abordagem | Pares Testados | Complexidade de Tempo |
|---|---|---|
| **Força Bruta** | Todos os $\binom{N}{2}$ pares | $O(N^2)$ |
| **Bentley-Ottmann (Sweep-Line)** | Apenas vizinhos adjacentes na BST | $O((N + K) \log N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz dramaticamente o processamento gráfico em sistemas CAD e renderização de polígonos.

</details>
