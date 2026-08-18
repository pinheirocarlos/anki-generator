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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/bitwise-brian-kernighan-popcount-loop.webm">
    <p>Visualização: A operação n & (n-1) desliga o bit 1 menos significativo em cada iteração contando os bits ativos.</p>
  </video>
</div>

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
