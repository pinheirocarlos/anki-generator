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
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Single Number: XOR Cumulativo para Cancelar Elementos Duplicados</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="15" width="80" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="40" y="40" fill="#94a3b8" font-size="12" text-anchor="middle">4 ^ 1 ^ 2</text>
    <text x="105" y="40" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">^</text>
    <rect x="130" y="15" width="80" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="170" y="40" fill="#94a3b8" font-size="12" text-anchor="middle">1 ^ 2</text>
    <text x="235" y="40" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">=</text>
    <rect x="260" y="10" width="200" height="50" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="360" y="32" fill="#a7f3d0" font-size="10" text-anchor="middle">(1 ^ 1) ^ (2 ^ 2) ^ 4 = 0 ^ 0 ^ 4</text>
    <text x="360" y="48" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Resultado = 4</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Propriedades: x ^ x = 0 e x ^ 0 = x (Comutativo e Associativo em tempo O(N) e espaço O(1))</text>
</svg>
<p>Visualização: Propriedades do XOR (comutatividade e auto-anulação x ^ x = 0) isolando o elemento único sem memória auxiliar.</p>

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
