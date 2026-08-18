---
id: DSA-PATT-2POINT-001
title: "Prova da Corretude do Descarte Guloso em Container With Most Water O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::meta
  - freq::high
---

## Pergunta
Como provar matematicamente a corretude do descarte guloso da menor barra em **Container With Most Water** em tempo linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A área formada por dois limites `left` e `right` é:
  $$\text{Área} = (\text{right} - \text{left}) \times \min(H[\text{left}], H[\text{right}])$$
- Suponha sem perda de generalidade que $H[\text{left}] < H[\text{right}]$:
  - A largura máxima possível com a barra da esquerda é a largura atual $(\text{right} - \text{left})$.
  - Se mantivermos `left` e movermos `right` para qualquer posição intermediária $k < \text{right}$, a largura diminui e a altura continua limitada por $H[\text{left}]$ ($\min(H[\text{left}], H[k]) \le H[\text{left}]$).
  - Portanto, **nenhum outro par** contendo `left` pode gerar uma área maior que a atual. Podemos descartar `left` com segurança incrementando `left++`.

### Dual Coding Visual
| Decisão de Ponteiro | Condição de Altura | Justificativa Matemática |
|---|---|---|
| `left++` | $H[\text{left}] < H[\text{right}]$ | `left` já atingiu sua área máxima possível |
| `right--` | $H[\text{right}] < H[\text{left}]$ | `right` já atingiu sua área máxima possível |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A prova demonstra que descartar $N-1$ pares a cada passo não perde a solução ótima, reduzindo $O(N^2)$ combinações para exatamente $N-1$ comparações ($O(N)$).

</details>
