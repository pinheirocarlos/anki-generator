---
id: DSA-PATT-2POINT-002
title: "Padrão Fast & Slow Pointers (Algoritmo de Floyd) para Detecção de Ciclos"
tags:
  - level::l3-junior
  - topic::dsa::two-pointers
  - company::amazon
  - freq::high
---

## Pergunta
Como o padrão **Fast & Slow Pointers (Algoritmo de Floyd / Tartaruga e Lebre)** detecta ciclos em listas encadeadas em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- Inicializamos dois ponteiros na cabeça da lista: `slow = head` e `fast = head`.
- A cada iteração:
  - `slow` avança 1 passo (`slow = slow.next`).
  - `fast` avança 2 passos (`fast = fast.next.next`).
- Se a lista for acíclica, `fast` atingirá `null` e o algoritmo encerra.
- Se houver ciclo, a cada passo a distância relativa entre `fast` e `slow` dentro do ciclo diminui em 1 nó; portanto, `fast` inevitavelmente alcançará `slow` (`fast == slow`) dentro de no máximo uma volta no ciclo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">3Sum O(N²) com Two Pointers após Ordenação</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fixa nums[i] e resolve 2Sum no restante [i+1, N-1]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena o array em O(N log N). Ignora elementos duplicados adjacentes.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Two Pointers para nums[L] + nums[R] == -nums[i]. Custo total: N × O(N) = O(N²).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz a busca por força bruta cúbica O(N³) para quadrática O(N²)</text>

</svg>

| Estado da Lista | Comportamento de `fast` | Diagnóstico |
|---|---|---|
| **Sem Ciclo** | Atinge `null` em $N/2$ passos | Lista linear terminada |
| **Com Ciclo** | `fast == slow` | Ciclo detectado com certeza |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Detecção de Ciclo
```java
public class LinkedListCycle {
  public boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) return true;
    }
    return false;
  }
}
```

#### Key Takeaways
- O algoritmo não modifica a lista e consome estritamente $O(1)$ de memória auxiliar.

</details>
