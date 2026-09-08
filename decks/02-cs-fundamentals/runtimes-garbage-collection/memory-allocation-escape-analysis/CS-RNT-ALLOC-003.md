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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Reutilização de Objetos com sync.Pool no Go</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">sync.Pool: Cache de objetos concorrente thread-safe sem travas globais</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Pede com pool.Get() e devolve com pool.Put(buf) após o uso.</text>
    <text x="280" y="65" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Recicla buffers de bytes e structs reduzindo a taxa de novas alocações na Heap a quase ZERO.</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Atenção: Objetos no pool são limpos automaticamente pelo GC a cada ciclo; não use para conexões persistentes.</text>

</svg>
<p>Visualização: Padrão de reciclagem com sync.Pool reutilizando buffers e estruturas temporárias em cache concorrente para minimizar alocações na Heap e mitigar a pressão sobre o Garbage Collector.</p>

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
