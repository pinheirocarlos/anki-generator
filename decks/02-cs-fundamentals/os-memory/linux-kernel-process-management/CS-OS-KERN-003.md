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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sinais Unix: SIGTERM (Gracioso) vs SIGKILL (Forçado)</text>
  <g transform="translate(50, 48)">
    <!-- SIGTERM -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">SIGTERM (Sinal 15)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Pode ser capturado e tratado pelo processo</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Graceful Shutdown: Conclui requisições em voo,</text>
    <text x="135" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">drena filas e fecha conexões de banco de dados</text>

    <!-- SIGKILL -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="445" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">SIGKILL (Sinal 9)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">NÃO pode ser capturado ou ignorado</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Kernel encerra a execução no mesmo instante</text>
    <text x="445" y="76" fill="#f87171" font-size="9" text-anchor="middle">Risco de corrupção de arquivos temporários</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Kubernetes envia SIGTERM, aguarda o período terminationGracePeriodSeconds (padrão 30s) e então envia SIGKILL.</text>

</svg>
<p>Visualização: Comparação de tratamento entre SIGTERM (sinal interceptável para graceful shutdown) e SIGKILL (terminação incondicional e imediata pelo kernel).</p>

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
