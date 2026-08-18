---
id: CS-MATH-BOOL-000
title: "Operações Bitwise Fundamentais (AND, OR, XOR, NOT, Shifts) e Máscaras"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que são as operações **bitwise fundamentais** (AND, OR, XOR, NOT, Shifts) e como utilizá-las para manipular máscaras de bits em $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Operações bitwise atuam diretamente sobre bits individuais no hardware da ALU em **1 ciclo de clock**:
  - **AND (`&`)**: Retorna 1 se ambos os bits forem 1 (usado para *filtrar / testar* bits: `flags & MASK`).
  - **OR (`|`)**: Retorna 1 se pelo menos um bit for 1 (usado para *ligar / setar* bits: `flags | MASK`).
  - **XOR (`^`)**: Retorna 1 se os bits forem diferentes (usado para *alternar / toggle* bits: `flags ^ MASK`).
  - **NOT (`~`)**: Inverte todos os bits (usado para *desligar* bits em conjunto com AND: `flags & ~MASK`).
  - **Shifts (`<<`, `>>`)**: Deslocam bits para esquerda (multiplica por $2^k$) ou direita (divide por $2^k$).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/bitwise-operations-masks-truth-loop.webm">
    <p>Visualização: Aplicações de máscaras lógicas (AND para leitura, OR para ativação, XOR para alternância) em 1 ciclo.</p>
  </video>
</div>

| Operação Bitwise | Exemplo de Código | Efeito Prático na Flag |
|---|---|---|
| **Setar Bit $k$** | `set_bit(flags, k)` | Liga o bit na posição $k$ |
| **Limpar Bit $k$**| `clear_bit(flags, k)` | Desliga o bit na posição $k$ |
| **Testar Bit $k$**| `test_bit(flags, k)` | Retorna `true` se ativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Sistema de Permissões de Alta Performance
```go
package main

import "fmt"

const (
  PermRead    = 1 << 0 // 0001 (1)
  PermWrite   = 1 << 1 // 0010 (2)
  PermExecute = 1 << 2 // 0100 (4)
  PermAdmin   = 1 << 3 // 1000 (8)
)

func main() {
  var userPerms uint8 = PermRead | PermWrite // 0011

  // Testando permissão de escrita:
  hasWrite := (userPerms & PermWrite) != 0 // true

  // Revogando permissão de escrita:
  userPerms &= ^PermWrite // 0001 (em Go ^ é NOT bitwise)

  fmt.Printf("Permissões: %04b, Pode Escrever: %v\n", userPerms, hasWrite)
}
```

#### Key Takeaways
- Máscaras de bits empacotam até 64 flags booleanas em um único inteiro de 8 bytes (`uint64`), economizando 90% de memória comparado a arrays de booleanos.

</details>
