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
