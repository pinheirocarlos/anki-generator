---
id: DSA-PATT-MONOSTACK-001
title: "Largest Rectangle in Histogram com Pilha Monótona Crescente em Tempo O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::meta
  - freq::high
---

## Pergunta
Como a **Monotonic Stack Crescente** resolve o clássico hard **Largest Rectangle in Histogram** (LeetCode 84) em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada barra $i$, a altura máxima do retângulo que usa $H[i]$ como gargalo estende-se para a esquerda e direita até encontrar barras estritamente menores:
- Mantemos uma **Pilha Monótona Crescente** com índices:
  - Quando a barra atual é menor que o topo da pilha (`H[i] < H[stack.peek()]`), a barra do topo $H[\text{tp}]$ atingiu seu limite direito em $i$.
  - Desempilhamos $\text{tp}$. O limite esquerdo é o novo topo da pilha (`stack.peek()`).
  - Largura: $\text{width} = \text{stack.isEmpty}() \ ? \ i : (i - \text{stack.peek}() - 1)$.
  - Área: $\text{area} = H[\text{tp}] \times \text{width}$.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/monotonic-stack-nge-loop.webm">
    <p>Visualização: Cada elemento entra e sai da pilha no máximo uma vez, identificando o primeiro maior à direita em O(N).</p>
  </video>
</div>

| Elemento Desempilhado | Limites (Esq / Dir) | Cálculo de Largura |
|---|---|---|
| Barra de altura $H[\text{tp}]$ | Topo anterior / Índice atual $i$ | $i - \text{stack.peek}() - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Ao adicionar uma barra sentinela de altura $0$ no final do array, garantimos que todas as barras restantes na pilha sejam desempilhadas e avaliadas sem código duplicado.

</details>
