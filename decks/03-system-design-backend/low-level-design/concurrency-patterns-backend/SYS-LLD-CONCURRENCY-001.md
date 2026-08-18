---
id: SYS-LLD-CONCURRENCY-001
title: "Padrão Fan-Out / Fan-In e Pipeline Concorrente com Canais"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::meta
  - freq::high
---

## Pergunta
Como os padrões Fan-Out e Fan-In aceleram tarefas computacionalmente intensivas distribuindo e consolidando fluxos de dados concorrentes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fan-Out**: Múltiplas goroutines/threads leem do **mesmo canal de entrada** simultaneamente para processar tarefas CPU-bound ou I/O-bound em paralelo.
- **Fan-In**: Uma única função multiplexadora combina as saídas de múltiplos canais independentes gerados pelo Fan-Out em um **único canal consolidado de saída**.
- **Benefício**: Permite paralelizar etapas demoradas de uma esteira (*Pipeline*) mantendo a sincronização limpa e livre de deadlocks.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/concurrency-fan-out-fan-in-multiplexing-loop.webm">
    <p>Visualização: Fan-Out disparando múltiplos workers independentes e Fan-In agregando resultados em um canal único com sync.WaitGroup.</p>
  </video>
</div>

| Etapa do Fluxo | Ação Estrutural | Cardinalidade de Canais |
|---|---|---|
| **Fan-Out** | Distribuição de carga em múltiplos workers | 1 Canal de Entrada $\rightarrow N$ Workers |
| **Fan-In** | Consolidação dos resultados em stream único | $N$ Canais de Saída $\rightarrow 1$ Canal Final |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Função Fan-In Genérica em Go
```go
package main

import "sync"

func FanIn(channels ...<-chan int) <-chan int {
  out := make(chan int)
  var wg sync.WaitGroup
  wg.Add(len(channels))

  for _, ch := range channels {
    go func(c <-chan int) {
      defer wg.Done()
      for val := range c { out <- val }
    }(ch)
  }

  go func() {
    wg.Wait()
    close(out)
  }()
  return out
}
```

</details>
