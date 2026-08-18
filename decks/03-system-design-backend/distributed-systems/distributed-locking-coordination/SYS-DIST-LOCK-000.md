---
id: SYS-DIST-LOCK-000
title: "Distributed Lock com Redis (SETNX) e o Risco de Expirar por Timeout (GC Pause)"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::redis
  - freq::high
---

## Pergunta
Como implementar um Distributed Lock no Redis com comando atômico `SET resource value NX PX milliseconds` e por que pausas de Garbage Collection podem quebrar sua exclusão mútua?

## Resposta
### Quick Answer
**Solução Direta**:
- **Aquisição**: `SET lock_key unique_token NX PX 10000` (grava apenas se a chave não existir com expiração de 10s).
- **Liberação Segura**: Executar script Lua para validar que o `unique_token` ainda pertence ao chamador antes de deletar a chave.
- **Falha por GC Pause / Rede**:
  1. O Processo A adquire o lock com TTL de 10 segundos.
  2. O Processo A sofre uma pausa de GC (*Stop-the-World*) de 12 segundos.
  3. O Redis expira o lock por timeout.
  4. O Processo B adquire o mesmo lock legitimamente.
  5. O Processo A acorda da pausa de GC e prossegue achando que ainda detém o lock, executando mutações concorrentes com B (**Violação de Exclusão Mútua**).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/distributed-lock-redis-setnx-gc-pause-loop.webm">
    <p>Visualização: Quebra de exclusão mútua quando uma pausa longa de GC no cliente faz o TTL do lock expirar antes do processamento terminar.</p>
  </video>
</div>

| Linha do Tempo | Estado dos Processos | Estado do Lock no Redis |
|---|---|---|
| **$t_0$** | Processo A adquire lock (TTL 10s) | Chave atribuída a A |
| **$t_1$** | Processo A entra em GC pause (12s) | Expira aos 10s no Redis |
| **$t_2$** | Processo B adquire lock livre | Chave atribuída a B |
| **$t_3$** | Processo A acorda e grava com B | Conflito e corrupção |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Script Lua de Liberação Atômica
```text
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
```

</details>
