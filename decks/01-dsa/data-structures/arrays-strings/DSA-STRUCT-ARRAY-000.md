---
id: DSA-STRUCT-ARRAY-000
title: "Acesso Indexado O(1) e Aritmética de Ponteiros em Vetores Contíguos"
tags:
  - level::l3-junior
  - topic::dsa::arrays-strings
  - company::amazon
  - freq::high
---

## Pergunta
Por que arrays contíguos em memória oferecem **acesso indexado $O(1)$** instantâneo?

## Resposta
### Quick Answer
**Solução Direta**:
- Elementos de um array residem lado a lado em blocos contíguos de memória RAM.
- O endereço de qualquer índice $i$ é calculado instantaneamente via fórmula direta em hardware:
  $$\text{Endereço}(i) = \text{EndereçoBase} + (i \times \text{TamanhoElemento})$$
- Como a operação envolve apenas uma multiplicação e uma adição de inteiros executadas em tempo constante pela ALU, o acesso a qualquer elemento ocorre em $O(1)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Acesso Indexado O(1) e Aritmética de Ponteiros em Vetores Contíguos</text>
  <g transform="translate(60, 55)">
    <!-- Base address pointer -->
    <rect x="0" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="40" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[0]</text>
    <text x="40" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x1000</text>
    
    <rect x="110" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="150" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[1]</text>
    <text x="150" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x1004</text>

    <rect x="220" y="30" width="80" height="40" fill="#065f46" stroke="#10b981" stroke-width="2.5" rx="4"/>
    <text x="260" y="55" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">arr[2]</text>
    <text x="260" y="90" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">0x1008</text>

    <rect x="330" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="370" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[3]</text>
    <text x="370" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x100C</text>

    <rect x="440" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="480" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[4]</text>
    <text x="480" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x1010</text>
  </g>
  <rect x="140" y="150" width="400" height="32" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="171" fill="#34d399" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">Endereço(i) = Base + (i × sizeof(T)) → Custo ALU O(1)</text>
</svg>

<p>Visualização: Acesso O(1) através de base + (i * sizeof(T)).</p>

| Estrutura de Dados | Acesso por Índice | Cálculo de Endereço |
|---|---|---|
| **Array Contíguo** | $O(1)$ Instantâneo | Aritmética direta de ponteiros |
| **Lista Encadeada** | $O(N)$ Sequencial | Travessia de ponteiro a ponteiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Corredor de Hotel
- Um array contíguo é como um corredor de hotel com quartos numerados em sequência perfeita (`101, 102, 103, 104`).
- Para visitar o quarto `104`, você calcula a distância exata a partir da entrada e caminha diretamente até ele, sem precisar passar abrindo as portas anteriores.

#### Exemplo em Go: Aritmética de Ponteiros
```go
package main

import (
  "fmt"
  "unsafe"
)

func main() {
  arr := [4]int32{10, 20, 30, 40}
  basePtr := unsafe.Pointer(&arr[0])
  elementSize := unsafe.Sizeof(arr[0]) // 4 bytes

  // Endereço do índice 2: base + 2 * 4
  idx2Ptr := unsafe.Pointer(uintptr(basePtr) + 2*elementSize)
  val := *(*int32)(idx2Ptr)

  fmt.Printf("Elemento no índice 2 via aritmética: %d\n", val) // 30
}
```

#### Key Takeaways
- O acesso $O(1)$ depende exclusivamente da contiguidade física da memória e do tamanho uniforme de cada elemento.
- Inserções ou deleções no meio do array continuam custando $O(N)$ porque exigem o deslocamento em bloco dos elementos subsequentes.

</details>
