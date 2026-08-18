---
id: DSA-ADV-GAMETHEORY-004
title: "Algoritmo de Euclides Estendido e Inverso Modular (a·x = 1 mod m)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como o **Algoritmo de Euclides Estendido** calcula o **Inverso Modular** $a^{-1} \pmod m$ resolvendo a identidade de Bézout em tempo $O(\log(\min(a, m)))$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo calcula os coeficientes inteiros $x$ e $y$ da **Identidade de Bézout**:
  $$a \cdot x + m \cdot y = \gcd(a, m)$$
- Se $\gcd(a, m) = 1$ (coprimos):
  $$a \cdot x + m \cdot y = 1 \implies a \cdot x \equiv 1 \pmod m$$
- Logo, $x \pmod m$ é o **Inverso Modular de $a$ módulo $m$**, permitindo executar divisão modular:
  $$\frac{u}{a} \pmod m = (u \cdot x) \pmod m$$
- **Pequeno Teorema de Fermat** (caso $m$ seja primo): $a^{-1} \equiv a^{m-2} \pmod m$, calculado em $O(\log m)$ via exponenciação binária.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/sieve-of-eratosthenes-primes-grid-loop.webm">
    <p>Visualização: Eliminação progressiva de múltiplos de primos marcando compostos na grade numérica contígua.</p>
  </video>
</div>

| Método de Inverso Modular | Condição para Módulo $m$ | Complexidade |
|---|---|---|
| **Pequeno Teorema de Fermat** | $m$ deve ser **Primo** ($a^{m-2}$) | $O(\log m)$ |
| **Euclides Estendido** | Apenas $\gcd(a, m) = 1$ | $O(\log(\min(a, m)))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Essencial para o cálculo de combinações $\binom{N}{K} \pmod{10^9+7}$ em problemas de contagem e criptografia RSA.

</details>
