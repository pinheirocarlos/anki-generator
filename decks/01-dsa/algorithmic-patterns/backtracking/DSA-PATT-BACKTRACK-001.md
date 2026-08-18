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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/backtracking-state-space-pruning-loop.webm">
    <p>Visualização: Corte antecipado de ramos inviáveis evitando explosão combinatória desnecessária.</p>
  </video>
</div>

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
