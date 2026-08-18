---
id: CS-MATH-PROB-000
title: "Permutações vs Combinações e Análise de Explosão Combinatória"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença matemática fundamental entre **Permutações** e **Combinações** e como calcular suas cardinalidades?

## Resposta
### Quick Answer
**Solução Direta**:
- **Permutação ($P(n, k)$)**: A **ordem dos elementos importa**. Número de maneiras de ordenar $k$ itens distintos a partir de um conjunto de $n$ itens:
  $$P(n, k) = \frac{n!}{(n - k)!} \quad \text{Ex: Senhas, pódio de corrida, rotas de entrega}$$
- **Combinação ($C(n, k)$ ou $\binom{n}{k}$)**: A **ordem dos elementos NÃO importa**. Número de subconjuntos de tamanho $k$ escolhidos a partir de $n$ itens:
  $$C(n, k) = \frac{n!}{k!(n - k)!} = \frac{P(n, k)}{k!} \quad \text{Ex: Mãos de cartas, sorteio de comitê}$$
- A divisão por $k!$ nas combinações cancela todas as permutações equivalentes do mesmo subconjunto.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/permutations-vs-combinations-tree-loop.webm">
    <p>Visualização: A ordem importa nas permutações P(n,k) = n!/(n-k)! vs indiferença de ordem em combinações C(n,k).</p>
  </video>
</div>

| Conceito | Importa a Ordem? | Exemplo com `{A,B,C}` ($k=2$) |
|---|---|---|
| **Permutação** | Sim | 6 pares: `AB, BA, AC, CA, BC, CB` |
| **Combinação** | Não | 3 subconjuntos: `{A,B}, {A,C}, {B,C}` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Cálculo de Combinação sem Overflow
```go
package main

// Calcula C(n, k) de forma incremental para evitar estouro de n!:
func combinations(n, k int) int {
  if k > n {
    return 0
  }
  if k > n-k {
    k = n - k // Simetria C(n, k) == C(n, n-k)
  }
  res := 1
  for i := 1; i <= k; i++ {
    res = res * (n - i + 1) / i
  }
  return res
}
```

#### Key Takeaways
- Em algoritmos de força bruta (Backtracking), permutações geram árvores com $O(N!)$ folhas, enquanto geração de todos os subconjuntos gera $O(2^N)$ folhas.

</details>
