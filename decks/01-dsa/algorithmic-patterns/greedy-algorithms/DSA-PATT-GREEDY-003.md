---
id: DSA-PATT-GREEDY-003
title: "Fractional Knapsack vs 0/1 Knapsack e Ordenação por Densidade de Valor"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::meta
  - freq::high
---

## Pergunta
Por que a estratégia gulosa por **densidade de valor ($V/W$)** funciona perfeitamente para **Fractional Knapsack**, mas falha para **0/1 Knapsack**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fractional Knapsack (Mochila Fracionária)**: Como podemos levar frações contínuas de um item, ordenar por valor unitário $\frac{\text{valor}}{\text{peso}}$ e encher a mochila com os itens mais densos até a capacidade máxima garante matematicamente o maior lucro possível em $O(N \log N)$.
- **0/1 Knapsack (Mochila Discreta)**: Como os itens são indivisíveis (0 ou 1), pegar um item de alta densidade pode deixar um espaço residual vazio que não cabe mais nenhum outro item valioso, gerando desperdício e tornando a escolha gulosa subótima (exige DP).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/jump-game-max-reachable-index-loop.webm">
    <p>Visualização: Atualização contínua do índice máximo alcançável maxReach = max(maxReach, i + nums[i]) em tempo linear O(N).</p>
  </video>
</div>

| Variante da Mochila | Divisibilidade dos Itens | Algoritmo Ótimo |
|---|---|---|
| **Fracionária (Fractional)** | Permite frações de itens | **Greedy** ($O(N \log N)$ por $V/W$) |
| **Discreta (0/1)** | Apenas item inteiro (0 ou 1) | **DP** ($O(N \cdot W)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a demonstração clássica de como uma pequena mudança na restrição de negócio (discreto vs contínuo) altera o paradigma algorítmico de Guloso para Programação Dinâmica.

</details>
