---
id: DSA-PATT-BIT-003
title: "Propriedade do XOR para Encontrar Elemento Único (Single Number I) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::bit-manipulation-patterns
  - company::amazon
  - freq::high
---

## Pergunta
Como as propriedades comutativa e associativa do **XOR** encontram o único elemento não duplicado em **Single Number I** em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- O operador XOR satisfaz:
  1. $x \oplus x = 0$ (qualquer número aplicado com ele mesmo se anula).
  2. $x \oplus 0 = x$ (o zero é o elemento neutro).
  3. Comutatividade e Associatividade: $A \oplus B \oplus A = (A \oplus A) \oplus B = 0 \oplus B = B$.
- Acumulando o XOR de todos os elementos do array em uma variável (`result ^= num`), todos os pares duplicados se cancelam ($0$), restando exclusivamente o **único elemento solitário**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/isolate-lowest-set-bit-twos-complement-loop.webm">
    <p>Visualização: A expressão n & (-n) isola estritamente a menor potência de 2 setada no número binário.</p>
  </video>
</div>

| Abordagem | Tempo | Memória Auxiliar |
|---|---|---|
| **Hash Set** | $O(N)$ | $O(N)$ Conjunto de elementos |
| **XOR Acumulado** | $O(N)$ | $O(1)$ Único registrador |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Single Number I
```java
public class SingleNumberSolution {
  public int singleNumber(int[] nums) {
    int res = 0;
    for (int num : nums) res ^= num;
    return res;
  }
}
```

#### Key Takeaways
- Transforma um problema que exigiria memória linear de conjunto em uma solução de espaço constante $O(1)$.

</details>
