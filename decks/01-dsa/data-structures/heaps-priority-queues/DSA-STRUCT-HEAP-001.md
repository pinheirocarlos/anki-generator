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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/heapify-bottom-up-siftdown-loop.webm">
    <p>Visualização: Sift-down executado de floor(N/2) até a raiz resultando em somatório convergente O(N).</p>
  </video>
</div>

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
