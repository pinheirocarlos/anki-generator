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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/interval-intersections-two-pointers-loop.webm">
    <p>Visualização: Dois ponteiros calculando a interseção [max(A_s, B_s), min(A_e, B_e)] e avançando o intervalo que termina primeiro.</p>
  </video>
</div>

| Evento Temporal | Ponteiro Avançado | Contador de Salas |
|---|---|---|
| `starts[s] < ends[e]` | `s++` (Início de reunião) | `rooms++` |
| `starts[s] >= ends[e]` | `e++` (Fim de reunião) | `rooms--` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Esta técnica é equivalente a converter o problema em uma sequência de eventos discretos $+1$ (início) e $-1$ (término) ordenados no tempo.

</details>
