---
id: DSA-PATT-BIT-005
title: "Geração de Todos os Subconjuntos de uma Máscara via (sub - 1) & mask em O(3^N)"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::amazon
  - freq::high
---

## Pergunta
Como iterar estritamente sobre todos os subconjuntos de uma máscara binária usando a expressão **`sub = (sub - 1) & mask`** em tempo total $O(3^N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para iterar sobre todos os sub-padrões de bits ativos de uma máscara `mask` sem testar inteiros irrelevantes:
  ```java
  for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // Processa o subconjunto ativo 'sub'
  }
  ```
- **Por que funciona**: Subtrair 1 decrementa o padrão; ao fazer AND com `mask`, limpamos todos os bits que não faziam parte da máscara original, pulando diretamente para o próximo subconjunto válido.
- **Complexidade Global**: Para todas as $2^N$ máscaras possíveis, o total de iterações sobre todos os subconjuntos é:
  $$\sum_{k=0}^N \binom{N}{k} 2^k = (1 + 2)^N = 3^N$$

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Swap de Duas Variáveis sem Memória Temporária via XOR</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="480" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="240" y="25" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">a = a ^ b;   // a guarda a diferença bitwise</text>
    <text x="240" y="45" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">b = a ^ b;   // (a ^ b) ^ b = a  (b recebe valor original de a)</text>
    <text x="240" y="65" fill="#f59e0b" font-size="11" font-family="monospace" text-anchor="middle">a = a ^ b;   // (a ^ b) ^ a = b  (a recebe valor original de b)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" text-anchor="middle">Atenção: Se &amp;a == &amp;b (mesmo endereço de memória), o valor é zerado; use if (&amp;a != &amp;b)</text>

</svg>

| Abordagem | Estados Avaliados | Complexidade para todas as máscaras |
|---|---|---|
| **Loop Ingênuo de $0$ a `mask`** | Testa números inválidos | $O(4^N)$ |
| **`(sub - 1) & mask`** | Visita apenas subconjuntos válidos | $O(3^N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a técnica fundamental para problemas avançados de Bitmask DP com particionamento de conjuntos (*Partition Array into Subsets*).

</details>
