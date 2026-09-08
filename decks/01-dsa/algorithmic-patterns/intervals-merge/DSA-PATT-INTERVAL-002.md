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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Merge Overlapping Intervals: Ordenação por Início e Fusão em O(N log N)</text>
  <g transform="translate(100, 45)">
    <!-- Linha do Tempo e Barras -->
    <rect x="0" y="15" width="120" height="24" fill="#3b82f6" rx="4"/><text x="60" y="31" fill="#fff" font-size="11" text-anchor="middle">[1, 4]</text>
    <rect x="80" y="45" width="140" height="24" fill="#f59e0b" rx="4"/><text x="150" y="61" fill="#fff" font-size="11" text-anchor="middle">[3, 8]</text>

    <!-- Seta de fusão -->
    <path d="M 240 45 L 290 45" stroke="#10b981" stroke-width="2.5"/>

    <!-- Intervalo Fundido -->
    <rect x="305" y="30" width="175" height="28" fill="#047857" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="392" y="48" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">[1, 8] Fundido</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" text-anchor="middle">Condição de Sobreposição: se prox.start &lt;= atual.end ➔ atual.end = max(atual.end, prox.end)</text>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante fusão ótima após ordenação em O(N log N) tempo e O(N) espaço</text>
</svg>
<p>Visualização: Algoritmo de fusão sequencial consolidando intervalos sobrepostos em uma única passagem linear O(N).</p>

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
