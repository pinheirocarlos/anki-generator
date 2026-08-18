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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/xor-single-number-cancellation-loop.webm">
    <p>Visualização: Propriedades a ^ a = 0 e a ^ 0 = a cancelando todos os elementos duplicados em O(N) e espaço O(1).</p>
  </video>
</div>

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
