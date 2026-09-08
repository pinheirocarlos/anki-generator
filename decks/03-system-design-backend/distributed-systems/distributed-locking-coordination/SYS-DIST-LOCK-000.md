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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lock Distribuído (Redis SETNX) &amp; Falha por GC Pause</text>
  <g transform="translate(40, 50)">
    <!-- Client 1 -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Cliente 1: Adquire Lock (TTL 10s)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Entra em pausa longa de GC (15s)</text>
    <text x="140" y="65" fill="#f87171" font-size="10" text-anchor="middle">TTL expira silenciosamente no Redis</text>
    <text x="140" y="90" fill="#fca5a5" font-size="10" text-anchor="middle">Cliente acorda e tenta gravar no Storage</text>

    <!-- Client 2 -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Cliente 2: Adquire Novo Lock</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Executa e grava no Storage</text>
    <text x="460" y="65" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">💥 Race Condition / Dados Corrompidos</text>
    <text x="460" y="90" fill="#cbd5e1" font-size="10" text-anchor="middle">Dois clientes gravam simultaneamente</text>
  </g>
  <text x="340" y="200" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redlock puro sem fencing tokens não garante correção sob pausas de GC e assincronia de rede.</text>

</svg>
<p>Visualização: Quebra de exclusão mútua quando uma pausa longa de GC no cliente faz o TTL do lock expirar antes do processamento terminar.</p>

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
