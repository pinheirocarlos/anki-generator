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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inverso Modular via Pequeno Teorema de Fermat: A^(P - 2) ≡ A⁻¹ (mod P)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Divisão Modular Sob Módulo Primo P</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">(A / B) % P = (A · B⁻¹) % P = (A · power(B, P - 2, P)) % P.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite calcular combinações C(n, k) = n! / (k! · (n-k)!) sob módulo 10⁹ + 7 em O(log P).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Essencial para problemas combinatórios e probabilidade em entrevistas avançadas</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inverso Modular via Pequeno Teorema de Fermat: A^(P - 2) ≡ A⁻¹ (mod P)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Divisão Modular Sob Módulo Primo P</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">(A / B) % P = (A · B⁻¹) % P = (A · power(B, P - 2, P)) % P.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite calcular combinações C(n, k) = n! / (k! · (n-k)!) sob módulo 10⁹ + 7 em O(log P).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Essencial para problemas combinatórios e probabilidade em entrevistas avançadas</text>

</svg>

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
