---
id: CS-ARCH-IO-003
title: "Papel do OS Page Cache na Aceleração de I/O de Arquivos"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
Como o **OS Page Cache** do kernel Linux acelera leituras e gravações de arquivos utilizando a memória RAM livre?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Page Cache** é uma camada de cache transparente gerenciada pelo kernel Linux que utiliza toda a memória RAM não alocada por processos para reter páginas (4 KB) lidas ou gravadas no disco.
- **Leituras**: Se uma página solicitada já estiver no Page Cache (*Cache Hit*), a resposta é entregue instantaneamente na velocidade da RAM (~100ns), sem tocar no disco físico.
- **Gravações**: Syscalls `write()` gravam imediatamente no Page Cache marcando as páginas como *Dirty Pages*, retornando sucesso instantâneo para a aplicação; threads de background do kernel (`flusher/kswapd`) descarregam as páginas no disco de forma assíncrona.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/os-page-cache-dirty-pages-loop.webm">
    <p>Visualização: Interpolação transparente de páginas na RAM física com gravações diferidas (Flush de Dirty Pages) pelo pdflush/flusher.</p>
  </video>
</div>

| Operação de I/O | Fluxo com Page Cache (Padrão) | Latência Percebida pelo App |
|---|---|---|
| **Leitura com Cache Hit** | App $leftarrow$ RAM Page Cache (Zero acesso ao disco) | ~100 ns |
| **Escrita Buffered** | App $ightarrow$ Grava na RAM como *Dirty Page* | ~1 µs (Assíncrono) |
| **Leitura com Cache Miss**| App $leftarrow$ Leitura física $ightarrow$ Popula Page Cache | ~20 µs a 10 ms |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Forçando Sincronização Durável
```go
package main

import "os"

func persistSecurely(file *os.File, data []byte) error {
  if _, err := file.Write(data); err != nil { // Grava no Page Cache do OS
    return err
  }
  // Invoca a syscall fsync() para forçar o flush imediato das Dirty Pages para o hardware:
  return file.Sync()
}
```

#### Key Takeaways
- "RAM livre é RAM desperdiçada": O Linux aloca quase 100% da RAM disponível para o Page Cache e a desaloca instantaneamente se um processo solicitar mais memória.

</details>
