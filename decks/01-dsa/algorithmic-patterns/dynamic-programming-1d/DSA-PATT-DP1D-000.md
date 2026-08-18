---
id: DSA-PATT-DP1D-000
title: "Subestrutura Ótima e Sobreposição de Subproblemas em Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::meta
  - freq::high
---

## Pergunta
Quais são as duas propriedades matemáticas fundamentais que qualificam um problema para resolução via **Programação Dinâmica (DP)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **1. Subestrutura Ótima (*Optimal Substructure*)**: A solução ótima do problema global pode ser construída a partir das soluções ótimas de seus subproblemas menores.
- **2. Sobreposição de Subproblemas (*Overlapping Subproblems*)**: O mesmo subproblema é recalculado repetidas vezes em múltiplos ramos da árvore recursiva (ex: $\text{fib}(3)$ sendo recalculado por $\text{fib}(5)$ e $\text{fib}(4)$).
- A Programação Dinâmica resolve cada subproblema exatamente uma única vez, armazenando o resultado em cache para consultas futuras em $O(1)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dp-state-transition-loop.webm">
    <p>Visualização: Memoização de subproblemas sobrepostos eliminando recálculos exponenciais O(2^N) -> O(N).</p>
  </video>
</div>

| Propriedade de DP | Definição | Exemplo Canônico |
|---|---|---|
| **Subestrutura Ótima** | Solução global composta de subsoluções | $DP[i] = DP[i-1] + DP[i-2]$ |
| **Sobreposição de Subproblemas** | Recálculo repetido de mesmos estados | Árvore recursiva de Fibonacci |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Problemas com subestrutura ótima mas **sem** sobreposição de subproblemas (subproblemas disjuntos) são resolvidos por *Divisão e Conquista* (ex: Mergesort), e não por DP.

</details>
