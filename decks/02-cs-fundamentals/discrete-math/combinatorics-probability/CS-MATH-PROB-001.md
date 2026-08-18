---
id: CS-MATH-PROB-001
title: "Paradoxo do Aniversário e Probabilidade de Colisão de Hash"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Paradoxo do Aniversário (Birthday Paradox)** explica por que colisões de hash ocorrem em $O(\sqrt{N})$ inserções?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Paradoxo**: Em uma sala com apenas **23 pessoas**, a probabilidade de que pelo menos duas pessoas façam aniversário no mesmo dia ultrapassa **50%**, embora existam 365 dias no ano.
- **Causa Matemática**: O número de comparações de pares possíveis cresce quadraticamente com a combinação $\binom{K}{2} = \frac{K(K-1)}{2}$. Com 23 pessoas, existem 253 pares de comparação independentes.
- **Impacto em Tabelas Hash e Criptografia**: Em um espaço de chaves de tamanho $N$, a primeira colisão de hash tem $\approx 50\%$ de chance de ocorrer após apenas **$K \approx \sqrt{N}$** elementos inseridos:
  - Em hashes de 32 bits ($2^{32} \approx 4 \times 10^9$), colisões surgem após apenas $\approx 2^{16} = 65.536$ chaves.
  - Em hashes de 64 bits ($2^{64}$), colisões surgem após $\approx 2^{32} \approx 4$ bilhões de chaves.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/birthday-paradox-hash-collision-loop.webm">
    <p>Visualização: Crescimento exponencial da probabilidade de colisão atingindo 50% em apenas sqrt(N) elementos.</p>
  </video>
</div>

| Espaço de Hash ($N$) | Raiz Quadrada ($\sqrt{N}$) | Inserções para 50% de Risco de Colisão |
|---|---|---|
| **32-bit ($4.2 \times 10^9$)** | $2^{16}$ | ~65.536 chaves |
| **64-bit ($1.8 \times 10^{19}$)**| $2^{32}$ | ~4.294.967.296 chaves |
| **128-bit (UUIDv4 / MD5)** | $2^{64}$ | ~$1.8 \times 10^{19}$ chaves (Colisão zero) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fórmula de Aproximação da Probabilidade de Colisão
Para $k$ itens aleatórios inseridos em $N$ posições:
$$P(\text{ao menos 1 colisão}) \approx 1 - e^{-\frac{k^2}{2N}}$$
Para $P \ge 0.5$:
$$k \approx \sqrt{2N \ln 2} \approx 1.177 \sqrt{N}$$

#### Key Takeaways
- Por causa do Birthday Paradox, UUIDs e identificadores distribuídos usam no mínimo **128 bits** para garantir colisão zero sem necessidade de coordenação central.

</details>
