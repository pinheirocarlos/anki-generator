---
id: DSA-PATT-DIVCONQ-001
title: "Quickselect para Encontrar o K-ésimo Elemento em Tempo Médio Linear O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo **Quickselect** localiza o $K$-ésimo menor elemento de um array não ordenado em tempo médio $O(N)$ sem ordenar o array completo?

## Resposta
### Quick Answer
**Solução Direta**:
- Diferente do Quicksort (que faz recursão em ambos os lados do pivô), o **Quickselect descarta metade do array a cada passo**:
  1. Executa o particionamento in-place posicionando o pivô em seu índice final exato `pIndex`.
  2. Se `pIndex == K`: encontramos o elemento exato ($O(1)$).
  3. Se `K < pIndex`: faz recursão **apenas na partição esquerda**.
  4. Se `K > pIndex`: faz recursão **apenas na partição direita**.
- A soma das iterações segue a série geométrica:
  $$N + \frac{N}{2} + \frac{N}{4} + \dots < 2N = O(N) \text{ linear}$$

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">QuickSort: Pivô e Partição In-Place (O(N log N) Médio, Espaço O(log N))</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Escolha de Pivô e Partição em Menores / Maiores</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Posiciona todos os itens &lt; pivot à esquerda e todos &gt; pivot à direita em tempo linear O(N).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Recursão sobre as duas metades in-place: Excelente localidade de cache L1 da CPU.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Pior caso O(N²) evitado com pivô aleatório ou mediana-de-três</text>

</svg>

| Algoritmo | Chamadas Recursivas por Nível | Complexidade de Tempo Médio |
|---|---|---|
| **Quicksort** | Ambas as metades ($2 \times T(N/2)$) | $O(N \log N)$ |
| **Quickselect** | Apenas 1 metade ($1 \times T(N/2)$) | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Quickselect
```java
public class QuickselectSolution {
  public int findKthLargest(int[] nums, int k) {
    int target = nums.length - k; // Converte para k-ésimo menor
    return quickselect(nums, 0, nums.length - 1, target);
  }

  private int quickselect(int[] nums, int l, int r, int k) {
    if (l == r) return nums[l];
    int pIndex = partition(nums, l, r);
    if (pIndex == k) return nums[k];
    else if (pIndex < k) return quickselect(nums, pIndex + 1, r, k);
    else return quickselect(nums, l, pIndex - 1, k);
  }

  private int partition(int[] nums, int l, int r) {
    int pivot = nums[r], i = l;
    for (int j = l; j < r; j++) {
      if (nums[j] <= pivot) {
        swap(nums, i++, j);
      }
    }
    swap(nums, i, r);
    return i;
  }

  private void swap(int[] a, int i, int j) {
    int t = a[i]; a[i] = a[j]; a[j] = t;
  }
}
```

#### Key Takeaways
- É a solução mais rápida e eficiente em memória ($O(1)$ espaço) para problemas de Top-K e seleção de medianas.

</details>
