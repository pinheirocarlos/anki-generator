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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/greedy-interval-scheduling-loop.webm">
    <p>Visualização: Seleção gulosa de intervalos que terminam mais cedo liberando o recurso para o máximo de tarefas subsequentes.</p>
  </video>
</div>

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
