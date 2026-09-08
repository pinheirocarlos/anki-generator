---
id: DSA-STRUCT-GRAPH-000
title: "Definição Formal de Grafo, Direcionamento e Ponderação de Arestas"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::meta
  - freq::high
---

## Pergunta
O que define formalmente um **Grafo** ($G = (V, E)$) e qual a diferença entre grafos direcionados, não-direcionados e ponderados?

## Resposta
### Quick Answer
**Solução Direta**:
- Um Grafo $G = (V, E)$ é composto por um conjunto de vértices/nós $V$ e um conjunto de arestas $E$ conectando pares de nós.
- **Não-Direcionado**: Arestas são bidirecionais ($(u, v) = (v, u)$). Exemplo: conexões de amizade no Facebook.
- **Direcionado (Digrafo)**: Arestas possuem sentido unidirecional ($u \to v \neq v \to u$). Exemplo: seguidores no Twitter/Instagram ou dependências de pacotes.
- **Ponderado**: Cada aresta possui um peso associado (custo, distância, latência).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Classificação Formal de Grafos: Não-Direcionado, Direcionado e Ponderado</text>
  
  <!-- Painel 1: Não-Direcionado -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="180" height="105" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="90" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Não-Direcionado</text>
    <circle cx="50" cy="55" r="14" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
    <text x="50" y="59" fill="#fff" font-size="10" text-anchor="middle">u</text>
    <line x1="64" y1="55" x2="116" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="130" cy="55" r="14" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
    <text x="130" y="59" fill="#fff" font-size="10" text-anchor="middle">v</text>
    <text x="90" y="88" fill="#94a3b8" font-size="10" text-anchor="middle">(u, v) ≡ (v, u) (Simétrico)</text>
  </g>

  <!-- Painel 2: Direcionado (Digrafo) -->
  <g transform="translate(250, 45)">
    <rect x="0" y="0" width="180" height="105" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="90" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Direcionado (Digrafo)</text>
    <circle cx="50" cy="55" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="59" fill="#fff" font-size="10" text-anchor="middle">u</text>
    <line x1="64" y1="55" x2="114" y2="55" stroke="#10b981" stroke-width="2"/>
    <polygon points="116,55 108,51 108,59" fill="#10b981"/>
    <circle cx="130" cy="55" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="130" y="59" fill="#fff" font-size="10" text-anchor="middle">v</text>
    <text x="90" y="88" fill="#94a3b8" font-size="10" text-anchor="middle">u → v ≠ v → u (Fluxo)</text>
  </g>

  <!-- Painel 3: Ponderado -->
  <g transform="translate(460, 45)">
    <rect x="0" y="0" width="180" height="105" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6"/>
    <text x="90" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Ponderado</text>
    <circle cx="50" cy="55" r="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
    <text x="50" y="59" fill="#fff" font-size="10" text-anchor="middle">u</text>
    <line x1="64" y1="55" x2="116" y2="55" stroke="#f59e0b" stroke-width="2"/>
    <rect x="80" y="44" width="20" height="14" fill="#78350f" rx="3"/>
    <text x="90" y="55" fill="#fef3c7" font-size="9" text-anchor="middle">w=7</text>
    <circle cx="130" cy="55" r="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
    <text x="130" y="59" fill="#fff" font-size="10" text-anchor="middle">v</text>
    <text x="90" y="88" fill="#94a3b8" font-size="10" text-anchor="middle">Peso w: Custo / Latência</text>
  </g>

  <text x="340" y="180" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">G = (V, E): Vértices representam entidades e Arestas modelam relações e conectividade</text>
</svg>

<p>Visualização: Tipos fundamentais de grafos: não-direcionado (simétrico), direcionado (digrafo) e ponderado com pesos nas arestas.</p>

| Tipo de Grafo | Simetria de Aresta | Exemplo de Aplicação |
|---|---|---|
| **Não-Direcionado** | $(u, v) \iff (v, u)$ | Redes de computadores / Amizades |
| **Direcionado (Digrafo)** | $u \to v$ | Navegação web / Pré-requisitos |
| **Ponderado** | $(u, v, w)$ com peso $w$ | Rotas de GPS (distância em km) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O direcionamento e a presença de pesos determinam quais algoritmos são aplicáveis (ex: Dijkstra para ponderados não-negativos, BFS para não-ponderados).

</details>
