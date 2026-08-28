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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">0-1 BFS com Deque em Tempo Linear O(V + E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Substitui Min-Heap O((V+E) log V) por Deque O(V + E)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao relaxar aresta de peso 0: deque.push_front(v) (prioridade máxima imediata).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Ao relaxar aresta de peso 1: deque.push_back(v) (próximo nível).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Mantém a monotonicidade de distância do deque com custo O(1) por operação</text>

</svg>

| Rodada de Bellman-Ford | Propósito | Diagnóstico |
|---|---|---|
| **Rodadas $1$ a $V-1$** | Propaga distâncias mínimas | Convergência de caminhos simples |
| **Rodada $V$ (Extra)** | Verifica se ainda reduz distância | Se reduzir $\implies$ Ciclo Negativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É utilizado em protocolos de roteamento de redes como RIP (Routing Information Protocol) baseado em Distance-Vector.

</details>
