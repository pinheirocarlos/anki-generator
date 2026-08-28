---
id: DSA-PATT-BIT-002
title: "Truque de Brian Kernighan (n & (n - 1)) para Contagem de Bits 1 (Hamming Weight)"
tags:
  - level::l3-junior
  - topic::dsa::bit-manipulation-patterns
  - company::microsoft
  - freq::high
---

## Pergunta
Como a expressão bitwise **`n & (n - 1)` (Algoritmo de Brian Kernighan)** apaga o bit 1 menos significativo e conta bits ativos em $O(K)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Subtrair 1 de um número binário (`n - 1`) inverte todos os bits a partir do bit 1 mais à direita até o final (ex: `...1000 - 1 = ...0111`).
- Ao executar `n & (n - 1)`, o bit 1 menos significativo e todos os zeros subsequentes são transformados em zeros, preservando os bits mais à esquerda inalterados.
- **Contagem de Bits (Hamming Weight)**: Executamos `n = n & (n - 1)` em um loop até que `n == 0`. O laço executa exatamente $K$ vezes, onde $K$ é o número de bits 1 ativos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Single Number: XOR Cumulativo para Cancelar Elementos Duplicados</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Propriedades: x ^ x = 0  e  x ^ 0 = x</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao acumular XOR sobre todo o array: (2 ^ 2) ^ (4 ^ 4) ^ 5 = 0 ^ 0 ^ 5 = 5.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Todos os elementos com número par de repetições anulam-se mutualmente a zero.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tempo linear O(N) com espaço auxiliar O(1) absoluto (zero Hash Set)</text>

</svg>

| Passo | Valor de `n` (Binário) | Ação `n & (n - 1)` |
|---|---|---|
| **Inicial** | `11000` ($24$) | $24 \ \& \ 23 = 11000 \ \& \ 10111 = 10000$ |
| **Passo 2** | `10000` ($16$) | $16 \ \& \ 15 = 10000 \ \& \ 01111 = 00000$ |
| **Total** | 2 iterações | Exatamente 2 bits 1 ativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Teste de Potência de 2
Um número inteiro positivo $N$ é potência de 2 se e somente se possuir exatamente 1 bit ativo: `n > 0 && (n & (n - 1)) == 0`.

#### Key Takeaways
- É estritamente mais rápido que varrer todos os 32 bits ($O(K)$ vs $O(32)$).

</details>
