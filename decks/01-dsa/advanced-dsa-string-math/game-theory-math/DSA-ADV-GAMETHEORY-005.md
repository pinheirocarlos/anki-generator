---
id: DSA-ADV-GAMETHEORY-005
title: "Crivo de Eratóstenes Linear (Crivo de Euler) para Fatoração em Tempo O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como o **Crivo Linear (Crivo de Euler)** visita cada número composto exatamente uma única vez para encontrar todos os primos até $N$ em tempo estritamente $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Crivo de Eratóstenes tradicional marca o mesmo número composto múltiplas vezes (ex: $12$ é marcado pelo primo $2$ e pelo $3$), resultando em $O(N \log \log N)$.
- **Crivo Linear ($O(N)$)**:
  - Mantém uma lista de números primos encontrados e um array `minPrime[i]` (o menor fator primo de $i$).
  - Para cada $i$ de $2$ a $N$:
    - Se `minPrime[i] == 0`, $i$ é primo $\to$ adiciona à lista de primos e `minPrime[i] = i`.
    - Para cada primo $p \le \text{minPrime}[i]$ tal que $i \cdot p \le N$:
      - Marca $\text{minPrime}[i \cdot p] = p$.
      - **Condição de Parada Única**: Se $i \% p == 0$, interrompe o loop interno com `break`.
- Como cada composto é marcado exclusivamente pelo seu **menor fator primo**, a complexidade é **estritamente $O(N)$**.

### Dual Coding Visual
| Algoritmo de Crivo | Visitas por Número Composto | Complexidade de Tempo |
|---|---|---|
| **Eratóstenes Tradicional** | Múltiplas vezes (uma por fator primo) | $O(N \log \log N)$ |
| **Crivo Linear (Euler)** | **Exatamente 1 vez** (Apenas pelo menor fator) | **$O(N)$ Estrito** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Crivo Linear
```java
import java.util.*;

public class LinearSieve {
  public static List<Integer> getPrimes(int n) {
    int[] minPrime = new int[n + 1];
    List<Integer> primes = new ArrayList<>();

    for (int i = 2; i <= n; i++) {
      if (minPrime[i] == 0) {
        minPrime[i] = i;
        primes.add(i);
      }
      for (int p : primes) {
        if (p > minPrime[i] || i * p > n) break;
        minPrime[i * p] = p;
      }
    }
    return primes;
  }
}
```

#### Key Takeaways
- Além de listar primos, o array `minPrime[]` permite fatorar qualquer número $\le N$ em tempo logarítmico ótimo $O(\log N)$.

</details>
