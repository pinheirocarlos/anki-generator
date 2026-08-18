---
id: CS-RNT-ALLOC-003
title: "Reutilização de Objetos com sync.Pool para Redução de Pressão de GC"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão **`sync.Pool`** em Go reduz a pressão sobre o Garbage Collector através da reciclagem de buffers e estruturas temporárias?

## Resposta
### Quick Answer
**Solução Direta**:
- Em servidores que processam 100.000 requisições por segundo, alocar e descartar buffers de bytes (`[]byte`) ou structs de parsing a cada requisição sobrecarrega violentamente o GC.
- **`sync.Pool`**: É uma estrutura de armazenamento de objetos temporários thread-safe e concorrente:
  - **`Get()`**: Recupera um objeto pré-alocado do pool se disponível; se vazio, invoca a função construtora `New`.
  - **`Put(x)`**: Devolve o objeto limpo ao pool para reutilização por requisições futuras.
- **Impacto**: Reduz as alocações de memória por requisição de milhares de bytes para **zero (Zero-Allocation)**, eliminando pausas de GC.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/runtimes/sync-pool-object-reuse-gc-loop.webm">
    <p>Visualização: Pool de objetos pré-alocados reutilizados entre goroutines reduzindo drasticamente as alocações no heap.</p>
  </video>
</div>

| Estratégia de Buffers | Alocações no Heap por Requisição | Impacto no GC |
|---|---|---|
| **Alocação Direta (`make([]byte, 4096)`)** | 1 nova alocação a cada requisição | Alta pressão e coletas frequentes |
| **Reciclagem via `sync.Pool`** | **0 alocações** (Reutiliza buffers) | **Pressão de GC próxima de zero** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Pool de Buffers de Alta Performance
```go
package main

import (
  "bytes"
  "sync"
)

var bufferPool = sync.Pool{
  New: func() any {
    return new(bytes.Buffer)
  },
}

func ProcessRequest(data []byte) {
  // Pega buffer reciclado da memória:
  buf := bufferPool.Get().(*bytes.Buffer)
  buf.Reset() // Limpa conteúdo anterior
  defer bufferPool.Put(buf) // Devolve ao pool ao terminar

  buf.Write(data)
  // Processa dados usando buf...
}
```

#### Key Takeaways
- O runtime de Go pode limpar o conteúdo de `sync.Pool` automaticamente durante ciclos de GC se a memória estiver sob pressão; portanto, `sync.Pool` nunca deve ser usado para armazenar conexões persistentes ou estados que não possam ser reconstruídos.

</details>
