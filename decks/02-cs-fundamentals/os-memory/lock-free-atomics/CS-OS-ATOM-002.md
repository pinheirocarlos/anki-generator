---
id: CS-OS-ATOM-002
title: "Instrução Compare-And-Swap (CAS) e Programação Lock-Free"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Como a instrução de hardware **Compare-And-Swap (CAS)** permite atualizar variáveis concorrentes sem adquirir nenhum Lock (*Lock-Free*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **CAS (Compare-And-Swap / `CMPXCHG` em x86)**: É uma instrução atômica de hardware que recebe 3 parâmetros: `endereço_memória`, `valor_esperado` e `novo_valor`.
- **Lógica Atômica em Hardware**:
  - Se o valor atual na memória for **igual** ao `valor_esperado`, grava o `novo_valor` e retorna `true`.
  - Se o valor na memória foi alterado por outra thread, **não grava nada** e retorna `false`.
- **Laço Lock-Free (CAS Loop)**: A thread lê o valor atual, calcula a mutação e tenta o CAS em loop; se outra thread ganhar a corrida, o CAS falha e a thread repete o laço com o valor atualizado sem nunca ser suspensa pelo kernel.

### Dual Coding Visual
| Etapa do CAS Loop | Operação | Resultado se Houver Colisão |
|---|---|---|
| **1. Leitura** | `old = *ptr` | Obtém snapshot do valor |
| **2. Cálculo** | `new = old + 1` | Computa mutação em registrador local |
| **3. Tentativa CAS** | `CAS(ptr, old, new)` | Se `*ptr != old`, falha e reinicia loop |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Incremento Atômico via CAS Loop
```go
package main

import (
  "sync/atomic"
)

func AtomicIncrement(addr *int64) int64 {
  for {
    oldVal := atomic.LoadInt64(addr)
    newVal := oldVal + 1
    // Tenta atualizar atomicamente se o valor ainda for oldVal:
    if atomic.CompareAndSwapInt64(addr, oldVal, newVal) {
      return newVal // Sucesso!
    }
    // Se falhar, outra thread alterou o valor; repete o laço sem dormir.
  }
}
```

#### Key Takeaways
- Estruturas Lock-Free garantem que **ao menos uma thread do sistema faz progresso garantido a cada ciclo**, eliminando o risco de inversão de prioridade e deadlocks.

</details>
