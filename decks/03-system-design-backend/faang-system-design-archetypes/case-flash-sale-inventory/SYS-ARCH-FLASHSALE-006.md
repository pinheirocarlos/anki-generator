---
id: SYS-ARCH-FLASHSALE-006
title: "Intuição Fundamental de Flash Sales: Os Vouchers de Senha Limitados no Balcão"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a intuição fundamental para evitar sobre-venda (Anti-Overselling) e colapso de banco de dados em promoções relâmpago (Flash Sales / Ticketmaster) de altíssima concorrência?

## Resposta
### Quick Answer
**Solução Direta**:
- Se 1 milhão de pessoas clicarem no botão "Comprar" no mesmo segundo para apenas 100 ingressos disponíveis, fazer consultas `SELECT ... UPDATE estoque` direto no banco de dados relacional travará o banco com sobrecarga de locks e causará **sobre-venda (vender 150 ingressos tendo apenas 100)**.
- **A Solução em 3 Etapas**:
  1. **Fila Virtual / Rate Limit na Borda**: Segura o excesso de multidão em uma sala de espera virtual.
  2. **Controle de Estoque Atômico em RAM (Redis Lua Script)**: O estoque é mantido como um número inteiro na memória RAM (`stock = 100`); o comando atômico `DECR stock` subtrai em microssegundos; se o valor for menor que zero, rejeita na hora (*Sold Out*).
  3. **Reserva com TTL (10 minutos)**: O cliente ganha uma reserva temporária; se ele não concluir o pagamento com o cartão de crédito em 10 minutos, o estoque é devolvido automaticamente para a fila (`INCR stock`).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Controle de Concorrência Extrema em Promoção Relâmpago</text>

  <!-- Multidão de 100k Usuários -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="120" height="90" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="60" y="24" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">100.000 Usuários</text>
    <text x="60" y="46" fill="#f8fafc" font-size="9" text-anchor="middle">Clique simultâneo</text>
    <text x="60" y="66" fill="#ef4444" font-size="9" text-anchor="middle">Pico de 50k RPS</text>
  </g>

  <!-- Redis Atomic Lua Script -->
  <g transform="translate(180, 45)">
    <rect x="0" y="0" width="190" height="100" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="95" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Redis Atômico (Em RAM)</text>
    <rect x="15" y="34" width="160" height="26" fill="#0f172a" rx="4" />
    <text x="95" y="51" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle">Lua Script: DECR stock</text>
    <text x="95" y="74" fill="#ffffff" font-size="10" text-anchor="middle">Apenas 100 passam ✓</text>
    <text x="95" y="90" fill="#fca5a5" font-size="9" text-anchor="middle">99.900 recebem Esgotado ✗</text>
  </g>

  <!-- Fila Assíncrona e Banco Principal -->
  <g transform="translate(400, 50)">
    <rect x="0" y="0" width="165" height="90" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="82" y="24" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Checkout / Faturamento</text>
    <text x="82" y="46" fill="#ffffff" font-size="9" text-anchor="middle">Apenas 100 requisições</text>
    <text x="82" y="66" fill="#10b981" font-size="9" text-anchor="middle">DB opera em paz e sem locks!</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">O banco de dados relacional nunca recebe o impacto de 100k requisições!</text>
</svg>
<p>Visualização: Funil de alta concorrência: sala de espera virtual filtrando tráfego e script Lua em memória garantindo decremento atômico de estoque.</p>

| Mecanismo | O que Faz | Analogia do Cotidiano |
|---|---|---|
| **Redis Lua Script** | Decrementa estoque atomicamente em microssegundos | O funcionário com exatamente 100 pulseiras numeradas na mão entregando para os primeiros 100 da fila. |
| **Sala de Espera Virtual** | Controla o fluxo de entrada | As fitas de isolamento no saguão do aeroporto organizando o embarque em grupos. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Script Lua Atômico no Redis
```text
local stock = tonumber(redis.call('get', KEYS[1]))
if stock > 0 then
    redis.call('decr', KEYS[1])
    return 1 -- Reserva garantida com sucesso
else
    return 0 -- Esgotado
end
```
Como o Redis executa o script Lua como uma operação única atômica, é **matematicamente impossível ocorrer sobre-venda** (*Zero Overselling*).

#### Key Takeaways
- Flash Sales são o teste supremo de resiliência e controle de concorrência.
- O segredo é rejeitar 99% das requisições excedentes na memória RAM em milissegundos antes que elas cheguem perto do banco de dados relacional.

</details>
