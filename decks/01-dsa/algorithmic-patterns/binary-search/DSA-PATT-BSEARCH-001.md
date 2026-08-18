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
