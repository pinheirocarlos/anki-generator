---
id: DSA-ADV-STRING-005
title: "Algoritmo de Manacher para Encontrar Todos os Palíndromos em Tempo Estritamente O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como o **Algoritmo de Manacher** calcula o maior raio palíndromo centrado em cada posição de uma string em tempo linear estrito $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. **Transformação de Formato**: Insere um caractere sentinela (ex: `#`) entre cada letra (ex: `"aba" -> "^#a#b#a#$"`), unificando palíndromos de comprimento par e ímpar sob a mesma lógica de centro.
- 2. Mantém o centro $C$ e a borda direita $R$ do palíndromo mais longo avistado até o momento.
- 3. Para cada posição $i$:
  - Se $i < R$, inicializa o raio $P[i]$ aproveitando a **simetria espelhada** em relação ao centro $C$ ($i' = 2C - i$):
    $$P[i] = \min(R - i, \ P[i'])$$
  - Expande além de $P[i]$ apenas se o palíndromo ultrapassar a borda direita $R$.
- **Complexidade**: $O(N)$ linear estrito, pois a borda direita $R$ avança monotonicamente.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/manachers-palindrome-radius-loop.webm">
    <p>Visualização: Inserção de delimitadores e reaproveitamento do raio de simetria do centro mais à direita expandindo em O(N).</p>
  </video>
</div>

| Algoritmo de Palíndromos | Complexidade de Tempo | Tratamento de Tamanho Par/Ímpar |
|---|---|---|
| **Expand Around Center** | $O(N^2)$ | Exige 2 loops separados ($2N-1$ centros) |
| **Algoritmo de Manacher** | **$O(N)$ Linear** | Unificado via sentinelas `#` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a resposta definitiva e ótima para o problema *Longest Palindromic Substring*.

</details>
