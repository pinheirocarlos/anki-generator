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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Meeting Rooms II: Mínimo de Salas Simultâneas com Min-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Rastreia Horários de Término de Reuniões em Andamento</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena reuniões por tempo de início (start_time).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Se meeting.start &gt;= heap.peek() → reutiliza sala (heap.pop()). Adiciona novo término: heap.push(meeting.end).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Tamanho máximo do heap ao final = quantidade mínima de salas necessárias: O(N log N)</text>

</svg>

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
