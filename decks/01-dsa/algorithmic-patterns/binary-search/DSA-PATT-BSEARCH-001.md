---
id: DSA-PATT-BSEARCH-001
title: "Paradigma de Binary Search on Answer / Solution Space (Koko Eating Bananas)"
tags:
  - level::l4-pleno
  - topic::dsa::binary-search
  - company::google
  - freq::high
---

## Pergunta
Como funciona o paradigma de **Binary Search on Answer** para encontrar o valor ótimo em problemas de otimização monotônica?

## Resposta
### Quick Answer
**Solução Direta**:
- Quando não temos um array ordenado explícito, mas o espaço de respostas possíveis é limitado em uma faixa contínua $[\text{minAns}, \text{maxAns}]$ e satisfaz a propriedade de **Monotonicidade**:
  - Se uma resposta $K$ é viável (função `isValid(K) == true`), qualquer valor $> K$ também é viável (ou vice-versa).
- Executamos a busca binária sobre o valor da resposta:
  - Testamos `mid = left + (right - left) / 2`.
  - Se `isValid(mid)` for verdadeiro, registramos `ans = mid` e tentamos um valor menor (`right = mid - 1`).
  - Se falso, aumentamos o valor (`left = mid + 1`).
- **Complexidade**: $O(\text{Custo}(\text{isValid}) \times \log(\text{maxAns} - \text{minAns}))$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Binary Search on Answer (Busca Binária na Resposta Monotônica)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="15" width="80" height="35" fill="#7f1d1d" stroke="#ef4444" rx="4"/><text x="40" y="37" fill="#fff" font-size="11" text-anchor="middle">F (inválido)</text>
    <rect x="90" y="15" width="80" height="35" fill="#7f1d1d" stroke="#ef4444" rx="4"/><text x="130" y="37" fill="#fff" font-size="11" text-anchor="middle">F (inválido)</text>
    <rect x="180" y="15" width="80" height="35" fill="#7f1d1d" stroke="#ef4444" rx="4"/><text x="220" y="37" fill="#fff" font-size="11" text-anchor="middle">F (inválido)</text>

    <!-- Fronteira da Resposta Ótima -->
    <rect x="290" y="10" width="85" height="45" fill="#047857" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="332" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">V (Mínimo)</text>
    <text x="332" y="47" fill="#34d399" font-size="9" text-anchor="middle">Resposta Ótima</text>

    <rect x="395" y="15" width="80" height="35" fill="#065f46" stroke="#10b981" rx="4"/><text x="435" y="37" fill="#fff" font-size="11" text-anchor="middle">V (válido)</text>
    <rect x="485" y="15" width="80" height="35" fill="#065f46" stroke="#10b981" rx="4"/><text x="525" y="37" fill="#fff" font-size="11" text-anchor="middle">V (válido)</text>
  </g>
  <text x="340" y="150" fill="#34d399" font-size="11" text-anchor="middle">Se isValid(mid) == true ➔ tenta valor ainda menor à esquerda (right = mid)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Converte problemas de otimização em decisão monotônica: O(log(MaxVal) × CheckCost)</text>
</svg>
<p>Visualização: Busca binária no espaço de soluções sobre predicado booleano monotônico [F, F, V, V].</p>

| Propriedade de Resposta | Espaço de Teste | Direção de Busca |
|---|---|---|
| `isValid(K) == false` | $K$ insuficiente | Aumenta $K \to$ `left = mid + 1` |
| `isValid(K) == true` | $K$ viável | Registra + diminui $\to$ `right = mid - 1` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Problemas Canônicos FAANG
- *Koko Eating Bananas* (LeetCode 875)
- *Capacity To Ship Packages Within D Days* (LeetCode 1011)
- *Split Array Largest Sum* (LeetCode 410)

#### Key Takeaways
- É um dos padrões mais cobrados em entrevistas técnicas para avaliar a capacidade de abstração de busca binária além de arrays simples.

</details>
