---
id: DSA-ADV-SWEEPLINE-002
title: "The Skyline Problem (LeetCode 218) com Sweep-Line e TreeMap de Alturas em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Sweep-Line com TreeMap de contagem de alturas** resolve **The Skyline Problem** em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Convertemos cada edifício $[L, R, H]$ em 2 eventos na coordenada $X$:
  - Evento de início em $L$ com altura $+H$.
  - Evento de fim em $R$ com altura $-H$.
- Ordenamos todos os eventos por $X$ (desempates: início com maior altura primeiro, término com menor altura primeiro).
- Mantemos um **TreeMap de frequências de alturas ativas**:
  - Ao processar um ponto $X$, adicionamos $+H$ ou decrementamos/removemos $-H$.
  - Consultamos a altura máxima ativa `maxH = treeMap.lastKey()`.
  - Se a altura máxima **mudou** em relação à anterior, adicionamos $[X, \text{maxH}]$ ao contorno do horizonte (*Skyline*).
- **Complexidade**: $O(N \log N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Evento de Edifício | Modificação no TreeMap | Condição de Ponto no Skyline |
|---|---|---|
| **Início em $L$ ($+H$)** | Incrementa contagem de $H$ | $\text{maxH atual} \neq \text{maxH anterior}$ |
| **Fim em $R$ ($-H$)** | Decrementa/Remove altura $H$ | $\text{maxH atual} \neq \text{maxH anterior}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O TreeMap com contadores de frequência substitui o Max-Heap puro porque permite remoção arbitrária de elementos em $O(\log N)$.

</details>
