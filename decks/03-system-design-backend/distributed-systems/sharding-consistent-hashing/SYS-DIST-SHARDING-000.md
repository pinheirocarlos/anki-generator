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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/consistent-hashing-ring-node-add-remove-loop.webm">
    <p>Visualização: Anel de Consistent Hashing remapeando apenas as chaves do segmento vizinho quando nós entram ou saem do cluster.</p>
  </video>
</div>

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
