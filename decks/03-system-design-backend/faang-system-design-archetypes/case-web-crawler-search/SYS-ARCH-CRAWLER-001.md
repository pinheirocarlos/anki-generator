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
