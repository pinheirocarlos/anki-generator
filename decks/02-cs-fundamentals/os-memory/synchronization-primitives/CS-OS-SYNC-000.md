---
id: CS-OS-SYNC-000
title: "Race Conditions (Condições de Corrida) e Seções Críticas"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é uma **Race Condition (Condição de Corrida)** e por que seções críticas de código exigem sincronização mútua?

## Resposta
### Quick Answer
**Solução Direta**:
- **Race Condition**: Ocorre quando duas ou mais threads ou processos acessam concorrentemente um recurso compartilhado (como uma variável em memória) e ao menos um acesso é de **escrita**, com o resultado final dependendo da ordem imprevisível de escalonamento dos núcleos da CPU.
- **Seção Crítica**: É o trecho de código que acessa a memória compartilhada.
- **Exclusão Mútua**: Regra que garante que **no máximo 1 thread** possa executar dentro da seção crítica em qualquer instante de tempo, impedindo que operações compostas não-atômicas (como `read-modify-write`) sejam intercaladas destrutivamente.

### Dual Coding Visual
| Thread 1 (Lê saldo = 100) | Thread 2 (Lê saldo = 100) | Saldo Real Gravado |
|---|---|---|
| Subtrai 20 (calcula 80) | Subtrai 50 (calcula 50) | Inconsistente! |
| Grava saldo = 80 | Grava saldo = 50 (Sobrescreve T1) | **Saldo final: 50 (Perdeu o débito de 20)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Race Condition Detectada pelo Detector Nativo
```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  counter := 0
  var wg sync.WaitGroup

  for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      counter++ // DATA RACE! Operação de leitura + soma + escrita não atômica
    }()
  }
  wg.Wait()
  fmt.Println("Contador final:", counter) // Raramente será 1000!
}
```

#### Como Testar com Race Detector
```bash
go run -race main.go
```

#### Key Takeaways
- Uma linha aparentemente inocente como `counter++` traduz-se em 3 instruções de máquina separadas (`MOV`, `ADD`, `MOV`), abrindo janela para intercalação concorrente.

</details>
