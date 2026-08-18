---
id: DSA-PATT-MST-006
title: "Intuição Fundamental de Árvore Geradora Mínima (MST): A Rede Elétrica Mais Barata"
tags:
  - level::l2-fundamental
  - topic::dsa::minimum-spanning-tree
  - company::uber
  - freq::medium
---

## Pergunta
Qual é o objetivo de uma Árvore Geradora Mínima (MST) e como o Algoritmo de Kruskal escolhe os cabos mais baratos sem criar curto-circuitos (ciclos)?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Árvore Geradora Mínima (MST)** conecta todos os $V$ vértices de um grafo usando exatamente **$V - 1$ arestas com o menor custo total possível**, sem formar nenhum ciclo.
- O **Algoritmo de Kruskal** ordena todas as arestas da mais barata para a mais cara e adiciona cada uma à rede, usando o Union-Find (DSU) para **descartar qualquer aresta que feche um ciclo fechado desnecessário**.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">MST (Kruskal): Conecta Todas as Casas Gastando o Mínimo de Fio</text>

  <!-- Grafo Conectado com MST -->
  <g transform="translate(60, 40)">
    <!-- Arestas Aceitas (Verde) -->
    <line x1="40" y1="30" x2="160" y2="30" stroke="#10b981" stroke-width="3" />
    <text x="100" y="22" fill="#34d399" font-size="10" font-weight="bold">R$ 1 (Sim)</text>

    <line x1="160" y1="30" x2="160" y2="100" stroke="#10b981" stroke-width="3" />
    <text x="170" y="70" fill="#34d399" font-size="10" font-weight="bold">R$ 2 (Sim)</text>

    <line x1="160" y1="100" x2="40" y2="100" stroke="#10b981" stroke-width="3" />
    <text x="100" y="115" fill="#34d399" font-size="10" font-weight="bold">R$ 3 (Sim)</text>

    <!-- Aresta Rejeitada (Ciclo - Vermelha pontilhada) -->
    <line x1="40" y1="30" x2="40" y2="100" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" />
    <text x="5" y="70" fill="#f87171" font-size="10" font-weight="bold">R$ 8 (Ciclo ❌)</text>

    <!-- Nós (Casas) -->
    <circle cx="40" cy="30" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="40" y="34" fill="#ffffff" font-size="11" text-anchor="middle">Casa A</text>

    <circle cx="160" cy="30" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="160" y="34" fill="#ffffff" font-size="11" text-anchor="middle">Casa B</text>

    <circle cx="160" cy="100" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="160" y="104" fill="#ffffff" font-size="11" text-anchor="middle">Casa C</text>

    <circle cx="40" cy="100" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="40" y="104" fill="#ffffff" font-size="11" text-anchor="middle">Casa D</text>
  </g>

  <!-- Explicação Lateral -->
  <rect x="290" y="45" width="270" height="85" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
  <text x="425" y="65" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Decisões Gulosas do Kruskal</text>
  <text x="305" y="83" fill="#a7f3d0" font-size="10">1. Pega R$ 1 (A-B): União OK</text>
  <text x="305" y="98" fill="#a7f3d0" font-size="10">2. Pega R$ 2 (B-C): União OK</text>
  <text x="305" y="113" fill="#a7f3d0" font-size="10">3. Pega R$ 3 (C-D): Todos 4 nós conectados!</text>
  <text x="305" y="125" fill="#f87171" font-size="9">4. Pula R$ 8 (A-D): A e D já estão conectados!</text>

  <text x="300" y="165" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Custo Total Mínimo: 1 + 2 + 3 = 6 (Zero desperdício de energia e sem redundância)</text>
</svg>

| Algoritmo | Abordagem | Complexidade |
|---|---|---|
| **Kruskal** | Ordena todas as arestas e conecta florestas usando DSU | $O(E \log E)$ |
| **Prim** | Cresce uma única árvore a partir de um nó adicionando a menor aresta vizinha | $O(E \log V)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia da Instalação de Fibra Óptica em uma Cidade
Uma operadora precisa passar cabos de internet para ligar 10 prédios:
- Se ela passar cabos demais formando círculos fechados, gastará dinheiro à toa.
- O objetivo é que **todo mundo consiga se comunicar com todo mundo**, usando a menor extensão de cabos possível.

#### A Regra das $V - 1$ Arestas
Em qualquer grafo com $V$ vértices, para mantê-lo totalmente conectado sem ciclos, precisamos de **exatamente $V - 1$ arestas**. Nem uma a mais (que geraria ciclo), nem uma a menos (que deixaria alguém desconectado).

#### Key Takeaways
- Ideal para planejamento de redes de telecomunicações, oleodutos, malhas viárias e agrupamento de dados (Clusterização).

</details>
