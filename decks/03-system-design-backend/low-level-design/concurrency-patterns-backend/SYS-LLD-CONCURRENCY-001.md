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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Fan-Out / Fan-In: Processamento Paralelo e Agregação</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="30" width="130" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="55" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1 Input Stream</text>
    <text x="65" y="72" fill="#cbd5e1" font-size="9" text-anchor="middle">10.000 itens</text>

    <!-- Fan-out lines -->
    <g transform="translate(160, 0)">
      <rect x="0" y="0" width="140" height="30" rx="4" fill="#0284c7"/>
      <text x="70" y="20" fill="#ffffff" font-size="10" text-anchor="middle">Worker Branch A</text>

      <rect x="0" y="45" width="140" height="30" rx="4" fill="#0284c7"/>
      <text x="70" y="65" fill="#ffffff" font-size="10" text-anchor="middle">Worker Branch B</text>

      <rect x="0" y="90" width="140" height="30" rx="4" fill="#0284c7"/>
      <text x="70" y="110" fill="#ffffff" font-size="10" text-anchor="middle">Worker Branch C</text>
    </g>

    <!-- Fan-in multiplexer -->
    <rect x="340" y="25" width="240" height="70" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="50" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fan-In Multiplexer</text>
    <text x="460" y="70" fill="#86efac" font-size="9" text-anchor="middle">Consolida múltiplos canais em 1 único canal de saída</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Utiliza sync.WaitGroup para fechar o canal de saída de forma segura somente após todos os workers terminarem.</text>

</svg>

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
