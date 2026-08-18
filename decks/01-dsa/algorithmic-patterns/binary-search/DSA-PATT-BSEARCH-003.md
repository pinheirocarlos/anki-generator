---
id: DSA-PATT-BSEARCH-003
title: "Busca Binária em Arrays Rotacionados (Search in Rotated Sorted Array)"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::meta
  - freq::high
---

## Pergunta
Como adaptar a Busca Binária para encontrar um alvo em um **array rotacionado em pivô desconhecido** em tempo $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em qualquer array ordenado rotacionado (ex: `[4, 5, 6, 7, 0, 1, 2]`), dividindo ao meio em `mid`, **ao menos uma das metades está garantidamente ordenada**:
  - Se `arr[left] <= arr[mid]`: A metade esquerda está ordenada.
    - Se $\text{arr}[\text{left}] \le \text{target} < \text{arr}[\text{mid}]$, busca na esquerda (`right = mid - 1`); senão, busca na direita (`left = mid + 1`).
  - Caso contrário: A metade direita está ordenada.
    - Se $\text{arr}[\text{mid}] < \text{target} \le \text{arr}[\text{right}]$, busca na direita (`left = mid + 1`); senão, busca na esquerda (`right = mid - 1`).

### Dual Coding Visual
| Metade Ordenada | Condição de Teste | Regra de Descarte |
|---|---|---|
| **Esquerda Ordenada** | `arr[left] <= arr[mid]` | Verifica se alvo está entre `left` e `mid` |
| **Direita Ordenada** | `arr[left] > arr[mid]` | Verifica se alvo está entre `mid` e `right` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Mesmo com a rotação, o teste de ordenação de metade preserva o descarte de 50% dos elementos a cada passo, garantindo $O(\log N)$.

</details>
