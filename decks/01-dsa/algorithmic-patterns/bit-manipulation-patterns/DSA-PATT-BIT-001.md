---
id: DSA-PATT-BIT-001
title: "Single Number II (3N + 1) e Contagem de Bits Módulo 3 com Máquinas de Estado"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::meta
  - freq::high
---

## Pergunta
Como resolver **Single Number II** (onde todos os números aparecem 3 vezes, exceto um que aparece 1 vez) em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada posição de bit $i$ de $0$ a $31$:
  - Somamos a quantidade de números que possuem o $i$-ésimo bit ativo.
  - Calculamos $\text{soma} \pmod 3$.
  - Como os números duplicados aparecem 3 vezes, sua contribuição para a soma de cada bit será múltiplo de 3 ($3k$).
  - O resto $\text{soma} \pmod 3$ revelará com exatidão se o número único solitário possui aquele bit $i$ ativo ($1$) ou não ($0$).
- **Complexidade**: $O(32N) = O(N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/bit-manipulation-lsb-loop.webm">
    <p>Visualização: A operação n & (n-1) limpa o bit menos significativo em cada passo reduzindo as iterações à quantidade de 1s.</p>
  </video>
</div>

| Contribuição de Bit | Ocorrências do Número | Valor Módulo 3 ($\% 3$) |
|---|---|---|
| **Números Triplicados** | Aparecem $3k$ vezes | $3k \pmod 3 = 0$ (Anulados) |
| **Número Solitário** | Aparece 1 vez | $1 \pmod 3 = 1$ (Preservado) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Solução Digital Avançada com 2 Variáveis (Ones e Twos)
```java
public int singleNumber(int[] nums) {
  int ones = 0, twos = 0;
  for (int x : nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}
```

#### Key Takeaways
- Generaliza para qualquer problema onde elementos aparecem $K$ vezes e um aparece $1$ vez (basta fazer módulo $K$).

</details>
