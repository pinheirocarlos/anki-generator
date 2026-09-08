---
id: DSA-PATT-BSEARCH-006
title: "Intuição Fundamental de Busca Binária: O Jogo do Número Maior ou Menor"
tags:
  - level::l2-fundamental
  - topic::dsa::binary-search
  - company::google
  - freq::high
---

## Pergunta
Por que dividir o espaço de busca pela metade (Busca Binária) é tão incrivelmente rápido ($O(\log N)$) mesmo em listas gigantescas?

## Resposta
### Quick Answer
**Solução Direta**:
- Em uma coleção **já ordenada**, a **Busca Binária** olha para o elemento central (`mid`): se o valor buscado for menor, descartamos toda a metade direita; se for maior, descartamos toda a metade esquerda.
- Como o problema é **dividido por 2 a cada tentativa**, podemos encontrar qualquer item entre 1 bilhão de elementos em no máximo **30 comparações** ($O(\log N)$).

### Dual Coding Visual
<svg viewBox="0 0 600 180" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="180" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Busca Binária por 37: Compara com o Meio e Descarta 50% dos Dados</text>

  <!-- Array Ordenado -->
  <g transform="translate(40, 50)">
    <!-- 0: 5 (Descartado) -->
    <rect x="0" y="0" width="60" height="45" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3" opacity="0.4" />
    <text x="30" y="28" fill="#475569" font-size="13" font-family="sans-serif" text-anchor="middle">5</text>

    <!-- 1: 12 (Descartado) -->
    <rect x="65" y="0" width="60" height="45" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3" opacity="0.4" />
    <text x="95" y="28" fill="#475569" font-size="13" font-family="sans-serif" text-anchor="middle">12</text>

    <!-- 2: 20 (Descartado) -->
    <rect x="130" y="0" width="60" height="45" fill="#1e293b" stroke="#334155" stroke-width="1" rx="3" opacity="0.4" />
    <text x="160" y="28" fill="#475569" font-size="13" font-family="sans-serif" text-anchor="middle">20</text>

    <!-- 3: 28 (Meio Atual - 28 < 37) -->
    <rect x="195" y="0" width="65" height="45" fill="#78350f" stroke="#f59e0b" stroke-width="2" rx="4" />
    <text x="227" y="28" fill="#fde68a" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">28</text>
    <text x="227" y="65" fill="#f59e0b" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">Mid (28 &lt; 37)</text>

    <!-- 4: 37 (Alvo!) -->
    <rect x="265" y="0" width="60" height="45" fill="#065f46" stroke="#10b981" stroke-width="2.5" rx="4" />
    <text x="295" y="28" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle">37</text>
    <text x="295" y="65" fill="#10b981" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">Alvo</text>

    <!-- 5: 45 -->
    <rect x="330" y="0" width="60" height="45" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3" />
    <text x="360" y="28" fill="#93c5fd" font-size="13" font-family="sans-serif" text-anchor="middle">45</text>

    <!-- 6: 60 -->
    <rect x="395" y="0" width="60" height="45" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3" />
    <text x="425" y="28" fill="#93c5fd" font-size="13" font-family="sans-serif" text-anchor="middle">60</text>

    <!-- 7: 82 -->
    <rect x="460" y="0" width="60" height="45" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3" />
    <text x="490" y="28" fill="#93c5fd" font-size="13" font-family="sans-serif" text-anchor="middle">82</text>
  </g>

  <!-- Indicação de Descarte -->
  <text x="130" y="150" fill="#ef4444" font-size="11" font-family="sans-serif">❌ Toda metade esquerda eliminada</text>
  <text x="410" y="150" fill="#10b981" font-size="11" font-family="sans-serif">✓ Nova busca apenas na metade direita</text>
</svg>
<p>Visualização: Abertura e corte ao meio descartando 50% dos dados a cada palpite no espaço de busca ordenado.</p>

| Quantidade de Itens ($N$) | Busca Linear ($O(N)$) | Busca Binária ($O(\log N)$) |
|---|---|---|
| 1.000 | Até 1.000 comparações | No máximo **10 comparações** |
| 1.000.000 | Até 1.000.000 comparações | No máximo **20 comparações** |
| 1.000.000.000 | Até 1.000.000.000 comparações | No máximo **30 comparações** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Poder do Crescimento Logarítmico
Dobre o tamanho da sua base de dados de 1 milhão para 2 milhões: a busca linear dobra o tempo de execução, mas a busca binária adiciona **apenas 1 única comparação a mais**.

#### A Condição Obrigatória
A busca binária exige que os dados estejam **ordenados** (ou que o problema tenha uma propriedade monótona de "falso até certo ponto, e verdadeiro a partir dali").

#### Key Takeaways
- Fórmula padrão: `mid = low + (high - low) / 2` (evita estouro de inteiros).
- Usada não apenas para buscar itens em arrays, mas também para encontrar valores ótimos em problemas de otimização ("Binary Search on Answer").

</details>
