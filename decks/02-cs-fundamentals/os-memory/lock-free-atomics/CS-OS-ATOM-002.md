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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Instrução Compare-And-Swap (CAS): Base do Lock-Free</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">CMPXCHG [ptr], new_val (Atômico no Hardware)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">if (*ptr == expected_val) { *ptr = new_val; return true; } else { return false; }</text>
    <text x="280" y="68" fill="#bae6fd" font-size="10" text-anchor="middle">Executado em laço (CAS Loop / Spin): Tenta atomicamente até obter sucesso sem bloquear a thread.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Elimina o custo de context switches de mutex; sob altíssima contenção, o overhead de CPU do loop pode subir.</text>

</svg>

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
