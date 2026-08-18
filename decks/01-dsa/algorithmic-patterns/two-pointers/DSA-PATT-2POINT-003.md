---
id: DSA-PATT-2POINT-003
title: "Otimização de Espaço de O(N) para O(1) Usando Two Pointers"
tags:
  - level::l3-junior
  - topic::dsa::two-pointers
  - company::google
  - freq::high
---

## Pergunta
Em quais classes de problemas lineares o padrão Two Pointers permite reduzir o espaço auxiliar de $O(N)$ para $O(1)$ in-place?

## Resposta
### Quick Answer
**Solução Direta**:
- Two Pointers substitui a criação de novos arrays ou Hash Maps em problemas com mutação *in-place*:
  1. **Remoção de Duplicatas (*Remove Duplicates from Sorted Array*)**: `slow` mantém a fronteira dos elementos únicos e `fast` varre o array.
  2. **Particionamento (*Move Zeroes / Dutch National Flag*)**: Ponteiros trocam elementos de lugar sem memória extra.
  3. **Reversão de Strings / Palíndromos**: Troca caracteres simétricos nas pontas até que `left >= right`.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/in-place-two-pointers-write-read-loop.webm">
    <p>Visualização: Ponteiro de leitura e ponteiro de escrita reescrevendo o vetor in-place sem alocação auxiliar.</p>
  </video>
</div>

| Problema Linear | Abordagem com Array Extra | Abordagem Two Pointers In-Place |
|---|---|---|
| **Remove Duplicates** | Cria novo array $O(N)$ | Ponteiros `slow/fast` em $O(1)$ |
| **Move Zeroes** | Filtra em nova lista $O(N)$ | Swap in-place em $O(1)$ |
| **Valid Palindrome** | Inverte string cópia $O(N)$ | Ponteiros convergentes em $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, sempre que um problema linear sugerir alocar um novo buffer, avalie se Two Pointers permite resolver in-place com $O(1)$ memória.

</details>
