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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Flood Fill &amp; Number of Islands: Varredura de Matriz 2D em O(M × N)</text>

  <!-- Grid Matrix -->
  <g transform="translate(60, 45)">
    <!-- Row 0 -->
    <rect x="0" y="0" width="30" height="30" fill="#065f46" stroke="#10b981" rx="3"/><text x="15" y="20" fill="#fff" font-size="12" text-anchor="middle">1</text>
    <rect x="35" y="0" width="30" height="30" fill="#065f46" stroke="#10b981" rx="3"/><text x="50" y="20" fill="#fff" font-size="12" text-anchor="middle">1</text>
    <rect x="70" y="0" width="30" height="30" fill="#1e293b" stroke="#334155" rx="3"/><text x="85" y="20" fill="#64748b" font-size="12" text-anchor="middle">0</text>
    <rect x="105" y="0" width="30" height="30" fill="#1e293b" stroke="#334155" rx="3"/><text x="120" y="20" fill="#64748b" font-size="12" text-anchor="middle">0</text>
    <!-- Row 1 -->
    <rect x="0" y="35" width="30" height="30" fill="#065f46" stroke="#10b981" rx="3"/><text x="15" y="55" fill="#fff" font-size="12" text-anchor="middle">1</text>
    <rect x="35" y="35" width="30" height="30" fill="#1e293b" stroke="#334155" rx="3"/><text x="50" y="55" fill="#64748b" font-size="12" text-anchor="middle">0</text>
    <rect x="70" y="35" width="30" height="30" fill="#1e293b" stroke="#334155" rx="3"/><text x="85" y="55" fill="#64748b" font-size="12" text-anchor="middle">0</text>
    <rect x="105" y="35" width="30" height="30" fill="#78350f" stroke="#f59e0b" rx="3"/><text x="120" y="55" fill="#fff" font-size="12" text-anchor="middle">1</text>
    <!-- Row 2 -->
    <rect x="0" y="70" width="30" height="30" fill="#1e293b" stroke="#334155" rx="3"/><text x="15" y="90" fill="#64748b" font-size="12" text-anchor="middle">0</text>
    <rect x="35" y="70" width="30" height="30" fill="#1e293b" stroke="#334155" rx="3"/><text x="50" y="90" fill="#64748b" font-size="12" text-anchor="middle">0</text>
    <rect x="70" y="70" width="30" height="30" fill="#78350f" stroke="#f59e0b" rx="3"/><text x="85" y="90" fill="#fff" font-size="12" text-anchor="middle">1</text>
    <rect x="105" y="70" width="30" height="30" fill="#78350f" stroke="#f59e0b" rx="3"/><text x="120" y="90" fill="#fff" font-size="12" text-anchor="middle">1</text>
  </g>

  <!-- Explicação -->
  <g transform="translate(230, 45)">
    <rect x="0" y="0" width="400" height="100" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="200" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Marcação In-Place e Propagação 4-Direcional</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">1. Itera (r, c). Ao encontrar '1': incrementa contador (Ilha 1: Verde, Ilha 2: Laranja).</text>
    <text x="15" y="65" fill="#f8fafc" font-size="10">2. Dispara DFS/BFS afundando vizinhos conectados ('1' ➔ '0') in-place.</text>
    <text x="15" y="85" fill="#38bdf8" font-size="10">3. Elimina a necessidade de alocar matriz auxiliar visited[M][N] (O(1) extra).</text>
  </g>

  <text x="340" y="175" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Complexidade: O(M × N) tempo — Cada célula é visitada no máximo 4 vezes</text>
</svg>
<p>Visualização: Varredura de matriz 2D afundando terras conectadas (1 → 0) in-place para isolar e contar componentes conexos em O(M × N).</p>

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
