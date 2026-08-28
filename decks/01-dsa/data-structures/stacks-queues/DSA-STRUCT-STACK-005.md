---
id: DSA-STRUCT-STACK-005
title: "Padrão Monotonic Stack para Resolução de Next Greater Element em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão **Monotonic Stack** resolve o problema clássico de *Next Greater Element* em tempo linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma pilha com elementos estritamente monótonos (ex: monótona decrescente com índices).
- Ao iterar sobre o array no índice $i$:
  - Enquanto o elemento atual `arr[i]` for maior que o topo da pilha `arr[stack.peek()]`, significa que `arr[i]` é o **Next Greater Element** daquele índice desempilhado: preenchemos `result[stack.pop()] = arr[i]`.
  - Empilhamos o índice $i$.
- Como cada índice entra e sai da pilha no máximo uma vez, a complexidade total é $O(N)$ linear contra $O(N^2)$ da busca quadrática.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Monotonic Stack para Next Greater Element (NGE)</text>
  <g transform="translate(80, 50)">
    <g transform="translate(0, 10)">
      <text x="0" y="15" fill="#94a3b8" font-size="11">Array: [2, 1, 5, 6, 2, 3]</text>
      <text x="0" y="38" fill="#f59e0b" font-size="11">Ao encontrar 5 &gt; Topo (1):</text>
      <text x="0" y="55" fill="#10b981" font-size="11">→ Desempilha 1 com NGE = 5</text>
    </g>

    <!-- Monotonic Stack -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#a855f7" rx="6"/>
      <text x="110" y="20" fill="#d8b4fe" font-size="11" font-weight="bold" text-anchor="middle">Pilha Monotônica Decrescente</text>
      <rect x="30" y="30" width="160" height="20" fill="#7e22ce" rx="2"/><text x="110" y="44" fill="#fff" font-size="10" text-anchor="middle">Índice 2 (val: 5)</text>
      <rect x="30" y="55" width="160" height="20" fill="#581c87" rx="2"/><text x="110" y="69" fill="#fff" font-size="10" text-anchor="middle">Índice 0 (val: 2)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas NGE, Maior Retângulo em Histograma e Água Presa em O(N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Monotonic Stack para Next Greater Element (NGE)</text>
  <g transform="translate(80, 50)">
    <g transform="translate(0, 10)">
      <text x="0" y="15" fill="#94a3b8" font-size="11">Array: [2, 1, 5, 6, 2, 3]</text>
      <text x="0" y="38" fill="#f59e0b" font-size="11">Ao encontrar 5 &gt; Topo (1):</text>
      <text x="0" y="55" fill="#10b981" font-size="11">→ Desempilha 1 com NGE = 5</text>
    </g>

    <!-- Monotonic Stack -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#a855f7" rx="6"/>
      <text x="110" y="20" fill="#d8b4fe" font-size="11" font-weight="bold" text-anchor="middle">Pilha Monotônica Decrescente</text>
      <rect x="30" y="30" width="160" height="20" fill="#7e22ce" rx="2"/><text x="110" y="44" fill="#fff" font-size="10" text-anchor="middle">Índice 2 (val: 5)</text>
      <rect x="30" y="55" width="160" height="20" fill="#581c87" rx="2"/><text x="110" y="69" fill="#fff" font-size="10" text-anchor="middle">Índice 0 (val: 2)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas NGE, Maior Retângulo em Histograma e Água Presa em O(N)</text>

</svg>

| Abordagem | Tempo de Execução | Espaço Auxiliar |
|---|---|---|
| **Busca Dupla Força Bruta** | $O(N^2)$ Quadrático | $O(1)$ |
| **Monotonic Stack** | $O(N)$ Linear | $O(N)$ Pilha de Índices |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Next Greater Element
```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class NextGreaterElement {
  public static int[] nextGreaterElements(int[] nums) {
    int[] res = new int[nums.length];
    Arrays.fill(res, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // Guarda índices

    for (int i = 0; i < nums.length; i++) {
      while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
        res[stack.pop()] = nums[i];
      }
      stack.push(i);
    }
    return res;
  }
}
```

#### Key Takeaways
- O Monotonic Stack é a ferramenta chave para resolver problemas como *Daily Temperatures*, *Largest Rectangle in Histogram* e *Trapping Rain Water*.

</details>
