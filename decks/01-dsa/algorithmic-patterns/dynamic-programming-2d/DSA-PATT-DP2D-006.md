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
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Matriz DP da Mochila: Decisão de Incluir vs Excluir cada Item</text>

  <!-- Tabela / Matriz 2D -->
  <g transform="translate(60, 45)">
    <!-- Cabeçalho de Colunas (Capacidade de Peso) -->
    <text x="70" y="15" fill="#94a3b8" font-size="10" font-family="monospace">Peso 0kg</text>
    <text x="140" y="15" fill="#94a3b8" font-size="10" font-family="monospace">Peso 1kg</text>
    <text x="210" y="15" fill="#94a3b8" font-size="10" font-family="monospace">Peso 2kg</text>
    <text x="280" y="15" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold">Peso 3kg</text>

    <!-- Linha 1: Item 1 (Notebook - 2kg, R$3k) -->
    <text x="-10" y="45" fill="#f8fafc" font-size="10" font-family="sans-serif">Item 1 (2kg, R$3k)</text>
    <rect x="130" y="30" width="55" height="24" fill="#1e293b" stroke="#334155" rx="3" />
    <text x="157" y="46" fill="#94a3b8" font-size="11" text-anchor="middle">R$ 0</text>

    <rect x="200" y="30" width="55" height="24" fill="#1e293b" stroke="#334155" rx="3" />
    <text x="227" y="46" fill="#94a3b8" font-size="11" text-anchor="middle">R$ 3k</text>

    <rect x="270" y="30" width="55" height="24" fill="#1e293b" stroke="#334155" rx="3" />
    <text x="297" y="46" fill="#94a3b8" font-size="11" text-anchor="middle">R$ 3k</text>

    <!-- Linha 2: Item 2 (Câmera - 1kg, R$2k) -->
    <text x="-10" y="80" fill="#f8fafc" font-size="10" font-family="sans-serif">Item 2 (1kg, R$2k)</text>
    <rect x="130" y="65" width="55" height="24" fill="#1e293b" stroke="#334155" rx="3" />
    <text x="157" y="81" fill="#94a3b8" font-size="11" text-anchor="middle">R$ 2k</text>

    <rect x="200" y="65" width="55" height="24" fill="#1e293b" stroke="#334155" rx="3" />
    <text x="227" y="81" fill="#94a3b8" font-size="11" text-anchor="middle">R$ 3k</text>

    <!-- Célula Ótima Destacada -->
    <rect x="270" y="65" width="55" height="24" fill="#065f46" stroke="#10b981" stroke-width="2" rx="3" />
    <text x="297" y="81" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">R$ 5k</text>
  </g>

  <!-- Explicação -->
  <g transform="translate(420, 55)">
    <rect x="0" y="0" width="150" height="75" fill="#1e293b" stroke="#10b981" stroke-width="1" rx="6" />
    <text x="75" y="22" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Decisão para 3kg:</text>
    <text x="75" y="40" fill="#f8fafc" font-size="9" text-anchor="middle">Levar Câmera (R$2k) +</text>
    <text x="75" y="55" fill="#f8fafc" font-size="9" text-anchor="middle">melhor para 2kg (R$3k)</text>
    <text x="75" y="68" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">= R$ 5k Ótimo!</text>
  </g>

  <text x="300" y="165" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Cada célula da matriz responde: "Qual o maior valor possível usando os primeiros i itens com limite w?"</text>
</svg>

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
