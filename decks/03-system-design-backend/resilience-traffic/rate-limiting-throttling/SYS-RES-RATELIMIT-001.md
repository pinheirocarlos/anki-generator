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
