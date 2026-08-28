---
id: DSA-STRUCT-HEAP-001
title: "Demonstração do Custo Linear O(N) do Algoritmo Heapify Bottom-Up"
tags:
  - level::l4-pleno
  - topic::dsa::heaps-priority-queues
  - company::meta
  - freq::high
---

## Pergunta
Por que o algoritmo **Heapify Bottom-Up constrói um Heap em tempo linear $O(N)$** em vez de $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- No Heapify Bottom-Up, executamos `siftDown` a partir do último nó não-folha ($\lfloor N/2 \rfloor - 1$) descendo até o índice 0.
- A maioria dos nós reside nos níveis inferiores da árvore e precisa descer poucos passos:
  - $N/2$ nós folha descem $0$ passos.
  - $N/4$ nós descem no máximo $1$ passo.
  - $N/8$ nós descem no máximo $2$ passos.
- A soma total de passos converge pela série aritmético-geométrica:
  $$S = \sum_{h=0}^{\log N} \frac{N}{2^{h+1}} \times h = N \sum_{h=0}^{\infty} \frac{h}{2^{h+1}} = N \times 1 = O(N)$$

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operações Heapify-Up (Push) e Heapify-Down (Pop) O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Up (Push O(log N))</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Insere elemento no final do array</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Flutua trocando com o pai se maior</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Down (Pop O(log N))</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Move último item para a raiz</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Afunda trocando com o maior filho</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">A altura do heap é estritamente log₂ N, limitando o número máximo de swaps</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operações Heapify-Up (Push) e Heapify-Down (Pop) O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Up (Push O(log N))</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Insere elemento no final do array</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Flutua trocando com o pai se maior</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Down (Pop O(log N))</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Move último item para a raiz</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Afunda trocando com o maior filho</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">A altura do heap é estritamente log₂ N, limitando o número máximo de swaps</text>

</svg>

| Abordagem de Construção | Algoritmo | Complexidade de Tempo |
|---|---|---|
| **$N$ Inserções Top-Down** | `siftUp` sucessivo | $O(N \log N)$ |
| **Heapify Bottom-Up** | `siftDown` a partir de $N/2$ | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Heapify Linear
```java
public class HeapifyUtil {
  public static void buildMinHeap(int[] arr) {
    int n = arr.length;
    // Inicia no último nó pai e vai até a raiz
    for (int i = n / 2 - 1; i >= 0; i--) {
      siftDown(arr, i, n);
    }
  }

  private static void siftDown(int[] arr, int i, int n) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) smallest = left;
    if (right < n && arr[right] < arr[smallest]) smallest = right;

    if (smallest != i) {
      int temp = arr[i];
      arr[i] = arr[smallest];
      arr[smallest] = temp;
      siftDown(arr, smallest, n);
    }
  }
}
```

#### Key Takeaways
- Construir um heap sobre um array já existente via Heapify custa apenas $O(N)$, sendo o primeiro passo do *Heapsort*.

</details>
