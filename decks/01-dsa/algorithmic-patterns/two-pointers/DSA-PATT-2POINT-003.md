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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Container With Most Water: Escolha Gulosa com Two Pointers</text>
  <g transform="translate(140, 50)">
    <rect x="0" y="20" width="20" height="70" fill="#3b82f6" rx="2"/>
    <text x="10" y="12" fill="#38bdf8" font-size="10" text-anchor="middle">h[L]=8</text>

    <rect x="20" y="45" width="240" height="45" fill="#0284c7" opacity="0.4"/>
    <text x="140" y="70" fill="#e0f2fe" font-size="11" font-weight="bold" text-anchor="middle">Área = min(h[L], h[R]) × (R - L)</text>

    <rect x="260" y="45" width="20" height="45" fill="#f59e0b" rx="2"/>
    <text x="270" y="37" fill="#fcd34d" font-size="10" text-anchor="middle">h[R]=5 (Menor)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mover a barra mais alta nunca aumentará a área; logo, move-se sempre o ponteiro menor (R--)</text>

</svg>

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
