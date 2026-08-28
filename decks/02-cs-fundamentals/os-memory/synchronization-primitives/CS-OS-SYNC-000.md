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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Race Conditions e Proteção de Seção Crítica</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Seção Crítica: Trecho de código que acessa recursos compartilhados mutáveis</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Propriedades Obrigatórias:</text>
    <text x="280" y="65" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">1. Exclusão Mútua (Mutual Exclusion) | 2. Progresso (Liveness) | 3. Espera Limitada (Bounded Waiting)</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Sem exclusão mútua, a ordem de escalonamento não-determinística da CPU corrompe o estado dos dados.</text>

</svg>

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
