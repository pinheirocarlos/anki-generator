---
id: SYS-CACHE-REDIS-000
title: "Event Loop Single-Threaded do Redis e I/O Multiplexing (epoll / kqueue)"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::redis
  - freq::high
---

## Pergunta
Por que o Redis consegue processar mais de 100.000 operações por segundo utilizando uma arquitetura de execução Single-Threaded?

## Resposta
### Quick Answer
**Solução Direta**:
- **Três Pilares de Performance do Redis**:
  1. **Operação 100% em Memória RAM**: Todos os dados residem na memória principal, eliminando latências de busca em disco.
  2. **I/O Multiplexing não-bloqueante (`epoll` no Linux / `kqueue` no BSD)**: Uma única thread monitora milhares de sockets abertos simultaneamente, processando requisições prontas em lote.
  3. **Zero Contenção de Locks**: Por ser single-threaded na execução dos comandos, o Redis **não possui locks, mutexes ou context switches de CPU**, garantindo execução atômica determinística de cada comando.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/redis-single-thread-event-loop-loop.webm">
    <p>Visualização: Event Loop do Redis operando em memória RAM física com multiplexador de I/O não-bloqueante (epoll/kqueue) sem contenção de locks.</p>
  </video>
</div>

| Paradigma de Execução | Overhead de Sincronização | Desempenho em Memória |
|---|---|---|
| **Multi-Threaded com Locks** | Alto (Contenção de mutexes e context switch de CPU) | Sujeito a gargalos sob alta concorrência |
| **Redis Single-Threaded (epoll)** | **Zero (Sem locks nem race conditions)** | **Excepcional (>100k ops/segundo por core)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Comandos $O(N)$ são Perigosos no Redis
- Como o loop de execução é single-threaded, comandos demorados como `KEYS *` ou `FLUSHALL` travam o servidor inteiro, fazendo com que todas as outras conexões entrem em timeout. Use `SCAN` iterativo em produção.

</details>
