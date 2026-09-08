---
id: SYS-RES-RATELIMIT-006
title: "Intuição Fundamental de Rate Limiting: A Catraca do Metrô e o Balde de Fichas"
tags:
  - level::l2-fundamental
  - topic::sys::resilience
  - company::stripe
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás do algoritmo Token Bucket para Rate Limiting e como ele protege APIs contra abuso e sobrecarga?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem controle de taxa (**Rate Limiting**), um único cliente com um script em loop infinito ou um invasor mal-intencionado pode disparar 100.000 requisições por segundo e derrubar os servidores para todos os outros usuários legítimos.
- O **Algoritmo Token Bucket (Balde de Fichas)** funciona assim:
  - Um balde com capacidade para $B$ fichas (tokens) recebe novas fichas a uma **taxa constante** (ex: 10 fichas por segundo).
  - Cada requisição que chega precisa **pegar 1 ficha do balde** para poder passar.
  - Se o balde tiver fichas, a requisição passa imediatamente (permite pequenas rajadas de tráfego / *Bursts*).
  - Se o balde estiver vazio, a requisição é rejeitada na hora com o código **HTTP 429 Too Many Requests**.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Algoritmo Token Bucket (Taxa Constante + Suporte a Rajada)</text>

  <!-- O Balde de Tokens -->
  <g transform="translate(180, 45)">
    <!-- O Balde -->
    <path d="M 30 10 L 45 95 L 155 95 L 170 10 Z" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="100" y="40" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Balde (Max: 5)</text>

    <!-- Fichas dentro do balde -->
    <ellipse cx="100" cy="80" rx="35" ry="6" fill="#065f46" stroke="#10b981" />
    <text x="100" y="83" fill="#a7f3d0" font-size="8" text-anchor="middle">Token 1</text>
    <ellipse cx="100" cy="65" rx="32" ry="6" fill="#065f46" stroke="#10b981" />
    <text x="100" y="68" fill="#a7f3d0" font-size="8" text-anchor="middle">Token 2</text>
  </g>

  <!-- Torneira de Tokens (Refill) -->
  <g transform="translate(230, 28)">
    <text x="50" y="0" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">💧 +2 tokens/seg</text>
  </g>

  <!-- Requisições Chegando -->
  <g transform="translate(30, 70)">
    <rect x="0" y="0" width="110" height="50" fill="#1e293b" stroke="#f59e0b" rx="6" />
    <text x="55" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Requisições</text>
    <text x="55" y="38" fill="#cbd5e1" font-size="9" text-anchor="middle">Pede 1 token</text>
  </g>

  <!-- Decisão de Saída -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="150" height="42" fill="#065f46" stroke="#10b981" rx="6" />
    <text x="75" y="18" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Tem Token?</text>
    <text x="75" y="32" fill="#ffffff" font-size="9" text-anchor="middle">Consome Token &amp; HTTP 200 ✓</text>

    <rect x="0" y="55" width="150" height="42" fill="#7f1d1d" stroke="#ef4444" rx="6" />
    <text x="75" y="73" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Balde Vazio?</text>
    <text x="75" y="87" fill="#ffffff" font-size="9" text-anchor="middle">Bloqueia: HTTP 429 ✗</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Em clusters, o estado do Token Bucket é compartilhado em memória no Redis!</text>
</svg>
<p>Visualização: Algoritmo Token Bucket em analogia a balde com fichas: reposição em taxa constante com suporte a rajadas transitórias de requisições.</p>

| Algoritmo de Rate Limit | Vantagem Principal | Desvantagem |
|---|---|---|
| **Token Bucket** | Tolera rajadas rápidas legítimas de tráfego | Exige gerenciar capacidade e taxa de reabastecimento. |
| **Leaky Bucket** | Saída estritamente constante e suave (sem picos) | Requisições recentes podem sofrer atraso na fila. |
| **Sliding Window Counter** | Janela de tempo rolante super precisa | Gasta mais memória RAM por usuário no Redis. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Implementar Rate Limiting Distribuído com Redis
Para limitar por usuário (`userId` ou `IP`) em um cluster com 20 servidores web:
- Usamos um script Lua no Redis para garantir atomicidade: o script checa o saldo de tokens e decrementa em uma única operação atômica em RAM sem risco de *Race Condition*.

#### Cabeçalhos HTTP Padronizados de Resposta
- `X-RateLimit-Limit: 100`: Limite máximo permitido na janela.
- `X-RateLimit-Remaining: 4`: Quantas requisições ainda restam.
- `X-RateLimit-Reset: 1718900000`: Timestamp de quando o limite será resetado.
- `Retry-After: 30`: Quantos segundos o cliente deve aguardar antes de tentar de novo.

#### Key Takeaways
- Rate Limiting é essencial para segurança (DDoS, Brute Force), justiça (*Fair Share*) e monetização por tiers de API (Free vs Pro).
- Retorna sempre **HTTP 429 Too Many Requests**.

</details>
