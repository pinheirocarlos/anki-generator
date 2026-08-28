---
id: DSA-PATT-DP1D-005
title: "Longest Increasing Subsequence (LIS) em O(N log N) com Patience Sorting"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-1d
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Patience Sorting + Busca Binária** otimiza o cálculo de Longest Increasing Subsequence (LIS) de $O(N^2)$ para $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A DP quadrática tradicional ($DP[i] = 1 + \max(DP[j])$) custa $O(N^2)$.
- **Patience Sorting ($O(N \log N)$)**:
  - Mantemos um array `tails[]` onde `tails[len]` armazena o menor elemento final entre todas as subsequências crescentes de comprimento $\text{len} + 1$ encontradas até agora.
  - Para cada número $x$:
    - Executamos **Busca Binária** no array ordenado `tails[]` para encontrar o primeiro elemento $\ge x$ (`idx`).
    - Se $x$ for maior que todos, adiciona ao final (`tails.add(x)`).
    - Se encontrar $\ge x$, substitui `tails[idx] = x` (ganância: um final menor é mais vantajoso para expansões futuras).
- O comprimento da LIS é exatamente o tamanho final do array `tails[]`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Kadane's Algorithm: Subarray de Soma Máxima em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Decisão Local: Estender Subarray Anterior ou Iniciar Novo a Partir de num</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">current_max = max(num, current_max + num).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">global_max = max(global_max, current_max).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Execução em uma única passada sem alocação de memória auxiliar</text>

</svg>

| Algoritmo de LIS | Complexidade de Tempo | Espaço de Memória |
|---|---|---|
| **DP Quadrática Padrão** | $O(N^2)$ | $O(N)$ |
| **Patience Sorting + Binary Search** | $O(N \log N)$ Ótimo | $O(N)$ Array `tails[]` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: LIS O(N log N)
```java
import java.util.*;

public class LISSolution {
  public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
      int idx = Collections.binarySearch(tails, x);
      if (idx < 0) idx = -(idx + 1); // Posição de inserção
      if (idx == tails.size()) {
        tails.add(x);
      } else {
        tails.set(idx, x);
      }
    }
    return tails.size();
  }
}
```

#### Key Takeaways
- É um clássico absoluto de entrevistas da Google e Meta que separa candidatos júnior ($O(N^2)$) de candidatos pleno/sênior ($O(N \log N)$).

</details>
