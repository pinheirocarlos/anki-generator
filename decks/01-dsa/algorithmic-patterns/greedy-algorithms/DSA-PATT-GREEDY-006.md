---
id: DSA-PATT-GREEDY-006
title: "Intuição Fundamental de Algoritmos Gulosos: A Escolha do Maior Troco em Cédulas"
tags:
  - level::l2-fundamental
  - topic::dsa::greedy-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
O que caracteriza uma estratégia Gulosa (Greedy) e por que a escolha da melhor opção imediata local nem sempre garante a solução ótima global?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Algoritmo Guloso (Greedy)** toma em cada etapa a **decisão que parece mais vantajosa no momento presente**, sem voltar atrás e sem analisar o futuro a longo prazo.
- Funciona como dar troco no caixa: você entrega a maior cédula possível (R$ 50, R$ 20, R$ 10). Isso é muito rápido e funciona perfeitamente quando o problema tem a **Propriedade da Escolha Gulosa**, mas falha se o conjunto de opções for arbitrário.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Greedy: Pega Sempre o Maior Pedaço Disponível Imediatamente</text>

  <!-- Dar Troco de R$ 36 -->
  <g transform="translate(60, 45)">
    <rect x="0" y="0" width="130" height="60" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="65" y="25" fill="#a7f3d0" font-size="11" text-anchor="middle">Passo 1 (Guloso)</text>
    <text x="65" y="45" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Pega Nota R$ 20</text>
    <text x="65" y="80" fill="#34d399" font-size="10" text-anchor="middle">Resta R$ 16</text>

    <!-- Seta 1 -->
    <path d="M 140 30 L 175 30" fill="none" stroke="#10b981" stroke-width="2" />
    <polygon points="180,30 170,25 170,35" fill="#10b981" />

    <rect x="185" y="0" width="130" height="60" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="250" y="25" fill="#a7f3d0" font-size="11" text-anchor="middle">Passo 2 (Guloso)</text>
    <text x="250" y="45" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Pega Nota R$ 10</text>
    <text x="250" y="80" fill="#34d399" font-size="10" text-anchor="middle">Resta R$ 6</text>

    <!-- Seta 2 -->
    <path d="M 325 30 L 360 30" fill="none" stroke="#10b981" stroke-width="2" />
    <polygon points="365,30 355,25 355,35" fill="#10b981" />

    <rect x="370" y="0" width="105" height="60" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="422" y="25" fill="#a7f3d0" font-size="11" text-anchor="middle">Passos 3 e 4</text>
    <text x="422" y="45" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">R$ 5 + R$ 1</text>
    <text x="422" y="80" fill="#34d399" font-size="10" text-anchor="middle">Troco Pago!</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Total: 4 cédulas (Ótimo!). Mas se as moedas fossem [1, 3, 4] e troco = 6: Greedy pega 4+1+1 (3 moedas) vs Ótimo 3+3 (2 moedas!)</text>
</svg>

| Abordagem | Complexidade | Quando Usar |
|---|---|---|
| **Greedy (Guloso)** | Muito rápido ($O(N)$ ou $O(N \log N)$) | Quando a melhor escolha local comprovadamente leva ao ótimo global |
| **Dynamic Programming (DP)** | Mais lento ($O(N^2)$ ou $O(N \cdot W)$) | Quando a escolha gulosa pode levar a um resultado subótimo e é preciso testar caminhos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Faminto no Buffet
Um glutão faminto enche o prato com a primeira comida calórica que vê pela frente (estratégia gulosa). Isso sacia a fome rápido, mas no final do buffet ele percebe que não sobrou espaço no prato para a sobremesa especial.

#### Algoritmos Famosos que São Estritamente Gulosos
1. **Dijkstra**: Escolhe sempre o nó mais próximo da fila.
2. **Kruskal e Prim**: Escolhem sempre a aresta de menor peso.
3. **Huffman Coding**: Compactação de arquivos escolhendo os caracteres mais frequentes.
4. **Interval Scheduling**: Selecionar o maior número de palestras escolhendo sempre a palestra que **termina mais cedo**.

#### Key Takeaways
- É a primeira intuição a ser testada por ser simples e muito rápida. Se o trade-off exigir análise retroativa, mude para DP.

</details>
