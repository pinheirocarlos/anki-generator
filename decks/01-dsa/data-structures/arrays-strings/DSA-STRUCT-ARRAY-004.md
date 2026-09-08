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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Imutabilidade de Strings O(N²) vs Buffer Mutável com StringBuilder O(N)</text>

  <!-- Top Side: String += char (Imutável) -->
  <g transform="translate(30, 38)">
    <rect x="0" y="0" width="620" height="68" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5" rx="6"/>
    <text x="15" y="20" fill="#f43f5e" font-size="11" font-weight="bold">Loop com s += c (Imutável): Realoca novo objeto e copia caracteres a cada iteração</text>
    
    <!-- Iterations -->
    <g transform="translate(20, 30)">
      <rect x="0" y="0" width="45" height="24" fill="#881337" stroke="#f43f5e" rx="3"/>
      <text x="22" y="16" fill="#fff" font-size="11" text-anchor="middle">"a"</text>

      <path d="M 52 12 L 68 12" stroke="#f43f5e" stroke-width="1.5"/>

      <rect x="75" y="0" width="60" height="24" fill="#881337" stroke="#f43f5e" rx="3"/>
      <text x="105" y="16" fill="#fff" font-size="11" text-anchor="middle">"ab"</text>

      <path d="M 142 12 L 158 12" stroke="#f43f5e" stroke-width="1.5"/>

      <rect x="165" y="0" width="75" height="24" fill="#881337" stroke="#f43f5e" rx="3"/>
      <text x="202" y="16" fill="#fff" font-size="11" text-anchor="middle">"abc"</text>

      <text x="260" y="16" fill="#94a3b8" font-size="11">...</text>

      <rect x="360" y="0" width="220" height="24" fill="#27272a" stroke="#f43f5e" rx="4"/>
      <text x="470" y="16" fill="#fb7185" font-size="10" font-weight="bold" text-anchor="middle">Total: 1+2+...+N = O(N²) cópias no Heap</text>
    </g>
  </g>

  <!-- Bottom Side: StringBuilder (Mutável) -->
  <g transform="translate(30, 118)">
    <rect x="0" y="0" width="620" height="86" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="15" y="20" fill="#10b981" font-size="11" font-weight="bold">StringBuilder / strings.Builder (Mutável): Buffer contíguo com append in-place</text>

    <!-- Buffer array -->
    <g transform="translate(20, 30)">
      <rect x="0" y="0" width="28" height="24" fill="#065f46" stroke="#10b981" rx="2"/><text x="14" y="16" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">a</text>
      <rect x="32" y="0" width="28" height="24" fill="#065f46" stroke="#10b981" rx="2"/><text x="46" y="16" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">b</text>
      <rect x="64" y="0" width="28" height="24" fill="#065f46" stroke="#10b981" rx="2"/><text x="78" y="16" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">c</text>
      <rect x="96" y="0" width="28" height="24" fill="#1e293b" stroke="#475569" rx="2"/><text x="110" y="16" fill="#64748b" font-size="11" text-anchor="middle">_</text>
      <rect x="128" y="0" width="28" height="24" fill="#1e293b" stroke="#475569" rx="2"/><text x="142" y="16" fill="#64748b" font-size="11" text-anchor="middle">_</text>
      <rect x="160" y="0" width="28" height="24" fill="#1e293b" stroke="#475569" rx="2"/><text x="174" y="16" fill="#64748b" font-size="11" text-anchor="middle">_</text>
      <rect x="192" y="0" width="28" height="24" fill="#1e293b" stroke="#475569" rx="2"/><text x="206" y="16" fill="#64748b" font-size="11" text-anchor="middle">_</text>
      <rect x="224" y="0" width="28" height="24" fill="#1e293b" stroke="#475569" rx="2"/><text x="238" y="16" fill="#64748b" font-size="11" text-anchor="middle">_</text>

      <rect x="270" y="0" width="310" height="24" fill="#27272a" stroke="#10b981" rx="4"/>
      <text x="425" y="16" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Custo: O(1) amortizado por append → O(N) Total Linear</text>
    </g>
    <text x="310" y="74" fill="#94a3b8" font-size="10" text-anchor="middle">Buffer único com redimensionamento geométrico amortizado (Zero overhead de GC por caractere)</text>
  </g>
</svg>

<p>Visualização: Concatenação imutável O(N²) vs buffer mutável com expansão amortizada O(N).</p>

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
