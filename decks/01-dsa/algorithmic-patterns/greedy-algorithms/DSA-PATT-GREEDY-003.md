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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mochila Fracionária: Ordenação por Densidade de Valor (val / wt)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Escolha Gulosa de Fração Contínua</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Itens ordenados decrescentemente pela razão r = val[i] / wt[i].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Consome itens inteiros; no último item fraciona: fração = capacidade_restante / wt[last].</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Guloso funciona em Mochila Fracionária O(N log N), mas FALHA na Mochila 0/1 (exige DP)</text>
</svg>
<p>Visualização: Mochila Fracionária ordenando itens por densidade de valor (valor/peso) para preenchimento guloso ótimo.</p>

| Variante da Mochila | Divisibilidade dos Itens | Algoritmo Ótimo |
|---|---|---|
| **Fracionária (Fractional)** | Permite frações de itens | **Greedy** ($O(N \log N)$ por $V/W$) |
| **Discreta (0/1)** | Apenas item inteiro (0 ou 1) | **DP** ($O(N \cdot W)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a demonstração clássica de como uma pequena mudança na restrição de negócio (discreto vs contínuo) altera o paradigma algorítmico de Guloso para Programação Dinâmica.

</details>
