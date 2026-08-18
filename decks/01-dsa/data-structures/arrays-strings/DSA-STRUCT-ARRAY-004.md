---
id: DSA-STRUCT-ARRAY-004
title: "Custos de Imutabilidade de Strings e Concatenação O(N) com StringBuilder"
tags:
  - level::l4-pleno
  - topic::dsa::arrays-strings
  - company::google
  - freq::high
---

## Pergunta
Por que a concatenação de strings em loop com operador `+=` tem complexidade $O(N^2)$ e como `StringBuilder` resolve esse problema?

## Resposta
### Quick Answer
**Solução Direta**:
- Em linguagens como Java e Go, strings são **imutáveis** (buffers somente leitura compartilhados com segurança entre threads).
- Ao concatenar em loop (`s += c`), uma nova string é alocada e todos os caracteres anteriores são copiados a cada iteração, resultando no somatório:
  $$1 + 2 + 3 + \dots + N = \frac{N(N+1)}{2} = O(N^2) \text{ bytes copiados}$$
- Classes como `StringBuilder` (Java) ou `strings.Builder` (Go) utilizam um buffer de bytes mutável com expansão geométrica, alcançando complexidade linear $O(N)$ total.

### Dual Coding Visual
| Estratégia de Concatenação | Tempo de Execução | Alocações no Heap |
|---|---|---|
| **Loop com `s += str`** | $O(N^2)$ Quadrático | $N$ novos objetos alocados |
| **`StringBuilder` / `strings.Builder`** | $O(N)$ Linear | $O(\log N)$ realocações |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go com Zero Allocations
```go
package main

import (
  "strings"
)

func buildLargeString(items []string) string {
  var sb strings.Builder
  // Pré-aloca capacidade conhecida para evitar qualquer realocação intermediária:
  sb.Grow(len(items) * 16)
  for _, item := range items {
    sb.WriteString(item)
  }
  return sb.String()
}
```

#### Key Takeaways
- Em entrevistas FAANG, qualquer concatenação de strings em laço sem construtor mutável é classificada como erro grave de complexidade assintótica.

</details>
