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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Next Greater Element (NGE) com Armazenamento de Índices em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Resolução com Pilha Monotônica de Índices</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Itera sobre o array; enquanto arr[i] &gt; arr[stack.top()]: ans[stack.pop()] = arr[i].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Ao final, elementos restantes na pilha recebem -1 (não possuem NGE).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Cada elemento é empilhado e desempilhado exatamente uma vez: Tempo estrito O(N)</text>

</svg>

| Elemento Desempilhado | Limites (Esq / Dir) | Cálculo de Largura |
|---|---|---|
| Barra de altura $H[\text{tp}]$ | Topo anterior / Índice atual $i$ | $i - \text{stack.peek}() - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Ao adicionar uma barra sentinela de altura $0$ no final do array, garantimos que todas as barras restantes na pilha sejam desempilhadas e avaliadas sem código duplicado.

</details>
