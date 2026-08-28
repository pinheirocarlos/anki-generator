---
id: DSA-PATT-SPATH-000
title: "Por que BFS Falha com Arestas Ponderadas e a Intuição de Dijkstra"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::google
  - freq::high
---

## Pergunta
Por que a BFS tradicional falha em encontrar o caminho mais curto em grafos com **arestas de pesos diferentes** e como Dijkstra resolve essa limitação?

## Resposta
### Quick Answer
**Solução Direta**:
- A BFS assume que cada aresta tem peso unitário uniforme ($1$), medindo distância apenas por contagem de passos.
- Em grafos ponderados, um caminho com **mais arestas** pode ter **custo total menor** que um caminho direto com uma única aresta pesada (ex: $A \to B \to C$ com custo $1 + 1 = 2$ vs $A \to C$ com custo $10$).
- **Dijkstra** substitui a Fila FIFO por uma **Fila de Prioridade (Min-Heap)**, expandindo sempre o nó com a **menor distância acumulada acumulada até o momento**, garantindo a corretude com custos desiguais não-negativos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Dijkstra: Relaxamento de Arestas com Min-Heap em O((V + E) log V)</text>
  <g transform="translate(100, 50)">
    <circle cx="50" cy="35" r="18" fill="#047857" stroke="#10b981" stroke-width="2"/><text x="50" y="38" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">U</text><text x="50" y="65" fill="#34d399" font-size="9" text-anchor="middle">dist[u]=4</text>
    
    <line x1="68" y1="35" x2="232" y2="35" stroke="#3b82f6" stroke-width="2.5"/>
    <rect x="130" y="22" width="40" height="24" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="150" y="38" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">w=3</text>

    <circle cx="250" cy="35" r="18" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="250" y="38" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">V</text><text x="250" y="65" fill="#f43f5e" font-size="9" text-decoration="line-through" text-anchor="middle">dist[v]=10</text>
  </g>
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="220" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="110" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Condição de Relaxamento:</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">dist[u] + w &lt; dist[v]</text>
    <text x="15" y="58" fill="#34d399" font-size="10" font-weight="bold">→ dist[v] = 4 + 3 = 7</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante menor distância para pesos não-negativos; falha em arestas com peso negativo</text>

</svg>

| Algoritmo | Fila e Métrica de Expansão | Aplicabilidade |
|---|---|---|
| **BFS** | Fila FIFO / Contagem de saltos ($w=1$) | Apenas pesos unitários |
| **Dijkstra** | Min-Heap / Custo acumulado $\sum w$ | Pesos não-negativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dijkstra é essencialmente uma BFS orientada a menor custo acumulado em vez de menor contagem de saltos.

</details>
