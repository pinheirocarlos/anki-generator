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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/concurrency-worker-pool-bounded-channels-loop.webm">
    <p>Visualização: Worker Pool distribuindo tarefas através de canal bufferizado para número fixo de goroutines controlando uso de CPU e memória.</p>
  </video>
</div>

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
