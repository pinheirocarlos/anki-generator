---
id: DSA-PATT-SPATH-004
title: "Algoritmo de Bellman-Ford e Detecção de Ciclos Negativos em O(V·E)"
tags:
  - level::l4-pleno
  - topic::dsa::shortest-path-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Bellman-Ford** relaxa todas as arestas $V-1$ vezes e detecta ciclos negativos em tempo $O(V \cdot E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O caminho mais curto simples em um grafo de $V$ vértices contém no máximo $V - 1$ arestas.
- **Algoritmo**:
  1. Executa $V - 1$ rodadas de relaxamento sobre **todas as $E$ arestas** do grafo: para cada $(u, v, w)$, se $\text{dist}[u] + w < \text{dist}[v]$, faz $\text{dist}[v] = \text{dist}[u] + w$.
  2. **Detecção de Ciclo Negativo**: Executa uma $V$-ésima rodada. Se qualquer aresta ainda puder ser relaxada ($\text{dist}[u] + w < \text{dist}[v]$), significa que existe um **Ciclo de Peso Negativo** alcançável a partir da origem.
- **Complexidade**: $O(V \cdot E)$ tempo e $O(V)$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bellman-ford-negative-cycle-loop.webm">
    <p>Visualização: Relaxamento de todas as E arestas V-1 vezes com V-ésima passada detectando ciclos de custo negativo.</p>
  </video>
</div>

| Rodada de Bellman-Ford | Propósito | Diagnóstico |
|---|---|---|
| **Rodadas $1$ a $V-1$** | Propaga distâncias mínimas | Convergência de caminhos simples |
| **Rodada $V$ (Extra)** | Verifica se ainda reduz distância | Se reduzir $\implies$ Ciclo Negativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É utilizado em protocolos de roteamento de redes como RIP (Routing Information Protocol) baseado em Distance-Vector.

</details>
