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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ponteiros Rápido e Lento (Fast &amp; Slow / Floyd's Cycle Detection)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="40" y="42" fill="#fff" font-size="11" text-anchor="middle">Node 1</text>
    <line x1="80" y1="37" x2="130" y2="37" stroke="#3b82f6" stroke-width="2"/>
    <rect x="130" y="20" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="170" y="42" fill="#fff" font-size="11" text-anchor="middle">Node 2</text>
    
    <circle cx="320" cy="37" r="35" fill="none" stroke="#10b981" stroke-width="3"/>
    <circle cx="320" cy="2" r="6" fill="#f43f5e"/><text x="320" y="-8" fill="#f43f5e" font-size="9" text-anchor="middle">Fast (2 passos)</text>
    <circle cx="320" cy="72" r="6" fill="#38bdf8"/><text x="320" y="90" fill="#38bdf8" font-size="9" text-anchor="middle">Slow (1 passo)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Garante colisão dentro do ciclo em O(N) sem usar Hash Set (Espaço O(1))</text>
</svg>
<p>Visualização: Ponteiros rápido e lento (Floyd) colidindo dentro do ciclo em tempo O(N) sem espaço auxiliar.</p>

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
