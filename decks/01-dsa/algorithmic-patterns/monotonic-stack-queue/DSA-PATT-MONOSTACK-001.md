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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Largest Rectangle in Histogram (LeetCode 84) com Pilha Monótona</text>
  
  <!-- Histogram Bars [2, 1, 5, 6, 2, 3] -->
  <g transform="translate(60, 45)">
    <!-- Bar 0 (h=2) -->
    <rect x="0" y="70" width="45" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
    <text x="22" y="95" fill="#94a3b8" font-size="11" text-anchor="middle">2</text>
    <text x="22" y="125" fill="#64748b" font-size="10" text-anchor="middle">i=0</text>

    <!-- Bar 1 (h=1) -->
    <rect x="55" y="90" width="45" height="20" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
    <text x="77" y="105" fill="#94a3b8" font-size="11" text-anchor="middle">1</text>
    <text x="77" y="125" fill="#64748b" font-size="10" text-anchor="middle">i=1</text>

    <!-- Bar 2 (h=5) - highlighted in max rect -->
    <rect x="110" y="10" width="45" height="100" fill="#065f46" stroke="#10b981" stroke-width="2" rx="3"/>
    <text x="132" y="45" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">5</text>
    <text x="132" y="125" fill="#34d399" font-size="10" text-anchor="middle">i=2</text>

    <!-- Bar 3 (h=6) - highlighted in max rect -->
    <rect x="165" y="-10" width="45" height="120" fill="#047857" stroke="#10b981" stroke-width="2" rx="3"/>
    <text x="187" y="30" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">6</text>
    <text x="187" y="125" fill="#34d399" font-size="10" text-anchor="middle">i=3</text>

    <!-- Bar 4 (h=2 - current trigger) -->
    <rect x="220" y="70" width="45" height="40" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
    <text x="242" y="95" fill="#fde68a" font-size="11" text-anchor="middle">2</text>
    <text x="242" y="125" fill="#f59e0b" font-size="10" text-anchor="middle">i=4</text>

    <!-- Bar 5 (h=3) -->
    <rect x="275" y="50" width="45" height="60" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
    <text x="297" y="85" fill="#94a3b8" font-size="11" text-anchor="middle">3</text>
    <text x="297" y="125" fill="#64748b" font-size="10" text-anchor="middle">i=5</text>

    <!-- Formula Box -->
    <g transform="translate(340, 0)">
      <rect x="0" y="0" width="220" height="110" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Gargalo em h=5 (i=2):</text>
      <text x="15" y="48" fill="#f8fafc" font-size="10">Limite Dir: i = 4 (h=2 &lt; 5)</text>
      <text x="15" y="68" fill="#f8fafc" font-size="10">Limite Esq: peek() = 1 (h=1)</text>
      <text x="15" y="88" fill="#f59e0b" font-size="10">Largura = 4 - 1 - 1 = 2</text>
      <text x="15" y="104" fill="#38bdf8" font-size="11" font-weight="bold">Área Máx = 5 × 2 = 10</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Cada barra entra e sai da pilha 1 vez: Complexidade Estrita O(N)</text>
</svg>

<p>Visualização: Cálculo da largura máxima limitada pelas barras menores à esquerda e direita em O(N).</p>


| Elemento Desempilhado | Limites (Esq / Dir) | Cálculo de Largura |
|---|---|---|
| Barra de altura $H[\text{tp}]$ | Topo anterior / Índice atual $i$ | $i - \text{stack.peek}() - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Ao adicionar uma barra sentinela de altura $0$ no final do array, garantimos que todas as barras restantes na pilha sejam desempilhadas e avaliadas sem código duplicado.

</details>
