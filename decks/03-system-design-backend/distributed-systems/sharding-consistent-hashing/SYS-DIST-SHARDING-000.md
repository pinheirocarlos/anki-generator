---
id: SYS-DIST-SHARDING-000
title: "Consistent Hashing e Anel Hash (Hash Ring)"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Como o algoritmo de Consistent Hashing minimiza a realocação de chaves quando nós são adicionados ou removidos de um cluster de armazenamento distribuído?

## Resposta
### Quick Answer
**Solução Direta**:
- Em abordagens ingênuas com módulo $(\text{hash}(key) \pmod N)$, adicionar ou remover 1 nó faz com que quase **100% das chaves** sejam remapeadas para novos nós (*Cache Invalidation Storm*).
- **Consistent Hashing**:
  1. Mapeia tanto os servidores quanto as chaves em um espaço circular contínuo de endereçamento (**Hash Ring**, ex: $0$ a $2^{32}-1$).
  2. Para localizar o nó responsável por uma chave, calcula-se $\text{hash}(key)$ e caminha-se no sentido horário pelo anel até encontrar o primeiro nó.
  3. Ao adicionar ou remover 1 servidor, apenas **$1/N$ das chaves** em média precisam ser migradas (apenas as chaves entre o novo nó e seu antecessor).

### Dual Coding Visual
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Anel de Consistent Hashing (Espaço de Chaves de 0 a 2^32 - 1)</text>
  <g transform="translate(40, 50)">
    <!-- Ring -->
    <circle cx="150" cy="70" r="60" fill="none" stroke="#38bdf8" stroke-width="3"/>
    
    <!-- Node A -->
    <circle cx="150" cy="10" r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
    <text x="150" y="14" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Node A</text>

    <!-- Node B -->
    <circle cx="210" cy="70" r="12" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="210" y="74" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Node B</text>

    <!-- Node C -->
    <circle cx="90" cy="70" r="12" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="90" y="74" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Node C</text>

    <!-- Explanation Box -->
    <rect x="280" y="0" width="320" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="440" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Roteamento no Sentido Horário</text>
    <text x="440" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Hash(Key) posiciona no anel</text>
    <text x="440" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Caminha no sentido horário até achar 1º nó</text>
    <text x="440" y="92" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Adicionar nó: move apenas K/N chaves</text>
    <text x="440" y="115" fill="#f87171" font-size="9" text-anchor="middle">vs Hash(k)%N que moveria ~100% das chaves</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Utilizado por DynamoDB, Cassandra, Memcached e Discord para balanceamento uniforme e elástico.</text>

</svg>

| Estratégia de Hashing | Chaves Remapeadas ao Alterar Cluster | Impacto em Produção |
|---|---|---|
| **Hash Tradicional ($\% N$)** | $\approx \frac{N-1}{N} \approx 100\%$ | Avalanche de requisições no DB primário |
| **Consistent Hashing** | $\approx \frac{1}{N}$ | Migração pontual e suave de dados |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Conceitual
- Se temos 4 nós ($A, B, C, D$) e adicionamos o nó $E$ entre $B$ e $C$:
  - Apenas as chaves que antes caíam em $C$ mas possuem hash anterior a $E$ são transferidas para $E$.
  - Todas as chaves pertencentes a $A, B$ e $D$ permanecem 100% inalteradas.

</details>
