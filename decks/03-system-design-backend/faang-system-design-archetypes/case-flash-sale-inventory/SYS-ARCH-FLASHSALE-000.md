---
id: SYS-ARCH-FLASHSALE-000
title: "Vendas Relâmpago (Flash Sale): Reserva Atômica de Inventário em Memória (Redis Lua)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::amazon
  - freq::high
---

## Pergunta
Como a pré-alocação de inventário em Redis com scripts Lua atômicos previne 'Over-selling' (Sobrevenda) sob picos de 500.000 QPS?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema do Banco de Dados Relacional**: Executar `SELECT stock FROM products WHERE id=1 FOR UPDATE` sob 500k QPS bloqueia conexões do pool e derruba o banco de dados.
- **Reserva Atômica no Redis com Lua**:
  1. Antes do início da venda, o estoque total do produto é carregado na RAM do Redis (`SET stock:item_1 1000`).
  2. Quando o usuário clica em comprar, o gateway executa um **Script Lua no Redis**:
     - Verifica se `stock >= quantidade`. Se sim, decrementa `DECRBY stock quantidade` e grava um token de reserva do usuário.
     - Se `stock < quantidade`, retorna erro de esgotado instantaneamente.
  3. Apenas os 1.000 usuários que conseguiram a reserva na RAM recebem autorização para prosseguir para a fila de pagamento no banco de dados.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/flash-sale-redis-lua-atomic-decrement-loop.webm">
    <p>Visualização: Decremento atômico de estoque via script Lua em Redis prevenindo overselling em picos de alta concorrência.</p>
  </video>
</div>

| Estratégia de Reserva | Throughput Máximo Suportado | Risco de Overselling |
|---|---|---|
| **SQL Lock (`SELECT FOR UPDATE`)** | ~1.000 a 3.000 QPS (Gargalo de I/O) | Zero, mas derruba o banco de dados |
| **Redis Lua Script em RAM** | **>100.000 QPS por core de CPU** | **Zero (Execução estritamente atômica)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Script Lua de Reserva Atômica Anti-Overselling
```text
local stock = tonumber(redis.call('get', KEYS[1]))
local quantity = tonumber(ARGV[1])
local userId = ARGV[2]

if stock and stock >= quantity then
  redis.call('decrby', KEYS[1], quantity)
  redis.call('sadd', KEYS[2], userId) -- Registra que usuário já reservou
  return 1 -- Reserva concedida
else
  return 0 -- Esgotado
end
```

</details>
