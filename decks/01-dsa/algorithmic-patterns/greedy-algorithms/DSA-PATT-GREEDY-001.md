---
id: DSA-PATT-GREEDY-001
title: "Jump Game I & II: Rastreamento do Alcance Máximo em Tempo Linear O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::greedy-algorithms
  - company::apple
  - freq::high
---

## Pergunta
Como o padrão guloso de rastreamento do alcance máximo (`maxReach`) resolve **Jump Game I & II** em tempo linear $O(N)$ e espaço $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- **Jump Game I (Alcançabilidade)**:
  - Mantém `maxReach = 0`. Para cada índice $i$: se $i > \text{maxReach}$, retorna `false`. Atualiza $\text{maxReach} = \max(\text{maxReach}, i + \text{nums}[i])$. Se $\text{maxReach} \ge N-1$, retorna `true` ($O(N)$).
- **Jump Game II (Mínimo de Saltos)**:
  - Mantém `curEnd` (fronteira do salto atual) e `curFarthest` (alcance máximo avistado).
  - Ao iterar $i$ até $N-2$: atualiza `curFarthest = max(curFarthest, i + nums[i])`. Quando $i == \text{curEnd}$, somos forçados a dar um salto (`jumps++`) e expandimos a fronteira `curEnd = curFarthest`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Activity Selection / Agendamento de Intervalos: Ordenação por End-Time</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Escolha: Atividade que Termina Mais Cedo (Minimiza Bloqueio Futuro)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena os intervalos por tempo de término: intervals.sort(by: end_time).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">2. Seleciona o próximo intervalo se start_time &gt;= last_end_time; atualiza last_end_time.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Maximiza a quantidade total de eventos compatíveis em tempo O(N log N)</text>

</svg>

| Problema Jump Game | Variáveis Rastreadas | Decisão de Incremento |
|---|---|---|
| **Jump Game I** | `maxReach` | Se $i > \text{maxReach} \implies$ Inalcançável |
| **Jump Game II** | `curEnd` e `curFarthest` | Se $i == \text{curEnd} \implies \text{jumps}++$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Jump Game II
```java
public class JumpGameII {
  public int jump(int[] nums) {
    int jumps = 0, curEnd = 0, curFarthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
      curFarthest = Math.max(curFarthest, i + nums[i]);
      if (i == curEnd) {
        jumps++;
        curEnd = curFarthest;
      }
    }
    return jumps;
  }
}
```

#### Key Takeaways
- Transforma uma busca BFS/DP em um algoritmo guloso de 1 único passo $O(N)$ com $O(1)$ de memória.

</details>
