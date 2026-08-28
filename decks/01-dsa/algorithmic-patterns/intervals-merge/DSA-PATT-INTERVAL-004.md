---
id: DSA-PATT-INTERVAL-004
title: "Algoritmo de Linha de Varredura para Meeting Rooms II com Contadores de Eventos"
tags:
  - level::l4-pleno
  - topic::dsa::intervals-merge
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Linha de Varredura (Chronological Sweep-Line)** calcula o pico de salas simultâneas sem usar Heaps?

## Resposta
### Quick Answer
**Solução Direta**:
- Separamos todos os inícios e términos em arrays independentes: `starts[]` e `ends[]`, ordenando ambos em $O(N \log N)$.
- Usamos dois ponteiros (`s` e `e`) e um contador `rooms = 0`:
  - Se `starts[s] < ends[e]`: uma reunião começou antes que a anterior terminasse $\to$ `rooms++` e `s++`. Atualiza o pico `maxRooms = max(maxRooms, rooms)`.
  - Caso contrário (`starts[s] >= ends[e]`): uma reunião terminou e liberou uma sala $\to$ `rooms--` e `e++`.
- **Complexidade**: $O(N \log N)$ tempo e $O(N)$ espaço contíguo (com menor constante de cache que o Heap).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Interval List Intersections: Interseção entre Duas Listas com Two Pointers</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Interseção Válida: start = max(A.start, B.start) ≤ end = min(A.end, B.end)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se start ≤ end: adiciona intervalo [start, end] à lista de respostas.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Avança o ponteiro do intervalo que terminar primeiro: if A.end &lt; B.end → i++ else → j++.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tempo total: O(M + N) em uma única passada sincronizada</text>

</svg>

| Evento Temporal | Ponteiro Avançado | Contador de Salas |
|---|---|---|
| `starts[s] < ends[e]` | `s++` (Início de reunião) | `rooms++` |
| `starts[s] >= ends[e]` | `e++` (Fim de reunião) | `rooms--` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Esta técnica é equivalente a converter o problema em uma sequência de eventos discretos $+1$ (início) e $-1$ (término) ordenados no tempo.

</details>
