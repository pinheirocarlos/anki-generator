---
id: DSA-STRUCT-LIST-003
title: "Trade-offs de Overhead de Ponteiros e Cache Misses em Listas Ligadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::meta
  - freq::high
---

## Pergunta
Quais são as desvantagens de consumo de memória e localidade de cache de listas encadeadas em relação a arrays?

## Resposta
### Quick Answer
**Solução Direta**:
- **Overhead de Memória**: Cada nó exige 8 bytes (em 64-bit) para o ponteiro `next` (mais 8 bytes para `prev` em listas duplas) além do payload, gerando um desperdício de 50% a 75% da memória apenas com ponteiros.
- **Cache Misses Críticos**: Como os nós são alocados em momentos distintos, eles ficam espalhados pelo Heap; percorrer a lista gera um salto aleatório de memória por nó, inutilizando o pré-fetcher de hardware da CPU.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/linked-list-cache-miss-loop.webm">
    <p>Visualização: Dispersão espacial de nós na memória heap gerando saltos e cache misses sucessivos na CPU.</p>
  </video>
</div>

| Característica | Lista Encadeada | Array Contíguo |
|---|---|---|
| **Overhead por Elemento** | 8–16 bytes (ponteiros) | 0 bytes extras |
| **Aproveitamento de Cache Line** | Baixo (1 nó por salto) | Alto (múltiplos itens na linha) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Análise de Overhead em 64-bit
Para armazenar um inteiro de 4 bytes (`int32`):
- **Array Contíguo**: 4 bytes por elemento.
- **Lista Duplamente Encadeada**: 4 bytes (valor) + 4 bytes (padding) + 8 bytes (`prev`) + 8 bytes (`next`) + 16 bytes (header de objeto JVM) = **40 bytes** para guardar 4 bytes de dado ($10\times$ mais memória).

#### Key Takeaways
- Em cenários com restrição de memória ou sensibilidade a latência de CPU, vetores dinâmicos são quase invariavelmente preferíveis a listas ligadas.

</details>
