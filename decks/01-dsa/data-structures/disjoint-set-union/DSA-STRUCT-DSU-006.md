---
id: DSA-STRUCT-DSU-006
title: "Intuição Fundamental de Union-Find (DSU): Os Clãs e seus Líderes Representantes"
tags:
  - level::l2-fundamental
  - topic::dsa::disjoint-set-union
  - company::uber
  - freq::high
---

## Pergunta
Qual é o modelo mental do Disjoint Set Union (Union-Find) para agrupar elementos e descobrir se dois pontos já estão conectados?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Union-Find (DSU)** gerencia conjuntos de elementos onde cada grupo elege um **Líder Supremo (Representante)**.
- Para saber se dois elementos pertencem à mesma família/rede (`Find`), basta checar se ambos apontam para o mesmo líder final. Para unir dois grupos (`Union`), basta fazer o líder de um grupo apontar para o líder do outro.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">DSU: Cada Membro Aponta para seu Pai até Chegar ao Líder</text>

  <!-- Grupo A (Líder A) -->
  <g transform="translate(60, 45)">
    <!-- Líder A -->
    <circle cx="90" cy="25" r="18" fill="#065f46" stroke="#10b981" stroke-width="2.5" />
    <text x="90" y="30" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Líder 1</text>

    <!-- Linhas -->
    <line x1="40" y1="85" x2="90" y2="25" stroke="#10b981" stroke-width="2" />
    <line x1="140" y1="85" x2="90" y2="25" stroke="#10b981" stroke-width="2" />

    <!-- Membros -->
    <circle cx="40" cy="85" r="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
    <text x="40" y="90" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">2</text>

    <circle cx="140" cy="85" r="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
    <text x="140" y="90" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">3</text>
    <text x="90" y="125" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">Família A</text>
  </g>

  <!-- Seta de União (Union) -->
  <path d="M 250 80 L 320 80" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4" />
  <polygon points="325,80 315,75 315,85" fill="#f59e0b" />
  <text x="285" y="70" fill="#f59e0b" font-size="11" font-family="sans-serif" text-anchor="middle">Union()</text>

  <!-- Grupo B (Líder B) -->
  <g transform="translate(350, 45)">
    <!-- Líder B -->
    <circle cx="90" cy="25" r="18" fill="#78350f" stroke="#f59e0b" stroke-width="2.5" />
    <text x="90" y="30" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Líder 4</text>

    <!-- Linhas -->
    <line x1="90" y1="85" x2="90" y2="25" stroke="#f59e0b" stroke-width="2" />

    <!-- Membros -->
    <circle cx="90" cy="85" r="15" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
    <text x="90" y="90" fill="#ffffff" font-size="11" font-family="sans-serif" text-anchor="middle">5</text>
    <text x="90" y="125" fill="#fde68a" font-size="10" font-family="sans-serif" text-anchor="middle">Família B</text>
  </g>

  <text x="300" y="180" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Find(2) == Líder 1 | Find(3) == Líder 1 ➔ Mesma família instantaneamente!</text>
</svg>

| Operação | Tempo com Otimizações | O que faz |
|---|---|---|
| **`find(x)`** | Quase $O(1)$ ($\alpha(N)$) | Sobe a cadeia de pais até achar o líder raiz |
| **`union(x, y)`** | Quase $O(1)$ ($\alpha(N)$) | Conecta o líder de $x$ ao líder de $y$ |
| **Detecção de Ciclo** | Quase $O(1)$ | Se `find(x) == find(y)` antes de unir, adicionar a aresta geraria um ciclo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia dos Clãs Medievais
Imagine aldeias medievais isoladas:
- Cada aldeia tem um patriarca (líder).
- Se a pessoa `2` quer saber se tem laços com a pessoa `5`, ambas perguntam: *"Quem é o seu patriarca supremo?"*.
- Se ambas responderem *"Patriarca 1"*, elas já estão conectadas.
- Se houver um casamento entre as famílias, o patriarca da família menor passa a responder ao patriarca da maior (união por rank).

#### A Otimização Genial: Compressão de Caminho (Path Compression)
Na primeira vez que você sobe a montanha para descobrir quem é o líder supremo, na volta você faz **todos os membros do caminho apontarem diretamente para o líder supremo**. Nas próximas consultas, a resposta é dada em um único passo imediato!

#### Key Takeaways
- É a estrutura de dados central para detecção de ciclos em grafos e no algoritmo de Kruskal (árvore geradora mínima).
- Sua complexidade prática é indistinguível de $O(1)$ no mundo real.

</details>
