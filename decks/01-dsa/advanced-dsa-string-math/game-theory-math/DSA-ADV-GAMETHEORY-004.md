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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fast Modular Exponentiation: (A^B) % MOD em Tempo O(log B)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Exponenciação Binária por Elevação ao Quadrado</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se B é ímpar: res = (res · A) % MOD; B--.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">A = (A · A) % MOD; B = B / 2. Executa em no máximo 64 iterações para inteiros de 64 bits.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Substitui multiplicação linear O(B) por logarítmica O(log B)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fast Modular Exponentiation: (A^B) % MOD em Tempo O(log B)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Exponenciação Binária por Elevação ao Quadrado</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se B é ímpar: res = (res · A) % MOD; B--.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">A = (A · A) % MOD; B = B / 2. Executa em no máximo 64 iterações para inteiros de 64 bits.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Substitui multiplicação linear O(B) por logarítmica O(log B)</text>

</svg>

| Método de Inverso Modular | Condição para Módulo $m$ | Complexidade |
|---|---|---|
| **Pequeno Teorema de Fermat** | $m$ deve ser **Primo** ($a^{m-2}$) | $O(\log m)$ |
| **Euclides Estendido** | Apenas $\gcd(a, m) = 1$ | $O(\log(\min(a, m)))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Essencial para o cálculo de combinações $\binom{N}{K} \pmod{10^9+7}$ em problemas de contagem e criptografia RSA.

</details>
