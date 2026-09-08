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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Permutações vs Combinações e Explosão Combinatória</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="265" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="132" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Permutação: A Ordem IMPORTA</text>
    <text x="132" y="44" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">P(n, k) = n! / (n - k)!</text>
    <text x="132" y="62" fill="#94a3b8" font-size="10" text-anchor="middle">Exemplo: [A, B] ≠ [B, A] (Senhas, Filas)</text>
    <text x="132" y="76" fill="#fca5a5" font-size="9" text-anchor="middle">Complexidade: O(n!) — Impraticável p/ n > 12</text>

    <rect x="295" y="0" width="265" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="427" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Combinação: A Ordem NÃO Importa</text>
    <text x="427" y="44" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">C(n, k) = n! / (k! * (n - k)!)</text>
    <text x="427" y="62" fill="#94a3b8" font-size="10" text-anchor="middle">Exemplo: {A, B} ≡ {B, A} (Subconjuntos, Loterias)</text>
    <text x="427" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Coeficiente Binomial (Triângulo de Pascal)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Identificação de Gargalos: Problemas O(n!) e O(2^n) exigem poda por Branch &amp; Bound ou DP.</text>

</svg>
<p>Visualização: Comparação entre Permutações (onde a ordem importa) e Combinações (agrupamentos não ordenados) na contagem de arranjos.</p>

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
