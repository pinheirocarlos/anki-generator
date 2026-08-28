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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Subarray Product Less Than K: Contagem Cumulativa right - left + 1</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Contagem de Novos Subarrays Terminando em 'right'</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o produto [left...right] &lt; K, todos os subarrays terminando em right são válidos.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11" font-family="monospace">count += (right - left + 1)</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Evita enumeração combinatória quadrática: Tempo O(N), Espaço O(1)</text>

</svg>

| Variável de Controle | Significado | Condição de Janela Válida |
|---|---|---|
| **`required`** | Total de caracteres únicos em $T$ | Constante |
| **`formed`** | Quantidade de caracteres atendidos na janela | Válida quando `formed == required` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de uma variável escalar `formed` evita comparar o mapa inteiro a cada passo ($O(|\Sigma|)$), mantendo cada avanço em tempo estritamente $O(1)$.

</details>
