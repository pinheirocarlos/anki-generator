---
id: DSA-PATT-BACKTRACK-001
title: "N-Queens Problem com Validação O(1) de Diagonais via Hash Sets / Bitmasks"
tags:
  - level::l4-pleno
  - topic::dsa::backtracking
  - company::meta
  - freq::high
---

## Pergunta
Como otimizar a verificação de segurança de rainhas no **Problema das N-Rainhas (N-Queens)** para tempo $O(1)$ usando propriedades matemáticas de diagonais?

## Resposta
### Quick Answer
**Solução Direta**:
- Posicionamos uma rainha por linha $r$ (de $0$ a $N-1$), testando cada coluna $c$:
  - **Coluna**: Invalida se $c$ já está no conjunto `cols`.
  - **Diagonal Principal (\)**: Células na mesma diagonal possuem a propriedade matemática constante: **$r - c = \text{constante}$**.
  - **Anti-Diagonal (/)**: Células na mesma anti-diagonal possuem a propriedade: **$r + c = \text{constante}$**.
- Mantendo três Hash Sets (ou Bitmasks inteiros) para `cols`, `diag1` e `diag2`, verificamos a segurança em tempo **estritamente $O(1)$** sem precisar varrer o tabuleiro.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Problema das N-Rainhas: Validação O(1) com Vetores de Colunas e Diagonais</text>
  <g transform="translate(100, 45)">
    <!-- Tabuleiro 4x4 compacto -->
    <rect x="0" y="0" width="120" height="100" fill="#1e293b" stroke="#475569" rx="4"/>
    <rect x="0" y="0" width="30" height="25" fill="#334155"/>
    <rect x="60" y="0" width="30" height="25" fill="#334155"/>
    <rect x="30" y="25" width="30" height="25" fill="#334155"/>
    <rect x="90" y="25" width="30" height="25" fill="#334155"/>
    <circle cx="45" cy="12" r="8" fill="#f59e0b"/><text x="45" y="16" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Q</text>
    <circle cx="105" cy="37" r="8" fill="#f59e0b"/><text x="105" y="41" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Q</text>

    <!-- Fórmulas de Diagonais -->
    <rect x="160" y="0" width="320" height="100" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="320" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Identificadores de Linha de Ataque:</text>
    <text x="180" y="45" fill="#f8fafc" font-size="10">• Coluna: col</text>
    <text x="180" y="65" fill="#38bdf8" font-size="10">• Diagonal Principal: row - col (constante)</text>
    <text x="180" y="85" fill="#fcd34d" font-size="10">• Diagonal Secundária: row + col (constante)</text>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Permite validação de segurança da posição da rainha em O(1) de tempo</text>
</svg>
<p>Visualização: Validação instantânea O(1) de ataques em N-Queens via vetores de colunas e diagonais principais e secundárias.</p>

| Linha de Ataque da Rainha | Propriedade Matemática em $(r, c)$ | Rastreamento em $O(1)$ |
|---|---|---|
| **Coluna Vertical** | $c$ | `Set<Integer> cols` |
| **Diagonal Principal (\)** | $r - c$ | `Set<Integer> diag1` |
| **Anti-Diagonal (/)** | $r + c$ | `Set<Integer> diag2` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: N-Queens com O(1) Check
```java
import java.util.*;

public class NQueens {
  private final Set<Integer> cols = new HashSet<>();
  private final Set<Integer> diag1 = new HashSet<>(); // r - c
  private final Set<Integer> diag2 = new HashSet<>(); // r + c

  public void solve(int r, int n, char[][] board, List<List<String>> res) {
    if (r == n) {
      res.add(construct(board));
      return;
    }
    for (int c = 0; c < n; c++) {
      if (cols.contains(c) || diag1.contains(r - c) || diag2.contains(r + c)) continue;

      board[r][c] = 'Q';
      cols.add(c); diag1.add(r - c); diag2.add(r + c);

      solve(r + 1, n, board, res);

      board[r][c] = '.';
      cols.remove(c); diag1.remove(r - c); diag2.remove(r + c);
    }
  }
}
```

#### Key Takeaways
- Substituir a varredura linear de diagonais ($O(N)$) por conjuntos $O(1)$ acelera o algoritmo em até $10\times$.

</details>
