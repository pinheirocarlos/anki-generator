---
id: SYS-RES-RATELIMIT-001
title: "Rate Limiting Distribuído no Redis com Sliding Window Counter e Script Lua"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::uber
  - freq::high
---

## Pergunta
Como implementar um Rate Limiter distribuído de Janela Deslizante (Sliding Window Counter) de alta performance no Redis usando Sorted Sets e scripts Lua?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo de Janela Deslizante com Redis ZSet**:
  1. Utiliza um Sorted Set por usuário/IP com chave `rate_limit:{user_id}`.
  2. O `Score` e o `Member` armazenam o timestamp atual em milissegundos.
  3. **Passo 1 (Remover antigos)**: `ZREMRANGEBYSCORE key 0 (now - window_size)`.
  4. **Passo 2 (Contar requisições na janela)**: `ZCARD key`.
  5. **Passo 3 (Verificar e Inserir)**: Se contagem $< \text{limite}$, executa `ZADD key now now` e define `EXPIRE key window_size`.
  6. Toda a sequência é encapsulada em um **Script Lua atômico** para evitar condições de corrida em ambientes multi-instância.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rate Limiter Distribuído: Sliding Window Counter com Redis ZSet e Lua</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Script Lua Atômico: Janela Deslizante Exata de 60 Segundos</text>

    <!-- Steps -->
    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="65" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">1. ZREMRANGEBYSCORE</text>
      <text x="85" y="42" fill="#bae6fd" font-size="8" text-anchor="middle">Remove timestamps &lt; (now - 60s)</text>

      <rect x="195" y="0" width="170" height="65" rx="4" fill="#0369a1"/>
      <text x="280" y="22" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">2. ZCARD key</text>
      <text x="280" y="42" fill="#bae6fd" font-size="8" text-anchor="middle">Conta requisições na janela ativa</text>

      <rect x="390" y="0" width="170" height="65" rx="4" fill="#065f46"/>
      <text x="475" y="22" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">3. ZADD key now now</text>
      <text x="475" y="42" fill="#ffffff" font-size="8" text-anchor="middle">Se ZCARD &lt; limit: aceita / senão: 429</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Elimina o problema de borda (Boundary Burst) do contador de janela fixa que permitia 2x o limite no cruzamento do minuto.</text>

</svg>

| Etapa no ZSet do Redis | Comando Executado | Efeito |
|---|---|---|
| **1. Purga** | `ZREMRANGEBYSCORE` | Remove registros fora da janela deslizante |
| **2. Contagem** | `ZCARD` | Obtém volume de requisições recentes |
| **3. Admissão** | `ZADD` + `EXPIRE` | Registra requisição atual se contagem $<$ limite |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Script Lua de Janela Deslizante Atômica
```text
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local clearBefore = now - window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)

local currentRequests = redis.call('ZCARD', key)
if currentRequests < limit then
  redis.call('ZADD', key, now, now)
  redis.call('EXPIRE', key, math.ceil(window / 1000))
  return 1 -- Permitido
else
  return 0 -- Bloqueado (HTTP 429)
end
```

</details>
