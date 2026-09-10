---
id: DSA-ADV-SWEEPLINE-002
title: "The Skyline Problem (LeetCode 218) com Sweep-Line e TreeMap de Alturas em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Sweep-Line com TreeMap de contagem de alturas** resolve **The Skyline Problem** em tempo $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Convertemos cada edifício $[L, R, H]$ em 2 eventos na coordenada $X$:
  - Evento de início em $L$ com altura $+H$.
  - Evento de fim em $R$ com altura $-H$.
- Ordenamos todos os eventos por $X$ (desempates: início com maior altura primeiro, término com menor altura primeiro).
- Mantemos um **TreeMap de frequências de alturas ativas**:
  - Ao processar um ponto $X$, adicionamos $+H$ ou decrementamos/removemos $-H$.
  - Consultamos a altura máxima ativa `maxH = treeMap.lastKey()`.
  - Se a altura máxima **mudou** em relação à anterior, adicionamos $[X, \text{maxH}]$ ao contorno do horizonte (*Skyline*).
- **Complexidade**: $O(N \log N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Skyline Problem: Contorno de Edifícios com Sweep-Line + Max-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Eventos de Borda Crítica: Início (+H) e Fim (-H)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Início do prédio: insere altura no multiset/heap; Fim do prédio: remove altura.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Se a altura máxima atual muda: registra ponto chave [x, max_height] no contorno final.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo: O(N log N) e Espaço O(N) mantendo apenas prédios ativos na linha</text>
</svg>
<p>Visualização: Resolução do Skyline Problem com linha de varredura e rastreamento da altura máxima ativa por árvore balanceada ou Max-Heap.</p>

| Evento de Edifício | Modificação no TreeMap | Condição de Ponto no Skyline |
|---|---|---|
| **Início em $L$ ($+H$)** | Incrementa contagem de $H$ | $\text{maxH atual} \neq \text{maxH anterior}$ |
| **Fim em $R$ ($-H$)** | Decrementa/Remove altura $H$ | $\text{maxH atual} \neq \text{maxH anterior}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O TreeMap com contadores de frequência substitui o Max-Heap puro porque permite remoção arbitrária de elementos em $O(\log N)$.

</details>
