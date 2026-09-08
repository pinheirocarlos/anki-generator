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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Event Loop Single-Threaded do Redis &amp; I/O Multiplexing (epoll)</text>
  <g transform="translate(40, 50)">
    <!-- Socket Connections -->
    <rect x="0" y="0" width="150" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="75" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">10.000+ Conexões TCP</text>
    <text x="75" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Socket Client 1 (read)</text>
    <text x="75" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Socket Client 2 (write)</text>
    <text x="75" y="90" fill="#cbd5e1" font-size="10" text-anchor="middle">Socket Client N (idle)</text>

    <!-- Epoll Multiplexer -->
    <rect x="180" y="25" width="130" height="70" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="245" y="52" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">I/O Multiplexer</text>
    <text x="245" y="72" fill="#e0f2fe" font-size="9" text-anchor="middle">epoll / kqueue (O(1))</text>

    <!-- Single Thread Event Loop -->
    <rect x="340" y="0" width="260" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="470" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Single-Threaded Execution Engine</text>
    <text x="470" y="50" fill="#86efac" font-size="10" text-anchor="middle">1. Pega evento pronto da fila</text>
    <text x="470" y="70" fill="#86efac" font-size="10" text-anchor="middle">2. Executa comando em RAM pura (O(1))</text>
    <text x="470" y="90" fill="#86efac" font-size="10" text-anchor="middle">3. Zero Locks, Zero Context Switch, Zero Race</text>
  </g>
  <text x="340" y="210" fill="#94a3b8" font-size="11" text-anchor="middle">Gargalo do Redis é largura de banda de rede e memória RAM, nunca contenção de threads de CPU.</text>

</svg>
<p>Visualização: Event Loop do Redis operando em memória RAM física com multiplexador de I/O não-bloqueante (epoll/kqueue) sem contenção de locks.</p>

| Paradigma de Execução | Overhead de Sincronização | Desempenho em Memória |
|---|---|---|
| **Multi-Threaded com Locks** | Alto (Contenção de mutexes e context switch de CPU) | Sujeito a gargalos sob alta concorrência |
| **Redis Single-Threaded (epoll)** | **Zero (Sem locks nem race conditions)** | **Excepcional (>100k ops/segundo por core)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Comandos $O(N)$ são Perigosos no Redis
- Como o loop de execução é single-threaded, comandos demorados como `KEYS *` ou `FLUSHALL` travam o servidor inteiro, fazendo com que todas as outras conexões entrem em timeout. Use `SCAN` iterativo em produção.

</details>
