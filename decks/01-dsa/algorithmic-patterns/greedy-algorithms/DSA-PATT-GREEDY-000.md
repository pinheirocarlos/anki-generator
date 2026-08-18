---
id: DSA-PATT-GREEDY-000
title: "Propriedade da Escolha Gulosa (Greedy-Choice Property) vs Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual e de garantias entre a **Escolha Gulosa (Greedy)** e a **Programação Dinâmica (DP)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo Guloso (Greedy)**: Toma a melhor decisão local no momento atual **sem jamais voltar atrás (*no backtracking*)**, assumindo que escolhas locais ótimas levarão à solução global ótima. Roda em $O(N)$ ou $O(N \log N)$.
- **Programação Dinâmica (DP)**: Avalia **todas as escolhas locais possíveis** através de subproblemas sobrepostos, tomando a decisão ótima após ponderar o impacto futuro.
- **Quando usar Greedy**: Somente quando for possível provar matematicamente a **Propriedade da Escolha Gulosa** e a **Subestrutura Ótima**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/greedy-choice-property-step-loop.webm">
    <p>Visualização: Escolha local ótima a cada passo sem reavaliação ou backtracking em problemas com propriedade gulosa.</p>
  </video>
</div>

| Paradigma | Decisão e Exploração | Custo Típico |
|---|---|---|
| **Greedy (Guloso)** | Irrevogável / 1 único caminho | $O(N)$ / $O(N log N)$ |
| **DP (Dinâmica)** | Avalia todas as transições | $O(N^2)$ / $O(N cdot W)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Se a escolha gulosa falhar em cobrir o caso ótimo (como na Mochila 0/1 com itens inteiros), deve-se usar Programação Dinâmica.

</details>
