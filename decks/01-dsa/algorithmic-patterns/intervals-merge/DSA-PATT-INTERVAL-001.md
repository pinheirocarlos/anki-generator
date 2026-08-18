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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/insert-interval-three-phases-loop.webm">
    <p>Visualização: Inserção ordenada: 1) anteriores sem sobreposição; 2) fusão com sobrepostos; 3) posteriores restantes.</p>
  </video>
</div>

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
