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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bidirectional BFS: Redução do Fator de Ramificação O(b^d) → O(b^(d/2))</text>
  <g transform="translate(100, 50)">
    <circle cx="80" cy="40" r="35" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="80" cy="40" r="8" fill="#3b82f6"/><text x="80" y="25" fill="#38bdf8" font-size="9" text-anchor="middle">Origem</text>

    <line x1="115" y1="40" x2="245" y2="40" stroke="#f59e0b" stroke-dasharray="4"/>
    <circle cx="180" cy="40" r="10" fill="#f59e0b"/><text x="180" y="60" fill="#fcd34d" font-size="9" text-anchor="middle">Interseção</text>

    <circle cx="280" cy="40" r="35" fill="none" stroke="#10b981" stroke-width="2"/>
    <circle cx="280" cy="40" r="8" fill="#10b981"/><text x="280" y="25" fill="#34d399" font-size="9" text-anchor="middle">Destino</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz nós explorados de 10⁶ para 2 × 10³ em problemas como Word Ladder</text>

</svg>

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
