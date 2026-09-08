---
id: CS-MATH-BOOL-001
title: "Algoritmo de Brian Kernighan para Contagem de Bits Ligados (Popcount)"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Brian Kernighan** utiliza a expressão `n & (n - 1)` para contar bits ligados (`popcount`) em tempo proporcional apenas aos bits 1?

## Resposta
### Quick Answer
**Solução Direta**:
- A expressão bitwise **`n & (n - 1)`** zera (limpa) exatamente o **bit 1 menos significativo (LSB - Least Significant Bit)** de `n` a cada iteração.
- **Mecânica**: Subtrair 1 de `n` inverte todos os bits a partir do bit 1 mais à direita até o final. Ao aplicar `&` com o `n` original, esse bit 1 e todos os zeros à sua direita viram zero.
- **Complexidade**: Enquanto o loop ingênuo testa todos os 32 ou 64 bits em $O(\text{total\_bits})$, Brian Kernighan executa em **$O(K)$ iterações**, onde $K$ é a quantidade exata de bits 1 ativos ($K \le \text{total\_bits}$).

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Brian Kernighan: n &amp; (n - 1) para Popcount</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="130" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Passo 1: n = 12 (0b1100)</text>
    <text x="130" y="44" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n     = 0b1100</text>
    <text x="130" y="60" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n - 1 = 0b1011</text>
    <text x="130" y="78" fill="#10b981" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">n &amp; (n-1) = 0b1000 (clear bit 2)</text>

    <rect x="300" y="0" width="260" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="430" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Passo 2: n = 8 (0b1000)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n     = 0b1000</text>
    <text x="430" y="60" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n - 1 = 0b0111</text>
    <text x="430" y="78" fill="#10b981" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">n &amp; (n-1) = 0b0000 (clear bit 3)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(k), onde k é a quantidade de bits 1 (set bits), e não O(32) ou O(64)!</text>
  <text x="340" y="188" fill="#94a3b8" font-size="10" text-anchor="middle">Cada iteração desliga exatamente o bit 1 menos significativo (LSB set bit) em O(1).</text>

</svg>
<p>Visualização: Mecânica do Algoritmo de Brian Kernighan limpando o bit 1 menos significativo a cada passo com n & (n - 1).</p>

| Valor de `n` | Binário Original | Resultado `n & (n - 1)` |
|---|---|---|
| **`n = 12`** | `1100` | `1000` (8) - Limpou o bit 2 |
| **`n = 8`**  | `1000` | `0000` (0) - Limpou o bit 3 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Algoritmo de Brian Kernighan
```java
public class BitCount {
  public static int countSetBits(int n) {
    int count = 0;
    while (n != 0) {
      n &= (n - 1); // Zera o LSB 1
      count++;
    }
    return count;
  }
}
```

#### Teste de Potência de 2 em $O(1)$
- Um número inteiro positivo $n$ é potência de 2 se e somente se possui exatamente 1 bit ligado:
```go
func isPowerOfTwo(n int) bool {
  return n > 0 && (n & (n - 1)) == 0
}
```

#### Key Takeaways
- CPUs modernas oferecem a instrução de hardware nativa `POPCNT` que calcula a contagem total de bits ligados em 1 único ciclo de clock.

</details>
