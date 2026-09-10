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
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Jump Game: Rastreamento Guloso da Fronteira Máxima de Alcance</text>
  <g transform="translate(100, 50)">
    <g transform="translate(0, 20)">
      <rect x="0" y="0" width="55" height="40" fill="#047857" stroke="#10b981" stroke-width="2" rx="4"/><text x="27" y="25" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">2</text>
      <rect x="70" y="0" width="55" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="97" y="25" fill="#94a3b8" font-size="12" text-anchor="middle">3</text>
      <rect x="140" y="0" width="55" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="167" y="25" fill="#94a3b8" font-size="12" text-anchor="middle">1</text>
      <rect x="210" y="0" width="55" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="237" y="25" fill="#94a3b8" font-size="12" text-anchor="middle">1</text>
      <rect x="280" y="0" width="55" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="307" y="25" fill="#94a3b8" font-size="12" text-anchor="middle">4</text>
    </g>
    <line x1="27" y1="10" x2="167" y2="10" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4"/>
    <text x="97" y="0" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">max_reach = max(max_reach, i + nums[i])</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Se i &gt; max_reach: destino inalcançável. Se max_reach ≥ N-1: vitória em O(N) tempo e O(1) espaço</text>
</svg>
<p>Visualização: Rastreamento da fronteira máxima de alcance (max_reach) no Jump Game em tempo estritamente linear O(N).</p>

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
