---
id: SYS-CACHE-ANOMALIES-006
title: "Intuição Fundamental de Anomalias de Cache: A Corrida da Boiada no Portão Aberto"
tags:
  - level::l2-fundamental
  - topic::sys::caching
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás do efeito Cache Stampede (Thundering Herd) e como bloqueios distribuídos (Mutex) ou pré-aquecimento evitam o colapso do banco de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache Stampede (Thundering Herd / Avalanche)** ocorre quando um dado ultra-popular (como a home page do Netflix) expira do cache exatamente no mesmo milissegundo:
  - Dezenas de milhares de requisições simultâneas percebem o *Cache Miss* ao mesmo tempo.
  - Todas as 50.000 requisições correm desesperadamente para recalcular e consultar o banco de dados principal no mesmo segundo, derrubando o banco por sobrecarga imediata.
- **Solução com Mutex (Lock de Reconstrução)**: Apenas a **primeira requisição** ganha permissão de consultar o banco e recriar o cache; todas as outras 49.999 requisições aguardam alguns milissegundos ou recebem o dado anterior ligeiramente desatualizado (*stale-while-revalidate*).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Cache Stampede vs Proteção por Mutex / Single-Flight</text>

  <!-- Cenário de Colapso (Sem Proteção) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="230" height="90" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="8" />
    <text x="115" y="22" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Sem Proteção: Colapso</text>
    <text x="115" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">50k requests têm Miss no cache</text>
    <text x="115" y="62" fill="#ef4444" font-size="10" text-anchor="middle">50.000 queries batem no DB</text>
    <text x="115" y="80" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">💥 DB cai por sobrecarga de CPU</text>
  </g>

  <!-- Cenário Protegido (Single-Flight) -->
  <g transform="translate(330, 50)">
    <rect x="0" y="0" width="230" height="90" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="8" />
    <text x="115" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Com Mutex / Single-Flight</text>
    <text x="115" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Apenas 1 request vai ao DB</text>
    <text x="115" y="62" fill="#10b981" font-size="10" text-anchor="middle">49.999 aguardam o resultado</text>
    <text x="115" y="80" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">🛡️ DB protegido e estável</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Estratégia: Adicione Jitter (variação aleatória) nos TTLs para evitar expiração simultânea!</text>
</svg>
<p>Visualização: Analogia intuitiva do Cache Stampede comparando o colapso por avalanche de consultas simultâneas no banco de dados com a estabilização resiliente via Mutex / Single-Flight.</p>

| Anomalia de Cache | O que Acontece | Analogia do Cotidiano |
|---|---|---|
| **Cache Stampede (Herd)** | Dado quente expira e milhares correm ao banco | A lâmpada da sala apaga e 100 pessoas correm para apertar o mesmo interruptor. |
| **Cache Penetration** | Buscas por chaves inexistentes batem no banco | Pessoas ligando na pizzaria pedindo comida japonesa: a pizzaria perde tempo checando o cardápio. |
| **Cache Avalanche** | Milhares de chaves expiram no mesmo segundo | Todas as portas do estádio fecharem simultaneamente na hora do gol. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Proteger Cada Anomalia
1. **Contra Cache Stampede**: Use Single-Flight (Go `singleflight` ou locks distribuídos com Redis).
2. **Contra Cache Penetration**: Use **Bloom Filters** na frente do cache para descartar chaves inexistentes instantaneamente, ou faça cache de valor nulo (`null`) com TTL curto.
3. **Contra Cache Avalanche**: Nunca configure o TTL de todos os produtos como exatamente 3.600 segundos. Use **Jitter** (adicionar um tempo aleatório: $3600 \pm \text{random}(0, 300)$ segundos).

#### Key Takeaways
- Duas coisas são difíceis na computação: invalidação de cache e nomear variáveis.
- Blindar o banco de dados contra falhas de cache é requisito mandatório em arquiteturas de alta disponibilidade.

</details>
