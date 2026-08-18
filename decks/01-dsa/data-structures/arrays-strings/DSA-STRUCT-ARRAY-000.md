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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/array-pointer-arithmetic-loop.webm">
    <p>Visualização: Acesso indexado O(1) calculando endereço de memória física base + i * size.</p>
  </video>
</div>

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
