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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Single Number II (3N + 1): Contador Bitwise Módulo 3 com Registradores</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Máquina de Estados: Transição 00 → 01 → 10 → 00</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">ones = (ones ^ num) &amp; ~twos (registra bits com 1 aparição).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">twos = (twos ^ num) &amp; ~ones (registra bits com 2 aparições; reseta ao atingir 3).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Ao final, 'ones' contém exatamente o elemento único com complexidade O(N) tempo e O(1) espaço</text>
</svg>
<p>Visualização: Máquina de estados bitwise com registradores ones e twos acumulando ocorrências de bits módulo 3.</p>
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
