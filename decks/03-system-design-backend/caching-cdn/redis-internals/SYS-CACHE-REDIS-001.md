---
id: SYS-CACHE-REDIS-001
title: "Estruturas de Dados Internas do Redis: SDS, ZipList e SkipList (ZSet)"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::redis
  - freq::high
---

## Pergunta
Como o Redis implementa Sorted Sets (ZSet) combinando internamente uma SkipList e uma Hash Table para obter operações de busca e ranking em $O(\log N)$ e $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A estrutura **Sorted Set (ZSet)** do Redis atende a dois casos de uso distintos com máxima eficiência combinando:
  1. **Hash Table**: Mapeia `Member -> Score` para consultas de pontuação em tempo constante **$O(1)$** (ex: `ZSCORE`).
  2. **SkipList (Lista com Saltos)**: Mantém os elementos ordenados por pontuação (`Score`), permitindo inserções, remoções e consultas por ranking/faixa em tempo logarítmico **$O(\log N)$** (ex: `ZRANGEBYSCORE`, `ZRANK`).
- Para conjuntos pequenos com poucos elementos, o Redis utiliza codificações compactas em memória (**ZipList / ListPack**) economizando até $80\%$ de RAM.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">SkipList Probabilística do Redis ZSet: Busca O(log N) em Memória</text>
  <g transform="translate(40, 50)">
    <!-- Level 3 -->
    <text x="30" y="25" fill="#f59e0b" font-size="10" font-weight="bold">L3</text>
    <circle cx="80" cy="20" r="12" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="80" y="24" fill="#ffffff" font-size="9" text-anchor="middle">HEAD</text>
    <line x1="95" y1="20" x2="485" y2="20" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="500" cy="20" r="12" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="500" y="24" fill="#ffffff" font-size="9" text-anchor="middle">90</text>

    <!-- Level 2 -->
    <text x="30" y="60" fill="#38bdf8" font-size="10" font-weight="bold">L2</text>
    <circle cx="80" cy="55" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="95" y1="55" x2="285" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="300" cy="55" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="59" fill="#ffffff" font-size="9" text-anchor="middle">45</text>
    <line x1="315" y1="55" x2="485" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="500" cy="55" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="500" y="59" fill="#ffffff" font-size="9" text-anchor="middle">90</text>

    <!-- Level 1 (All nodes) -->
    <text x="30" y="95" fill="#10b981" font-size="10" font-weight="bold">L1</text>
    <circle cx="80" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <line x1="95" y1="90" x2="185" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="200" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="200" y="94" fill="#ffffff" font-size="9" text-anchor="middle">20</text>
    <line x1="215" y1="90" x2="285" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="300" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="94" fill="#ffffff" font-size="9" text-anchor="middle">45</text>
    <line x1="315" y1="90" x2="385" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="400" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="400" y="94" fill="#ffffff" font-size="9" text-anchor="middle">70</text>
    <line x1="415" y1="90" x2="485" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="500" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="500" y="94" fill="#ffffff" font-size="9" text-anchor="middle">90</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="11" text-anchor="middle">ZSet combina Hash Map (lookup O(1) por membro) com SkipList (consultas de range por score O(log N + M)).</text>

</svg>
<p>Visualização: SkipList probabilística do Redis ZSet permitindo buscas e inserções em O(log N) combinada com Hash Map para lookup em O(1).</p>

| Operação no ZSet | Estrutura Interna Utilizada | Complexidade de Tempo |
|---|---|---|
| `ZSCORE member` | Hash Table | $O(1)$ |
| `ZRANGEBYSCORE min max` | SkipList | $O(\log N + M)$ |
| `ZRANK member` | SkipList com contadores de largura (*Span*) | $O(\log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como a SkipList Calcula o Ranking ($O(\log N)$)
- Cada ponteiro entre nós na SkipList do Redis armazena um atributo `span` (quantos nós aquele salto pula). O ranking é calculado somando os `spans` percorridos do topo até o elemento alvo, sem precisar contar nós um a um.

</details>
