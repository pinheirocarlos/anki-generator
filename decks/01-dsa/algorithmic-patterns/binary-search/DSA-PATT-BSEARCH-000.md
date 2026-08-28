---
id: DSA-PATT-BSEARCH-000
title: "Invariante do Binary Search em Arrays Ordenados e Cálculo Seguro de Mid"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::google
  - freq::high
---

## Pergunta
Como a **Busca Binária (Binary Search)** divide o espaço de busca pela metade a cada passo e por que usamos `mid = left + (right - left) / 2`?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um array ordenado, comparamos o elemento central `arr[mid]` com o valor alvo:
  - Se `arr[mid] == target`: retorna o índice.
  - Se `arr[mid] < target`: descartamos a metade esquerda (`left = mid + 1`).
  - Se `arr[mid] > target`: descartamos a metade direita (`right = mid - 1`).
- **Cálculo Seguro de Mid**: A expressão ingênua `(left + right) / 2` pode causar **Integer Overflow** se $\text{left} + \text{right} > 2^{31} - 1$. A forma `left + (right - left) / 2` é matematicamente idêntica e imune a overflow.
- **Complexidade**: $O(\log N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca Binária: Eliminação de Metade do Espaço de Busca O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="15" width="60" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="30" y="37" fill="#94a3b8" text-anchor="middle">1</text>
    <rect x="65" y="15" width="60" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="95" y="37" fill="#94a3b8" text-anchor="middle">3</text>
    
    <rect x="130" y="15" width="60" height="35" fill="#047857" stroke="#10b981" stroke-width="2" rx="3"/><text x="160" y="37" fill="#fff" font-weight="bold" text-anchor="middle">7 (Mid)</text>
    
    <rect x="195" y="15" width="60" height="35" fill="#7f1d1d" stroke="#ef4444" rx="3" opacity="0.4"/><text x="225" y="37" fill="#fecaca" text-anchor="middle">11</text>
    <rect x="260" y="15" width="60" height="35" fill="#7f1d1d" stroke="#ef4444" rx="3" opacity="0.4"/><text x="290" y="37" fill="#fecaca" text-anchor="middle">15</text>
    <rect x="325" y="15" width="60" height="35" fill="#7f1d1d" stroke="#ef4444" rx="3" opacity="0.4"/><text x="355" y="37" fill="#fecaca" text-anchor="middle">19</text>
  </g>
  <text x="340" y="145" fill="#f87171" font-size="11" text-anchor="middle">Se Target = 3 (&lt; Mid 7) → Descarta toda a metade direita [mid, right] em O(1)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">1 milhão de elementos são pesquisados em no máximo 20 comparações (log₂ 10⁶ ≈ 20)</text>

</svg>

| Fórmula de Cálculo de Mid | Risco de Overflow | Segurança em 32-bit |
|---|---|---|
| `(left + right) / 2` | Alto se soma $> 2^{31}-1$ | Inseguro (bug histórico do Java) |
| `left + (right - left) / 2` | Zero | 100% Seguro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Busca Binária Padrão
```java
public class BinarySearchStandard {
  public static int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] == target) return mid;
      else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
}
```

#### Key Takeaways
- A cada iteração, exatamente 50% dos elementos restantes são eliminados.

</details>
