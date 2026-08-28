---
id: SYS-LLD-CONCURRENCY-000
title: "Padrão Worker Pool em Go e Gerenciamento de Concorrência Bounded"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::uber
  - freq::high
---

## Pergunta
Como o padrão Worker Pool gerencia o consumo de recursos limitando o número máximo de goroutines ativas através de canais bufferizados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema do Spawn Irrestrito**: Criar uma goroutine por tarefa (`go process(job)`) sob pico de 100.000 requisições esgota descritores de arquivos, conexões de banco de dados e causa saturação de memória.
- **Worker Pool Limitado**:
  1. Cria um canal de entrada `jobs := make(chan Job, bufferSize)`.
  2. Inicializa um número fixo $K$ de goroutines workers concorrentes (ex: $K=50$).
  3. Cada worker consome tarefas do mesmo canal compartilhado em um laço `for job := range jobs`.
  4. Sincroniza a finalização com `sync.WaitGroup`.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Worker Pool em Go: Bounded Channels &amp; Controle Fixo de Goroutines</text>
  <g transform="translate(40, 50)">
    <!-- Task Queue -->
    <rect x="0" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="42" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Jobs Channel</text>
    <text x="80" y="65" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">jobs := make(chan Job, 100)</text>
    <text x="80" y="85" fill="#86efac" font-size="9" text-anchor="middle">Buffer finito limita RAM</text>

    <!-- 3 Fixed Workers -->
    <g transform="translate(200, 0)">
      <rect x="0" y="0" width="180" height="36" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="90" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker 1 (Goroutine fixa)</text>

      <rect x="0" y="45" width="180" height="36" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="90" y="67" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker 2 (Goroutine fixa)</text>

      <rect x="0" y="90" width="180" height="36" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="90" y="112" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker 3 (Goroutine fixa)</text>
    </g>

    <!-- Results Channel -->
    <rect x="420" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="500" y="42" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Results Channel</text>
    <text x="500" y="65" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">results &lt;- process(job)</text>
    <text x="500" y="85" fill="#86efac" font-size="9" text-anchor="middle">sync.WaitGroup sincroniza</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Evita o antipadrão 'go func()' descontrolado que causa OOM e sobrecarga do Go Runtime Scheduler.</text>

</svg>

| Abordagem Concorrente | Uso de Memória e Conexões sob Pico | Risco Operacional |
|---|---|---|
| **Goroutine sem Limite (`go fn()`)** | Ilimitado ($O(N)$ goroutines) | Queda por OOM ou esgotamento de sockets |
| **Worker Pool Fixo ($K=50$)** | **Estritamente delimitado ($O(K)$)** | **Estabilidade absoluta sob carga extrema** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação do Worker Pool em Go
```go
package main

import (
  "sync"
)

func Worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
  defer wg.Done()
  for j := range jobs {
    results <- j * 2 // Processa a tarefa
  }
}

func RunPool(numWorkers int, totalJobs int) {
  jobs := make(chan int, totalJobs)
  results := make(chan int, totalJobs)
  var wg sync.WaitGroup

  for w := 1; w <= numWorkers; w++ {
    wg.Add(1)
    go Worker(w, jobs, results, &wg)
  }
  for j := 1; j <= totalJobs; j++ { jobs <- j }
  close(jobs)
  wg.Wait()
  close(results)
}
```

</details>
