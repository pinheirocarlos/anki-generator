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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Two Pointers em Arrays: Otimização de Espaço O(N) → O(1)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="30" y="45" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <text x="30" y="10" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Left →</text>

    <rect x="80" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="110" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">3</text>
    <rect x="160" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="190" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">5</text>
    <rect x="240" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="270" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">8</text>
    <rect x="320" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="350" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">11</text>

    <rect x="400" y="20" width="60" height="40" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="430" y="45" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">15</text>
    <text x="430" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">← Right</text>
  </g>
  <rect x="140" y="130" width="400" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="340" y="148" fill="#f8fafc" font-size="11" text-anchor="middle">Soma = arr[L] + arr[R]. Se Soma &lt; Target → L++ | Se Soma &gt; Target → R--</text>
  <text x="340" y="166" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Elimina necessidade de Hash Map: Tempo O(N), Espaço O(1)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Two Pointers em Arrays: Otimização de Espaço O(N) → O(1)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="30" y="45" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <text x="30" y="10" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Left →</text>

    <rect x="80" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="110" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">3</text>
    <rect x="160" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="190" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">5</text>
    <rect x="240" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="270" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">8</text>
    <rect x="320" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="350" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">11</text>

    <rect x="400" y="20" width="60" height="40" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="430" y="45" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">15</text>
    <text x="430" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">← Right</text>
  </g>
  <rect x="140" y="130" width="400" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="340" y="148" fill="#f8fafc" font-size="11" text-anchor="middle">Soma = arr[L] + arr[R]. Se Soma &lt; Target → L++ | Se Soma &gt; Target → R--</text>
  <text x="340" y="166" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Elimina necessidade de Hash Map: Tempo O(N), Espaço O(1)</text>

</svg>

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
