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
