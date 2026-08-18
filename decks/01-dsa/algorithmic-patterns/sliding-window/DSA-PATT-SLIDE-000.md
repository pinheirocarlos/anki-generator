---
id: DSA-PATT-SLIDE-000
title: "Conceito de Sliding Window e Redução de O(N·K) para O(N)"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
O que é o padrão **Sliding Window (Janela Deslizante)** e como ele reduz a complexidade de tempo de $O(N \cdot K)$ para $O(N)$ linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Em problemas sobre subarrays/substrings contíguos de tamanho $K$, a abordagem ingênua recalcula a propriedade da janela do zero a cada posição ($O(N \cdot K)$).
- O **Sliding Window** reaproveita o estado acumulado da janela anterior:
  - Ao deslizar a janela 1 posição para a direita, removemos o elemento que ficou para trás no início (`left`) e adicionamos o novo elemento que entrou no final (`right`).
- Como cada elemento entra e sai da janela exatamente uma única vez, o custo total é **$O(N)$ linear** com $O(1)$ por passo.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/sliding-window-loop.webm">
    <p>Visualização: Janela deslizante de tamanho K adicionando elemento à direita e removendo à esquerda com atualização delta O(1).</p>
  </video>
</div>

| Abordagem | Cálculo por Deslizamento | Complexidade Total |
|---|---|---|
| **Força Bruta** | Recalcula todos os $K$ itens | $O(N \cdot K)$ ou $O(N^2)$ |
| **Sliding Window** | $\text{soma} += \text{entra} - \text{sai}$ | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O princípio fundamental é transformar um problema quadrático de recálculo em um problema linear de atualização delta ($+ \text{in} - \text{out}$).

</details>
