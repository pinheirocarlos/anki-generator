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
