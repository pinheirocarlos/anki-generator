---
id: DSA-PATT-TRAVERSAL-005
title: "Detecção de Ciclos em Grafos Direcionados via DFS de 3 Cores (White, Gray, Black)"
tags:
  - level::l4-pleno
  - topic::dsa::bfs-dfs-traversals
  - company::amazon
  - freq::high
---

## Pergunta
Como o algoritmo de **Coloração de 3 Estados (White, Gray, Black)** detecta ciclos em grafos direcionados via DFS em tempo $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada vértice possui 1 de 3 estados de cor:
  1. **White (0 - Não Visitado)**: Vértice ainda não processado.
  2. **Gray (1 - Em Processamento / Na Pilha Atual)**: Vértice está na cadeia de recursão ativa no momento.
  3. **Black (2 - Concluído)**: Vértice e toda a sua subárvore já foram totalmente explorados sem ciclos.
- **Detecção de Ciclo**: Durante a travessia DFS a partir de um nó cinza, se encontrarmos um vizinho que **já é cinza (Gray)**, encontramos uma **Back-Edge** (aresta de retorno para um ancestral ativo na pilha), confirmando a existência de um **Ciclo Direcionado**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Detecção de Ciclos em Grafos Direcionados: DFS de 3 Cores</text>

  <!-- Nós -->
  <g transform="translate(80, 50)">
    <!-- Nó 0 (Black - Concluído) -->
    <circle cx="40" cy="50" r="20" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
    <text x="40" y="54" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">0</text>
    <text x="40" y="85" fill="#94a3b8" font-size="10" text-anchor="middle">Black (2)</text>
    <text x="40" y="98" fill="#64748b" font-size="9" text-anchor="middle">Finalizado</text>

    <!-- Seta 0 -> 1 -->
    <line x1="65" y1="50" x2="135" y2="50" stroke="#64748b" stroke-width="2"/>
    <polygon points="135,50 125,46 125,54" fill="#64748b"/>

    <!-- Nó 1 (Gray - Ancestral ativo na pilha) -->
    <circle cx="160" cy="50" r="20" fill="#475569" stroke="#f59e0b" stroke-width="2.5"/>
    <text x="160" y="54" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">1</text>
    <text x="160" y="85" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Gray (1)</text>
    <text x="160" y="98" fill="#fcd34d" font-size="9" text-anchor="middle">Na Pilha DFS</text>

    <!-- Seta 1 -> 2 -->
    <line x1="185" y1="50" x2="255" y2="50" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="255,50 245,46 245,54" fill="#f59e0b"/>

    <!-- Nó 2 (Gray - Nó atual examinando vizinhos) -->
    <circle cx="280" cy="50" r="20" fill="#475569" stroke="#ef4444" stroke-width="2.5"/>
    <text x="280" y="54" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">2</text>
    <text x="280" y="85" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Gray (1)</text>
    <text x="280" y="98" fill="#fca5a5" font-size="9" text-anchor="middle">Processando</text>

    <!-- Back-edge curvada de 2 para 1 -->
    <path d="M 280,30 Q 220,-10 160,30" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,3"/>
    <polygon points="160,30 168,22 172,30" fill="#ef4444"/>
    <text x="220" y="10" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Back-Edge (Ciclo!)</text>

    <!-- Nó 3 (White - Não visitado) -->
    <circle cx="400" cy="50" r="20" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <text x="400" y="54" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">3</text>
    <text x="400" y="85" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">White (0)</text>
    <text x="400" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">Inexplorado</text>
  </g>

  <text x="340" y="178" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Regra: Encontrar um nó Gray durante a DFS confirma ciclo; nós Black são ramos já resolvidos e seguros</text>
</svg>
<p>Visualização: Coloração de 3 estados em DFS direcionada: encontro de vizinho cinza (Gray) na pilha ativa confirma ciclo através de uma back-edge.</p>

| Cor do Vértice | Estado de Processamento | Ação ao Encontrar na DFS |
|---|---|---|
| **White (0)** | Inexplorado | Continua DFS normalmente |
| **Gray (1)** | Na pilha de recursão ativa | **CICLO DETECTADO!** |
| **Black (2)** | Totalmente concluído | Ignora (caminho seguro) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Diferente de grafos não-direcionados (onde DSU funciona), a detecção de ciclos em grafos direcionados exige distinguir nós em processamento ativo (Gray) de nós já concluídos (Black).

</details>
