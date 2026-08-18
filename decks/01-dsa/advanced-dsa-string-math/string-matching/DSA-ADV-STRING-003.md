---
id: DSA-ADV-STRING-003
title: "Algoritmo Z (Z-Algorithm) e o Z-Array para Busca de Padrões em O(N+M)"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Z-Array** e como o **Algoritmo Z** encontra todas as ocorrências de um padrão concatenando $\text{Padrão} + \$ + \text{Texto}$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para uma string $S$, $Z[i]$ é o comprimento do maior prefixo comum entre $S$ e a substring que começa em $S[i]$.
- **Busca de Padrões**:
  1. Constrói a string concatenada: $S = \text{pattern} + \text{"\$"} + \text{text}$ (onde `$` é um caractere sentinela único).
  2. Computa o Z-Array de $S$ em tempo linear $O(N + M)$ mantendo uma janela $[L, R]$ de casamento máximo.
  3. Qualquer posição $i$ onde $Z[i] == |\text{pattern}|$ indica uma ocorrência exata do padrão no texto no índice $i - |\text{pattern}| - 1$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/z-algorithm-box-matching-loop.webm">
    <p>Visualização: Manutenção do intervalo [L, R] de maior casamento de prefixo acelerando a busca em tempo linear O(N+M).</p>
  </video>
</div>

| Estrutura Concatenada | Condição de Casamento | Índice Real no Texto |
|---|---|---|
| $\text{Padrão} + \$ + \text{Texto}$ | $Z[i] == \text{len}(\text{Padrão})$ | $i - \text{len}(\text{Padrão}) - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Algoritmo Z é muito mais simples de implementar e raciocinar que o KMP, mantendo a mesma complexidade linear $O(N + M)$.

</details>
