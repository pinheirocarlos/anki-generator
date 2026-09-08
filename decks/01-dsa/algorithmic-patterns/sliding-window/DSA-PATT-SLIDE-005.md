---
id: DSA-PATT-SLIDE-005
title: "Minimum Window Substring em O(N) com Contadores de Frequência"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
Como implementar o clássico hard **Minimum Window Substring** (LeetCode 76) em tempo linear $O(N)$ e espaço $O(|\Sigma|)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Contamos a frequência dos caracteres da string alvo $T$ em um mapa `targetMap` e mantemos uma variável `formed` contando quantos caracteres únicos atingiram a frequência necessária.
- Expandimos `right`:
  - Se `windowMap[c] == targetMap[c]`, incrementamos `formed++`.
- Quando `formed == required` (janela válida contendo todo $T$):
  - Atualizamos a menor janela encontrada.
  - Contraímos `left++` removendo caracteres até que a janela deixe de ser válida (`formed--`).
- **Complexidade**: $O(|S| + |T|)$ tempo e $O(|\Sigma|)$ espaço (onde $|\Sigma| \le 128$ para ASCII).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Minimum Window Substring: Contador de Caracteres Válidos</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="560" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Hash Map de Necessidades (need) vs Janela Atual (window)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">matchCount rastreia quantos caracteres únicos do padrão atingiram a frequência mínima.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Quando matchCount == need.size: janela é válida ➔ encolhe Left buscando tamanho mínimo.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo O(N) com contadores em tabela ASCII/Hash Map de tamanho fixo O(1)</text>
</svg>
<p>Visualização: Contração de Minimum Window Substring mantendo os contadores de frequência dos caracteres do padrão.</p>

| Variável de Controle | Significado | Condição de Janela Válida |
|---|---|---|
| **`required`** | Total de caracteres únicos em $T$ | Constante |
| **`formed`** | Quantidade de caracteres atendidos na janela | Válida quando `formed == required` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de uma variável escalar `formed` evita comparar o mapa inteiro a cada passo ($O(|\Sigma|)$), mantendo cada avanço em tempo estritamente $O(1)$.

</details>
