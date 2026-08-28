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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cálculo Seguro do Ponto Médio sem Overflow de Inteiros</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#7f1d1d" stroke="#ef4444" rx="6"/>
    <text x="120" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Incorreto (Bug Clássico do Java):</text>
    <text x="20" y="45" fill="#fecaca" font-size="10" font-family="monospace">mid = (low + high) / 2</text>
    <text x="20" y="62" fill="#fca5a5" font-size="9">Causa integer overflow para &gt; 2³¹ - 1</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#065f46" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Seguro em Produção:</text>
      <text x="20" y="45" fill="#ffffff" font-size="10" font-family="monospace">mid = low + (high - low) / 2</text>
      <text x="20" y="62" fill="#a7f3d0" font-size="9">Ou bitwise: mid = (low + high) &gt;&gt;&gt; 1</text>
    </g>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" text-anchor="middle">Regra fundamental para código robusto em C++, Java, Go e Rust</text>

</svg>

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
