---
id: SYS-CACHE-ANOMALIES-001
title: "Cache Penetration vs Cache Breakdown vs Cache Avalanche"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual entre as anomalias de Cache Penetration, Cache Breakdown e Cache Avalanche?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache Penetration**: Requisições consultam chaves que **não existem nem no cache nem no banco de dados** (ex: ataque malicioso com IDs aleatórios `id=-999`). Toda requisição perfura o cache e atinge o banco.
  - *Mitigação*: **Bloom Filter** na frente do cache ou armazenar valores nulos temporários com TTL curto (`SET key NULL EX 60`).
- **Cache Breakdown**: **Uma única chave quente** (Hot Key) expira sob alto tráfego.
  - *Mitigação*: Mutex lock / Singleflight ou chaves sem expiração com refresh assíncrono.
- **Cache Avalanche**: **Múltiplas chaves diferentes expiram no mesmo milissegundo** porque foram criadas com o mesmo TTL fixo.
  - *Mitigação*: Adicionar **Jitter aleatório** ao TTL (`TTL = 3600 + rand(0, 300)`).

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Anomalias de Cache: Penetration vs Breakdown vs Avalanche</text>
  <g transform="translate(30, 50)">
    <!-- Penetration -->
    <rect x="0" y="0" width="190" height="140" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="95" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Cache Penetration</text>
    <text x="95" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Chave inexistente no DB</text>
    <text x="95" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Bate direto no DB sempre</text>
    <rect x="15" y="95" width="160" height="30" rx="4" fill="#78350f"/>
    <text x="95" y="114" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Solução: Bloom Filter / Null</text>

    <!-- Breakdown -->
    <rect x="215" y="0" width="190" height="140" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="310" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Cache Breakdown</text>
    <text x="310" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">1 Hot Key expira sob alta carga</text>
    <text x="310" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Múltiplos misses da mesma chave</text>
    <rect x="230" y="95" width="160" height="30" rx="4" fill="#7f1d1d"/>
    <text x="310" y="114" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Solução: Mutex / Soft TTL</text>

    <!-- Avalanche -->
    <rect x="430" y="0" width="190" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="525" y="22" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">Cache Avalanche</text>
    <text x="525" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Milhares de chaves expiram juntas</text>
    <text x="525" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Ou queda global do nó Redis</text>
    <rect x="445" y="95" width="160" height="30" rx="4" fill="#4c1d95"/>
    <text x="525" y="114" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">Solução: TTL Jitter + Cluster</text>
  </g>
  <text x="340" y="212" fill="#94a3b8" font-size="10" text-anchor="middle">TTL Jitter: TTL_final = Base_TTL + rand(0, delta) para dispersar a expiração temporal.</text>

</svg>
<p>Visualização: Filtro de Bloom intercepta consultas a chaves inexistentes (Penetration) e TTL jitter evita expiração simultânea em massa (Avalanche).</p>

| Anomalia | Causa Raiz | Mitigação Principal |
|---|---|---|
| **Penetration** | Chave inexistente no sistema todo | Bloom Filter / Cache Null |
| **Breakdown** | 1 Hot Key específica expira | Mutex / Singleflight |
| **Avalanche** | Milhares de chaves expiram juntas | TTL com Jitter Aleatório |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Funciona o Bloom Filter contra Penetration
- O Bloom Filter é uma estrutura de dados probabilística em memória ultra-compacta:
  - Se o Bloom Filter diz que a chave **NÃO existe**, é uma certeza absoluta ($100\%$ de acerto): a requisição é rejeitada imediatamente sem tocar no cache ou no banco.
  - Se diz que **TALVEZ exista**, a busca prossegue normalmente.

</details>
