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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/two-pointers-converging-sum-loop.webm">
    <p>Visualização: Ponteiros left e right convergindo em direção ao centro com avanço condicional pela soma.</p>
  </video>
</div>

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
