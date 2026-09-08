---
id: DSA-PATT-INTERVAL-001
title: "Resolução de Meeting Rooms II via Min-Heap de Términos em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::intervals-merge
  - company::meta
  - freq::high
---

## Pergunta
Como utilizar um **Min-Heap de horários de término** para encontrar o número mínimo de salas de reunião em **Meeting Rooms II** em $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Ordenamos as reuniões pelo horário de início (`start`).
- Mantemos um **Min-Heap** contendo os horários de término das reuniões em andamento (a raiz é a sala que desocupa mais cedo):
  - Para cada reunião $M$:
    - Se a raiz do heap tiver término menor ou igual ao início de $M$ (`minHeap.peek() <= M.start`), a sala foi liberada: desempilhamos a raiz (`minHeap.poll()`).
    - Alocamos a reunião inserindo seu término no heap (`minHeap.offer(M.end)`).
- O tamanho máximo do heap representa o **número mínimo de salas simultâneas necessárias**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Meeting Rooms II: Mínimo de Salas Simultâneas com Min-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Min-Heap armazena os horários de término das reuniões ativas</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se start_atual &gt;= heap.peek(): sala foi liberada ➔ reaproveita com heap.poll().</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Caso contrário: conflito de horário ➔ aloca nova sala com heap.offer(end_atual).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resultado Final: heap.size() é o número mínimo de salas necessárias: O(N log N)</text>
</svg>
<p>Visualização: Min-heap de horários de término determinando o número mínimo de salas simultâneas em O(N log N).</p>

| Evento | Condição do Heap | Ação de Sala |
|---|---|---|
| **Reunião Inicia** | `minHeap.peek() <= start` | Reutiliza sala existente (`poll` + `offer`) |
| **Conflito de Horário** | `minHeap.peek() > start` | Abre nova sala (`offer`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Meeting Rooms II
```java
import java.util.*;

public class MeetingRoomsII {
  public int minMeetingRooms(int[][] intervals) {
    if (intervals == null || intervals.length == 0) return 0;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    minHeap.offer(intervals[0][1]);

    for (int i = 1; i < intervals.length; i++) {
      if (intervals[i][0] >= minHeap.peek()) {
        minHeap.poll(); // Libera sala
      }
      minHeap.offer(intervals[i][1]); // Ocupa sala
    }
    return minHeap.size();
  }
}
```

#### Key Takeaways
- O Min-Heap rastreia com precisão o recurso compartilhado de desocupação mais próxima em $O(\log K)$ por evento.

</details>
