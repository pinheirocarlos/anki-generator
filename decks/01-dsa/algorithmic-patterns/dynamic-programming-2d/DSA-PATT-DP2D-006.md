---
id: DSA-PATT-DP2D-006
title: "Intuição Fundamental de DP 2D (Problema da Mochila): A Mala de Viagem com Limite de Peso"
tags:
  - level::l2-fundamental
  - topic::dsa::dynamic-programming-2d
  - company::amazon
  - freq::high
---

## Pergunta
Qual é o modelo mental de uma matriz de Programação Dinâmica 2D no clássico Problema da Mochila (Knapsack)?

## Resposta
### Quick Answer
**Solução Direta**:
- A **DP 2D** combina duas restrições simultâneas em uma grade: as **linhas representam os itens disponíveis** e as **colunas representam a capacidade atual de peso** da mochila.
- Para cada item $i$ e capacidade $w$, temos apenas duas escolhas lógicas:
  1. **Não levar o item**: O valor é o mesmo obtido com os itens anteriores para a mesma capacidade (`dp[i-1][w]`).
  2. **Levar o item**: Somamos o valor do item com o melhor valor que cabia no peso que sobrou (`valor[i] + dp[i-1][w - peso[i]]`).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Intuição da Mochila: Decisão de Incluir vs Excluir com Limite de Peso</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="130" y="22" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Opção 1: Não Levar o Item</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Mantém a capacidade w intacta.</text>
    <text x="15" y="60" fill="#fca5a5" font-size="10">Valor acumulado: dp[i-1][w]</text>

    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Opção 2: Levar o Item</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Ocupa wt[i] da mala e ganha val[i].</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Valor acumulado: dp[i-1][w - wt[i]] + val[i]</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">A DP compara as duas opções e guarda a melhor para cada capacidade de 0 a W</text>
</svg>
<p>Visualização: Intuição da mala de viagem: testar sistematicamente levar ou deixar cada item para cada quilo de capacidade disponível.</p>
| Decisão | Fórmula Matemática | Explicação Intuitiva |
|---|---|---|
| **Opção 1: Deixar o item de fora** | `dp[i-1][w]` | Fica com o valor que já tínhamos sem esse item |
| **Opção 2: Colocar na mochila** | `valor[i] + dp[i-1][w - peso[i]]` | Ganha o valor do item e soma com o melhor arranjo para o espaço restante |
| **Resultado da Célula** | `max(Opção 1, Opção 2)` | O computador escolhe automaticamente a opção mais vantajosa |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Ladrão no Museu
Um ladrão entra em um museu com uma mochila que suporta exatamente 10 kg:
- Ele vê um quadro pesado de 8 kg (vale R$ 10.000) e várias joias leves de 2 kg (valem R$ 4.000 cada).
- A DP 2D testa sistematicamente: se eu pegar o quadro, sobram 2 kg. Qual o item mais valioso de 2 kg? Se eu NÃO pegar o quadro, tenho 10 kg livres para encher de joias.

#### Outros Problemas Famosos Resolvidos com Matriz DP 2D
- **Longest Common Subsequence (LCS)**: Encontrar semelhanças entre dois códigos genéticos de DNA.
- **Edit Distance (Distância de Levenshtein)**: Número mínimo de letras para transformar a palavra `"gato"` em `"prato"` (usado no corretor ortográfico).

#### Key Takeaways
- Complexidade de tempo e espaço: $O(N \times W)$ (Pseudo-polinomial).

</details>
