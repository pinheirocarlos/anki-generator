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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Paradoxo do Aniversário: Probabilidade de Colisão de Hash</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="24" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Apenas 23 pessoas para 50% de chance de 2 pessoas com o mesmo aniversário</text>
    <text x="280" y="48" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">P(Colisão) ≈ 1 - e^(-k^2 / (2N)) | k ≈ 1.177 * √N</text>
    <text x="280" y="72" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Para N = 365 dias → k = 23 | Para hash 64-bit (2^64) → Colisão com ~2^32 itens!</text>
  </g>
  <rect x="60" y="150" width="560" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Impacto em Arquitetura: UUIDs de 64 bits colidem rápido; UUIDv4 (128 bits) garante segurança.</text>

</svg>
<p>Visualização: Curva de probabilidade do Paradoxo do Aniversário mostrando 50% de chance de colisão de hash com k ≈ 1.177 * √N.</p>

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
