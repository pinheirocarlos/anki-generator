---
id: DSA-PATT-BSEARCH-002
title: "Busca Binária de Limites: Lower Bound vs Upper Bound"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual e de invariante entre **Lower Bound** (primeira ocorrência) e **Upper Bound** (primeiro elemento maior que o alvo)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Lower Bound ($\ge \text{target}$)**: Encontra o primeiro índice $i$ onde $\text{arr}[i] \ge \text{target}$. Quando $\text{arr}[\text{mid}] \ge \text{target}$, guardamos `mid` como candidato e encolhemos a busca para a esquerda (`right = mid - 1`).
- **Upper Bound ($> \text{target}$)**: Encontra o primeiro índice $i$ onde $\text{arr}[i] > \text{target}$. Quando $\text{arr}[\text{mid}] > \text{target}$, guardamos `mid` e vamos para a esquerda (`right = mid - 1`).
- A contagem de elementos iguais ao alvo é dada por: $\text{count} = \text{upperBound} - \text{lowerBound}$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bisect-left-right-insertion-loop.webm">
    <p>Visualização: Localização da primeira ocorrência (Bisect Left) vs última ocorrência (Bisect Right) em arrays com duplicatas.</p>
  </video>
</div>

| Algoritmo | Condição de Encolhimento para a Esquerda | Retorno Típico |
|---|---|---|
| **Lower Bound** | `arr[mid] >= target` | Primeiro índice com valor $\ge \text{target}$ |
| **Upper Bound** | `arr[mid] > target` | Primeiro índice com valor $> \text{target}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base para resolver o problema clássico *Find First and Last Position of Element in Sorted Array* (LeetCode 34).

</details>
