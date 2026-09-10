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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Intuição Gulosa: Pega Sempre o Maior Pedaço Disponível Imediatamente</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="15" width="90" height="45" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="45" y="42" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">R$ 50</text>

    <text x="115" y="42" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">→</text>

    <rect x="140" y="15" width="90" height="45" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="185" y="42" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">R$ 20</text>

    <text x="255" y="42" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">→</text>

    <rect x="280" y="15" width="90" height="45" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="325" y="42" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">R$ 5</text>

    <text x="395" y="42" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">→</text>

    <rect x="420" y="15" width="60" height="45" fill="#1e293b" stroke="#64748b" rx="4"/>
    <text x="450" y="42" fill="#94a3b8" font-size="12" text-anchor="middle">Troco 0</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Em sistemas canônicos de moedas, a escolha da maior nota minimiza o total de cédulas</text>
</svg>
<p>Visualização: Intuição gulosa do troco: priorizar sempre a cédula de maior valor disponível para minimizar a contagem total.</p>

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
