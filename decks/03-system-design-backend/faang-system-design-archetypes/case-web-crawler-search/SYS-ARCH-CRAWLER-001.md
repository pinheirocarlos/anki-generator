---
id: SYS-ARCH-CRAWLER-001
title: "Deduplicação de Conteúdo em Escala com SimHash e Filtro de Bloom"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como crawlers em escala de petabytes eliminam URLs repetidas e páginas quase idênticas (Near-Duplicates) usando Bloom Filters e SimHash?

## Resposta
### Quick Answer
**Solução Direta**:
- **Deduplicação de URLs (Bloom Filter)**:
  - Antes de inserir uma URL na Frontier, o sistema consulta um **Bloom Filter distribuído em RAM**.
  - Ocupa apenas $\approx 10 \text{ bits por URL}$ com taxa de falso positivo $< 1\%$, eliminando ciclos e downloads redundantes de bilhões de links com custo de memória minúsculo.
- **Deduplicação de Conteúdo Quase Idêntico (SimHash - Locality Sensitive Hashing)**:
  - Duas páginas com o mesmo texto mas pequenos detalhes diferentes (ex: data ou contador de likes) geram hashes convencionais (MD5/SHA256) totalmente divergentes (*Avalanche Effect*).
  - O **SimHash de 64 bits** preserva a proximidade semântica: textos similares possuem **Distância de Hamming pequena** (diferem em apenas 1 a 3 bits), permitindo identificar e descartar páginas duplicadas instantaneamente.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Deduplicação de Conteúdo em Escala com SimHash &amp; Filtro de Bloom</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Filtro de Bloom: URLs Visitadas</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">10 Bilhões de URLs no Bloom Filter</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Consome apenas ~1.2 GB de RAM</text>
    <text x="140" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero falso negativo: nunca revisita URL</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">SimHash: Detecção de Quase-Duplicatas</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Gera fingerprint de 64 bits do texto</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Distância de Hamming &lt;= 3 bits</text>
    <text x="460" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Descarta páginas com conteúdo idêntico</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Reduz em até 30% o volume de páginas processadas na esteira de indexação sem perda de qualidade.</text>

</svg>

| Técnica de Deduplicação | O que Deduplica | Estrutura Utilizada |
|---|---|---|
| **Bloom Filter** | URLs já visitadas ou enfileiradas | Array de bits com múltiplas funções hash |
| **SimHash (LSH)** | Conteúdo textual quase idêntico | Hashes de 64 bits comparados por Hamming Distance |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cálculo do SimHash
1. Tokeniza o texto e calcula o peso de cada palavra (TF-IDF).
2. Para cada palavra, calcula um hash de 64 bits.
3. Soma vetores: se o bit $i$ do hash for 1, soma o peso; se 0, subtrai.
4. Gera o SimHash final: bit 1 para valores positivos e bit 0 para negativos.

</details>
