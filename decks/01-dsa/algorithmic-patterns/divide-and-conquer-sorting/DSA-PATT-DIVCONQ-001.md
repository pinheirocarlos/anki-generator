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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Quickselect: Particionamento In-Place e Descarte Unilateral da Metade</text>
  
  <!-- Array elements -->
  <g transform="translate(60, 50)">
    <!-- Subarray Esquerdo: menores que o pivo -->
    <rect x="0" y="0" width="60" height="42" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="30" y="26" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">2</text>
    <rect x="65" y="0" width="60" height="42" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="95" y="26" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <rect x="130" y="0" width="60" height="42" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="160" y="26" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">3</text>
    <text x="95" y="58" fill="#7dd3fc" font-size="11" text-anchor="middle">Elementos &lt; Pivô</text>

    <!-- Pivo no pIndex -->
    <rect x="210" y="0" width="70" height="42" rx="4" fill="#d97706" stroke="#fbbf24" stroke-width="2"/>
    <text x="245" y="26" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">5 (P)</text>
    <text x="245" y="58" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">pIndex = 3 (Fixo)</text>

    <!-- Subarray Direito Descartado -->
    <rect x="300" y="0" width="60" height="42" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4"/>
    <text x="330" y="26" fill="#94a3b8" font-size="14" text-anchor="middle">8</text>
    <rect x="365" y="0" width="60" height="42" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4"/>
    <text x="395" y="26" fill="#94a3b8" font-size="14" text-anchor="middle">9</text>
    <rect x="430" y="0" width="60" height="42" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4"/>
    <text x="460" y="26" fill="#94a3b8" font-size="14" text-anchor="middle">7</text>
    <text x="395" y="58" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">✕ Descartado: K &lt; pIndex</text>
  </g>

  <!-- Invariante e serie geometrica -->
  <g transform="translate(60, 135)">
    <rect x="0" y="0" width="560" height="65" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="20" y="24" fill="#38bdf8" font-size="12" font-weight="bold">Regra de Decisão do Quickselect (K = 1):</text>
    <text x="20" y="44" fill="#e2e8f0" font-size="11">Como 1 &lt; 3 (pIndex), faz recursão APENAS na partição esquerda [2, 1, 3] e descarta a direita.</text>
    <text x="20" y="58" fill="#34d399" font-size="11" font-weight="bold">Série Geométrica: N + N/2 + N/4 + ... &lt; 2N = O(N) Tempo Médio Linear!</text>
  </g>
</svg>
<p>Visualização: Quickselect descarta unilateralmente a partição não-alvo, reduzindo a busca linearmente a cada passo.</p>

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
