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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Iterative Deepening DFS (IDDFS): Espaço O(d) com Completude de BFS</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">DFS com Limite de Profundidade Iterativo: depth = 1, 2, 3, ... d</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Combina o baixo consumo de memória de DFS (O(d)) com a garantia de menor caminho de BFS.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O reprocessamento de níveis superiores custa apenas um fator constante adicional insignificante.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Padrão em motores de IA para xadrez e resolução de quebra-cabeças 15-Puzzle</text>

</svg>

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
