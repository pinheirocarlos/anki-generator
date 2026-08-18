---
id: DSA-PATT-TRAVERSAL-004
title: "Flood Fill e Contagem de Componentes em Matrizes 2D (Number of Islands)"
tags:
  - level::l4-pleno
  - topic::dsa::bfs-dfs-traversals
  - company::meta
  - freq::high
---

## Pergunta
Como modelar uma **Matriz 2D como um Grafo Implícito** para contar componentes conexos (*Number of Islands*) em $O(M \times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada célula $(r, c)$ da matriz é tratada como um vértice cujas arestas conectam às 4 células adjacentes válidas ($(r+1, c), (r-1, c), (r, c+1), (r, c-1)$).
- Ao iterar sobre a matriz com loops aninhados:
  - Ao encontrar uma terra não visitada (`grid[r][c] == '1'`), incrementamos `islandCount++`.
  - Disparamos uma DFS/BFS para afundar/visitar toda a ilha conectada (`grid[r][c] = '0'`), marcando-a in-place para não ser revisitada.
- **Complexidade**: $O(M \times N)$ tempo e $O(M \times N)$ espaço no pior caso de pilha de recursão.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/flood-fill-connected-components-grid-loop.webm">
    <p>Visualização: Propagação em matriz 2D em 4 direções marcando células conectadas para contagem de componentes.</p>
  </video>
</div>

| Elemento de Matriz | Equivalente em Teoria dos Grafos |
|---|---|
| **Célula `(r, c)`** | Vértice $V$ |
| **4 Vizinhos Ortogonais** | Arestas $E$ |
| **Ilha Conectada** | Componente Conexo do Grafo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Number of Islands
```java
public class NumberOfIslands {
  public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
      for (int c = 0; c < grid[0].length; c++) {
        if (grid[r][c] == '1') {
          count++;
          dfs(grid, r, c);
        }
      }
    }
    return count;
  }

  private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0'; // Marca como visitado in-place
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
  }
}
```

#### Key Takeaways
- Modificar a célula para `'0'` in-place elimina a necessidade de alocar uma matriz auxiliar de booleanos `visited[][]`.

</details>
