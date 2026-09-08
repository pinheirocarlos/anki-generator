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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Linha de Varredura (Sweep-Line): Pontos de Evento Cronológicos (+1 e -1)</text>
  <g transform="translate(60, 45)">
    <!-- Linha do tempo -->
    <line x1="20" y1="50" x2="540" y2="50" stroke="#475569" stroke-width="3"/>

    <!-- Eventos -->
    <circle cx="60" cy="50" r="8" fill="#10b981"/><text x="60" y="32" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">+1 (Start)</text><text x="60" y="72" fill="#94a3b8" font-size="9" text-anchor="middle">t=0</text>
    <circle cx="160" cy="50" r="8" fill="#10b981"/><text x="160" y="32" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">+1 (Start)</text><text x="160" y="72" fill="#94a3b8" font-size="9" text-anchor="middle">t=5</text>
    <circle cx="280" cy="50" r="8" fill="#f43f5e"/><text x="280" y="32" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">-1 (End)</text><text x="280" y="72" fill="#94a3b8" font-size="9" text-anchor="middle">t=10</text>
    <circle cx="380" cy="50" r="8" fill="#10b981"/><text x="380" y="32" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">+1 (Start)</text><text x="380" y="72" fill="#94a3b8" font-size="9" text-anchor="middle">t=15</text>
    <circle cx="480" cy="50" r="8" fill="#f43f5e"/><text x="480" y="32" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">-1 (End)</text><text x="480" y="72" fill="#94a3b8" font-size="9" text-anchor="middle">t=20</text>
  </g>
  <text x="340" y="150" fill="#34d399" font-size="11" text-anchor="middle">Contagem cumulativa: t=0: 1 sala | t=5: 2 salas (Pico!) | t=10: 1 sala | t=15: 2 salas</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Salas Máximas Simultâneas = max(contagem acumulada) = 2 em O(N log N)</text>
</svg>
<p>Visualização: Linha de varredura cronológica registrando eventos de entrada (+1) e saída (-1) para detectar picos de concorrência.</p>

| Evento Temporal | Ponteiro Avançado | Contador de Salas |
|---|---|---|
| `starts[s] < ends[e]` | `s++` (Início de reunião) | `rooms++` |
| `starts[s] >= ends[e]` | `e++` (Fim de reunião) | `rooms--` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Esta técnica é equivalente a converter o problema em uma sequência de eventos discretos $+1$ (início) e $-1$ (término) ordenados no tempo.

</details>
