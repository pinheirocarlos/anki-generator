---
id: CS-OS-KERN-003
title: "Sinais Unix: SIGTERM vs SIGKILL e Shutdown Gracioso"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Qual é a diferença entre os sinais **SIGTERM (15)** e **SIGKILL (9)** e como implementar um encerramento gracioso (*Graceful Shutdown*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **SIGTERM (Signal 15 - Termination Request)**:
  - Solicitação educada de encerramento enviada por orquestradores (Kubernetes / Docker).
  - **Pode ser capturado e tratado pelo processo**: a aplicação intercepta o sinal, para de aceitar novas requisições HTTP, finaliza transações de banco em andamento, descarrega buffers e encerra voluntariamente com código 0.
- **SIGKILL (Signal 9 - Kill Immediate)**:
  - Ordem forçada de término executada diretamente pelo kernel.
  - **Não pode ser capturado, bloqueado ou ignorado**: o processo é destruído instantaneamente no mesmo ciclo de clock, podendo corromper arquivos ou transações não persistidas.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/unix-signals-sigterm-vs-sigkill-loop.webm">
    <p>Visualização: Sinal interceptável para limpeza graciosa (SIGTERM 15) vs terminação forçada e incondicional no Kernel (SIGKILL 9).</p>
  </video>
</div>

| Sinal Unix | Pode ser Capturado pelo App? | Ação Realizada pelo Processo |
|---|---|---|
| **SIGTERM (15)** | **Sim** | Fecha conexões, salva estado e encerra com calma |
| **SIGKILL (9)** | **Não (Interceptado pelo Kernel)** | Morte instantânea sem execução de código de limpeza |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Graceful Shutdown em Servidor HTTP
```go
package main

import (
  "context"
  "net/http"
  "os"
  "os/signal"
  "syscall"
  "time"
)

func main() {
  server := &http.Server{Addr: ":8080"}
  stop := make(chan os.Signal, 1)
  signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)

  go server.ListenAndServe()

  <-stop // Aguarda sinal SIGTERM do Kubernetes

  // Dá 15 segundos para requisições em voo terminarem com sucesso:
  ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
  defer cancel()
  server.Shutdown(ctx)
}
```

#### Key Takeaways
- No Kubernetes, ao desligar um pod, ele envia primeiro `SIGTERM` e aguarda o período de carência (`terminationGracePeriodSeconds: 30`); se o container não encerrar dentro do prazo, ele envia o `SIGKILL` definitivo.

</details>
