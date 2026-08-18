---
id: DSA-PATT-INTERVAL-002
title: "Algoritmo de Fusão de Intervalos Sobrepostos (Merge Intervals) em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::intervals-merge
  - company::google
  - freq::high
---

## Pergunta
Como implementar o algoritmo de **Merge Intervals** (LeetCode 56) fundindo intervalos adjacentes em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Ordenamos os intervalos por seu início `start`.
- Mantemos uma lista de resultado e inserimos o primeiro intervalo `curr = intervals[0]`.
- Para cada próximo intervalo `next`:
  - **Se houver sobreposição (`next.start <= curr.end`)**: fundimos estendendo o fim: `curr.end = max(curr.end, next.end)`.
  - **Se não houver sobreposição**: adicionamos `next` como o novo intervalo ativo na lista.
- **Complexidade**: $O(N \log N)$ tempo (dominado pela ordenação) e $O(N)$ espaço para o resultado.

### Dual Coding Visual
| Condição com Intervalo Atual | Ação de Fusão | Resultado |
|---|---|---|
| `next.start <= curr.end` | `curr.end = max(curr.end, next.end)` | Intervalo expandido |
| `next.start > curr.end` | Adiciona `next` à lista | Novo intervalo isolado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Merge Intervals
```java
import java.util.*;

public class MergeIntervals {
  public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

    List<int[]> merged = new ArrayList<>();
    int[] curr = intervals[0];
    merged.add(curr);

    for (int i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= curr[1]) {
        curr[1] = Math.max(curr[1], intervals[i][1]); // Funde
      } else {
        curr = intervals[i];
        merged.add(curr);
      }
    }
    return merged.toArray(new int[merged.size()][]);
  }
}
```

#### Key Takeaways
- O uso de `Math.max(curr.end, next.end)` é essencial para cobrir o caso em que o intervalo atual engloba completamente o próximo (`[1, 10]` e `[2, 5]`).

</details>
