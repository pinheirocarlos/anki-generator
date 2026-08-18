---
id: DSA-PATT-2POINT-005
title: "Demonstração Formal para Encontrar o Início de Ciclo em Lista Ligada (Cycle II)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::microsoft
  - freq::high
---

## Pergunta
Qual é a demonstração matemática que prova como encontrar o **nó exato de início de ciclo** em uma lista ligada (*Linked List Cycle II*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Sejam:
  - $L_1$: Distância da cabeça (`head`) até o nó de início do ciclo.
  - $L_2$: Distância do início do ciclo até o ponto de encontro de `slow` e `fast`.
  - $C$: Comprimento total do ciclo.
- Quando se encontram:
  - Distância percorrida por `slow`: $D_{\text{slow}} = L_1 + L_2$.
  - Distância percorrida por `fast`: $D_{\text{fast}} = L_1 + L_2 + k \cdot C$.
- Como `fast` anda no dobro da velocidade ($D_{\text{fast}} = 2 D_{\text{slow}}$):
  $$L_1 + L_2 + k \cdot C = 2(L_1 + L_2) \implies L_1 = k \cdot C - L_2 = (k-1)C + (C - L_2)$$
- **Algoritmo**: Após o encontro, reiniciamos um ponteiro na cabeça (`p1 = head`) mantendo o outro no ponto de encontro (`p2 = fast`). Avançando ambos a 1 passo por vez, eles se encontrarão **exatamente no nó de início do ciclo** após $L_1$ passos.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/floyd-cycle-entry-point-proof-loop.webm">
    <p>Visualização: Reinício de um ponteiro na cabeça e avanço sincronizado a 1x encontrando o nó exato de entrada do ciclo.</p>
  </video>
</div>

| Ponteiro na Fase 2 | Posição Inicial | Ponto de Encontro Final |
|---|---|---|
| **`p1`** | `head` (1 passo/vez) | Início exato do ciclo ($L_1$) |
| **`p2`** | Ponto de encontro (1 passo/vez) | Início exato do ciclo ($C - L_2$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Linked List Cycle II
```go
package main

func detectCycle(head *ListNode) *ListNode {
  slow, fast := head, head
  for fast != nil && fast.Next != nil {
    slow = slow.Next
    fast = fast.Next.Next
    if slow == fast {
      // Fase 2: Encontrar o nó de início
      p1 := head
      p2 := slow
      for p1 != p2 {
        p1 = p1.Next
        p2 = p2.Next
      }
      return p1
    }
  }
  return nil
}
```

#### Key Takeaways
- Essa elegante propriedade matemática transforma um problema que exigiria $O(N)$ memória de Hash Set em uma solução estritamente $O(1)$ de memória auxiliar.

</details>
