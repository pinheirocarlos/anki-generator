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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Vendas Relâmpago (Flash Sale): Reserva Atômica com Redis Lua</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Script Lua Atômico Executando em RAM Pura no Redis (100.000 QPS)</text>

    <!-- Lua code snippet -->
    <rect x="20" y="40" width="560" height="65" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="1"/>
    <text x="40" y="60" fill="#38bdf8" font-size="9" font-family="monospace">local stock = tonumber(redis.call('GET', KEYS[1]))</text>
    <text x="40" y="78" fill="#38bdf8" font-size="9" font-family="monospace">if stock &gt;= tonumber(ARGV[1]) then redis.call('DECRBY', KEYS[1], ARGV[1]); return 1;</text>
    <text x="40" y="96" fill="#f87171" font-size="9" font-family="monospace">else return 0; end</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Single-thread do Redis garante zero race condition e zero overselling sem travar o banco relacional.</text>

</svg>
<p>Visualização: Decremento atômico de estoque via script Lua em Redis prevenindo overselling em picos de alta concorrência.</p>

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
