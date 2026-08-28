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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Subsets via Bitmask: Enumeração de 0 a 2ᴺ - 1 em O(N · 2ᴺ)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Cada Inteiro de 0 a 2ᴺ - 1 Mapeia 1 Subconjunto Único</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o bit j da máscara (mask &amp; (1 &lt;&lt; j)) é 1: inclui o elemento nums[j] no subconjunto.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Iteração iterativa limpa sem pilha de recursão ou chamadas de função.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Ideal para gerar combinações e particionamentos de conjuntos de tamanho N ≤ 20</text>

</svg>

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
