---
id: DSA-PATT-2POINT-000
title: "Conceito de Two Pointers Opostos em Arrays Ordenados para Two Sum em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::two-pointers
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão de **Two Pointers Opostos** resolve o problema de soma de dois números (*Two Sum II*) em um array ordenado em tempo $O(N)$ e espaço $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Posicionamos dois ponteiros nas extremidades do array: `left = 0` e `right = N - 1`.
- A cada passo, calculamos $\text{soma} = A[\text{left}] + A[\text{right}]$:
  - Se $\text{soma} == \text{alvo}$: encontramos o par ($O(1)$).
  - Se $\text{soma} < \text{alvo}$: incrementamos `left++` para buscar um valor maior.
  - Se $\text{soma} > \text{alvo}$: decrementamos `right--` para buscar um valor menor.
- Como o array está ordenado, descartamos com segurança uma linha ou coluna inteira de combinações a cada iteração, reduzindo o tempo de $O(N^2)$ para **$O(N)$**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Dois Ponteiros Convergentes para Soma-Alvo (Two Sum Ordenado)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="60" height="40" fill="#047857" stroke="#10b981" stroke-width="2" rx="4"/><text x="30" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">2</text><text x="30" y="10" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">L →</text>
    <rect x="80" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="110" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">7</text>
    <rect x="160" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="190" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">11</text>
    <rect x="240" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="270" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">15</text>
    <rect x="320" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="350" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">19</text>
    <rect x="400" y="20" width="60" height="40" fill="#b45309" stroke="#f59e0b" stroke-width="2" rx="4"/><text x="430" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">23</text><text x="430" y="10" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">← R</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" text-anchor="middle">Soma = 2 + 23 = 25. Se Target = 26 (Soma &lt; Target) → Incrementa L (L++)</text>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Varredura completa em O(N) de tempo e O(1) de memória</text>

</svg>

| Comparação de Soma | Ação no Ponteiro | Racional |
|---|---|---|
| $\text{soma} < \text{alvo}$ | `left++` | Precisa aumentar o valor total |
| $\text{soma} > \text{alvo}$ | `right--` | Precisa diminuir o valor total |
| $\text{soma} == \text{alvo}$ | Retorna `[left, right]` | Par exato encontrado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Two Sum Ordenado
```go
package main

func twoSum(numbers []int, target int) []int {
  left, right := 0, len(numbers)-1
  for left < right {
    sum := numbers[left] + numbers[right]
    if sum == target {
      return []int{left + 1, right + 1}
    } else if sum < target {
      left++
    } else {
      right--
    }
  }
  return nil
}
```

#### Key Takeaways
- A técnica elimina a necessidade de memória auxiliar de Hash Map ($O(1)$ espaço vs $O(N)$).

</details>
